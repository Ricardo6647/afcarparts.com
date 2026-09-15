// file: shippingDb.js   (ERSETZT die bisherige Datei)
// ============================================================
// Datenzugriff fuer shipments + pickup_stations + shipment_items.
//
// WAS SICH GEGENUEBER DER ALTEN FASSUNG AENDERT:
//   Eine Sendung ist jetzt "ein Haendler in einer Bestellung",
//   nicht mehr "eine Bestellposition". Kauft ein Kunde drei Teile
//   beim selben Haendler, entsteht EIN Paket - vorher entstanden
//   drei Sendungen, obwohl der Kunde nur einmal Versand bezahlt hat.
//   Die Positionen haengen ueber shipment_items an der Sendung.
//
//   Der vom Kunden gezahlte Versand (orders.shipping) wird beim
//   Anlegen gewichtsanteilig auf die Haendler verteilt und in
//   shipments.shipping_fee_usd EINGEFROREN. Damit ist garantiert:
//   Summe der Erstattungen = Betrag, den der Kunde gezahlt hat.
//
//   ALTDATEN bleiben lesbar: Sendungen mit gesetzter order_item_id
//   werden weiterhin korrekt angezeigt (siehe ITEM_JOIN).
//
// Tabellen: GET /api/migrate-shipping  +  GET /api/migrate-shipping-v2
// ============================================================

const { query } = require('./db');

function money(n) { return Math.round((Number(n) || 0) * 100) / 100; }

function defaultWeightKg() {
  const w = parseFloat(process.env.SHIP_DEFAULT_WEIGHT_KG || '2');
  return (w > 0) ? w : 2;
}

/* ============================================================
   ABHOLSTATIONEN  (unveraendert)
   ============================================================ */

async function listPickupStations({ country, city } = {}) {
  const where = ['active = true'];
  const params = [];
  if (country) {
    params.push(String(country).toUpperCase().trim());
    where.push(`country = $${params.length}`);
  }
  if (city) {
    params.push('%' + String(city).trim() + '%');
    where.push(`city ILIKE $${params.length}`);
  }
  const r = await query(
    `SELECT id, country, city, name, address, phone, opening_hours
       FROM pickup_stations
      WHERE ${where.join(' AND ')}
      ORDER BY country, city, name`,
    params
  );
  return r.rows;
}

async function listAllPickupStations() {
  const r = await query(`SELECT * FROM pickup_stations ORDER BY country, city, name`);
  return r.rows;
}

async function createPickupStation({ country, city, name, address, phone, opening_hours, active }) {
  const r = await query(
    `INSERT INTO pickup_stations (country, city, name, address, phone, opening_hours, active)
     VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7, true))
     RETURNING *`,
    [String(country || '').toUpperCase().trim(), city || '', name || '', address || '',
     phone || null, opening_hours || null, active]
  );
  return r.rows[0];
}

async function updatePickupStation(id, { country, city, name, address, phone, opening_hours, active }) {
  const r = await query(
    `UPDATE pickup_stations SET
       country        = COALESCE($2, country),
       city           = COALESCE($3, city),
       name           = COALESCE($4, name),
       address        = COALESCE($5, address),
       phone          = COALESCE($6, phone),
       opening_hours  = COALESCE($7, opening_hours),
       active         = COALESCE($8, active),
       updated_at     = now()
     WHERE id = $1
     RETURNING *`,
    [id,
     country ? String(country).toUpperCase().trim() : null,
     city ?? null, name ?? null, address ?? null, phone ?? null, opening_hours ?? null,
     typeof active === 'boolean' ? active : null]
  );
  return r.rows[0] || null;
}

async function deletePickupStation(id) {
  const r = await query(`DELETE FROM pickup_stations WHERE id = $1 RETURNING id`, [id]);
  return r.rowCount > 0;
}

/* ============================================================
   SENDUNGEN
   ============================================================ */

/* Positionen einer Sendung - deckt NEUE (shipment_items) und ALTE
   (shipments.order_item_id) Sendungen in einem Ausdruck ab.
   Liefert zusaetzlich Warenwert und Haendleranteil der Sendung. */
const ITEM_JOIN = `
  LEFT JOIN LATERAL (
    SELECT
      json_agg(json_build_object(
        'order_item_id', oi.id,
        'product_id',    oi.product_id,
        'title',         oi.title,
        'qty',           oi.qty,
        'unit_price',    oi.unit_price,
        'line_total',    oi.line_total,
        'payout_amount', oi.payout_amount,
        'payout_status', oi.payout_status
      ) ORDER BY oi.id)                  AS items,
      SUM(oi.line_total)::float8         AS goods_total,
      SUM(oi.payout_amount)::float8      AS payout_total,
      SUM(oi.qty)::int                   AS items_qty,
      (ARRAY_AGG(oi.title ORDER BY oi.id))[1] AS first_title,
      COUNT(*)::int                      AS item_count
    FROM order_items oi
    WHERE oi.id = s.order_item_id
       OR oi.id IN (SELECT si.order_item_id FROM shipment_items si WHERE si.shipment_id = s.id)
  ) it ON true`;

/* ------------------------------------------------------------
   Sendungen fuer eine BEZAHLTE Bestellung anlegen - je Haendler eine.
   Idempotent: existiert schon eine Sendung fuer (Bestellung, Haendler),
   wird sie wiederverwendet und nur um fehlende Positionen ergaenzt.
   ------------------------------------------------------------ */
async function createShipmentsForPaidOrder(orderId) {
  const or = await query(
    `SELECT id, status, shipping, address, buyer_user_id FROM orders WHERE id = $1`,
    [orderId]
  );
  const order = or.rows[0];
  if (!order || order.status !== 'paid') return [];

  const ir = await query(
    `SELECT oi.id, oi.product_id, oi.qty, p.seller_id, p.weight_kg
       FROM order_items oi
       LEFT JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = $1
      ORDER BY oi.id`,
    [orderId]
  );
  if (!ir.rows.length) return [];

  // Positionen nach Haendler gruppieren und Gewicht summieren
  const defW = defaultWeightKg();
  const groups = new Map(); // sellerKey -> { sellerId, weight, itemIds[] }
  for (const it of ir.rows) {
    const key = (it.seller_id == null) ? '__platform__' : String(it.seller_id);
    if (!groups.has(key)) {
      groups.set(key, { sellerId: (it.seller_id == null ? null : it.seller_id), weight: 0, itemIds: [] });
    }
    const g = groups.get(key);
    const unitW = (it.weight_kg != null && Number(it.weight_kg) > 0) ? Number(it.weight_kg) : defW;
    g.weight += unitW * (Number(it.qty) || 1);
    g.itemIds.push(it.id);
  }

  // Bereits gezahlten Versand gewichtsanteilig verteilen.
  // Bewusst NICHT neu aus dem Tarif berechnen: massgeblich ist,
  // was der Kunde tatsaechlich bezahlt hat.
  const paidShipping = money(order.shipping);
  const totalWeight = [...groups.values()].reduce((s, g) => s + g.weight, 0) || 1;
  const keys = [...groups.keys()];
  let assigned = 0;
  keys.forEach((k, i) => {
    const g = groups.get(k);
    if (i === keys.length - 1) {
      g.fee = money(paidShipping - assigned);   // Rundungsrest auf die letzte Gruppe
    } else {
      g.fee = money(paidShipping * (g.weight / totalWeight));
      assigned = money(assigned + g.fee);
    }
    if (g.fee < 0) g.fee = 0;
  });

  const stationId = (order.address && order.address.pickup_station_id)
    ? parseInt(order.address.pickup_station_id, 10) || null
    : null;

  const created = [];
  for (const g of groups.values()) {
    // Sendung anlegen (order_item_id bleibt NULL -> neue Welt)
    const sr = await query(
      `INSERT INTO shipments
         (order_id, order_item_id, product_id, seller_user_id, buyer_user_id,
          pickup_station_id, provider, status, shipping_fee_usd, weight_kg)
       VALUES ($1, NULL, NULL, $2, $3, $4, 'manual', 'pending', $5, $6)
       ON CONFLICT (order_id, seller_user_id) WHERE order_item_id IS NULL
       DO NOTHING
       RETURNING id`,
      [orderId, g.sellerId, order.buyer_user_id, stationId, g.fee, money(g.weight)]
    );

    let shipmentId = sr.rows[0] ? sr.rows[0].id : null;
    if (!shipmentId) {
      // War schon da -> bestehende Sendung nehmen
      const ex = await query(
        `SELECT id FROM shipments
          WHERE order_id = $1 AND order_item_id IS NULL
            AND seller_user_id IS NOT DISTINCT FROM $2
          LIMIT 1`,
        [orderId, g.sellerId]
      );
      shipmentId = ex.rows[0] ? ex.rows[0].id : null;
    } else {
      created.push(shipmentId);
    }
    if (!shipmentId) continue;

    // Positionen zuordnen (eine Position gehoert zu genau einer Sendung)
    for (const itemId of g.itemIds) {
      await query(
        `INSERT INTO shipment_items (shipment_id, order_item_id)
         VALUES ($1, $2)
         ON CONFLICT (order_item_id) DO NOTHING`,
        [shipmentId, itemId]
      );
    }
  }

  return created;
}

async function getShipmentsByOrder(orderId) {
  const r = await query(
    `SELECT s.*, it.items, it.goods_total, it.payout_total, it.item_count,
            it.first_title AS product_title,
            ps.name AS pickup_station_name, ps.city AS pickup_station_city
       FROM shipments s
       LEFT JOIN pickup_stations ps ON ps.id = s.pickup_station_id
       ${ITEM_JOIN}
      WHERE s.order_id = $1
      ORDER BY s.id`,
    [orderId]
  );
  return r.rows;
}

// Plattformweit (Admin), je Haendler oder je Kaeufer gefiltert.
async function listShipments({ status, sellerUserId, buyerUserId, verified, page = 1, perPage = 50 } = {}) {
  const where = [];
  const params = [];
  if (status)       { params.push(status);       where.push(`s.status = $${params.length}`); }
  if (sellerUserId) { params.push(sellerUserId); where.push(`s.seller_user_id = $${params.length}`); }
  if (buyerUserId)  { params.push(buyerUserId);  where.push(`s.buyer_user_id = $${params.length}`); }
  if (verified === true)  where.push(`s.tracking_verified = true`);
  if (verified === false) where.push(`s.tracking_verified = false`);

  const offset = (Math.max(1, page) - 1) * perPage;
  params.push(perPage, offset);

  const r = await query(
    `SELECT s.*,
            it.items, it.goods_total, it.payout_total, it.item_count, it.items_qty,
            it.first_title AS product_title,
            ps.name    AS pickup_station_name,
            ps.city    AS pickup_station_city,
            ps.address AS pickup_station_address,
            o.address  AS order_address,
            o.currency AS order_currency,
            o.email    AS order_email,
            o.total    AS order_total,
            o.created_at AS order_created_at,
            bu.name  AS buyer_name,
            bu.email AS buyer_email,
            bu.phone AS buyer_phone
       FROM shipments s
       LEFT JOIN pickup_stations ps ON ps.id = s.pickup_station_id
       LEFT JOIN orders           o ON o.id  = s.order_id
       LEFT JOIN users           bu ON bu.id = s.buyer_user_id
       ${ITEM_JOIN}
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY s.created_at DESC
      LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );
  return r.rows;
}

// Eine Sendung des Haendlers (inkl. Positionen + Stationsdaten fuer das PDF).
async function getSellerShipment(id, sellerUserId) {
  const r = await query(
    `SELECT s.*, it.items, it.goods_total, it.payout_total, it.item_count,
            it.first_title AS product_title,
            ps.name AS pickup_station_name, ps.city AS pickup_station_city,
            ps.address AS pickup_station_address, ps.country AS pickup_station_country,
            ps.phone AS pickup_station_phone, ps.opening_hours AS pickup_station_hours,
            o.address AS order_address, o.currency AS order_currency,
            o.created_at AS order_created_at,
            bu.name AS buyer_name, bu.phone AS buyer_phone
       FROM shipments s
       LEFT JOIN pickup_stations ps ON ps.id = s.pickup_station_id
       LEFT JOIN orders           o ON o.id  = s.order_id
       LEFT JOIN users           bu ON bu.id = s.buyer_user_id
       ${ITEM_JOIN}
      WHERE s.id = $1 AND s.seller_user_id = $2`,
    [id, sellerUserId]
  );
  return r.rows[0] || null;
}

// Eine Sendung des Kaeufers (fuer "Erhalten"-Bestaetigung + Sendungsverfolgung).
async function getBuyerShipment(id, buyerUserId) {
  const r = await query(
    `SELECT s.*, it.items, it.first_title AS product_title,
            ps.name AS pickup_station_name, ps.city AS pickup_station_city
       FROM shipments s
       LEFT JOIN pickup_stations ps ON ps.id = s.pickup_station_id
       ${ITEM_JOIN}
      WHERE s.id = $1 AND s.buyer_user_id = $2`,
    [id, buyerUserId]
  );
  return r.rows[0] || null;
}

async function getShipment(id) {
  const r = await query(
    `SELECT s.*, it.items, it.goods_total, it.payout_total, it.first_title AS product_title
       FROM shipments s ${ITEM_JOIN}
      WHERE s.id = $1`,
    [id]
  );
  return r.rows[0] || null;
}

// Fuer den Webhook: Sendung anhand der Trackingnummer finden.
async function findByTracking(trackingNumber) {
  const r = await query(
    `SELECT * FROM shipments
      WHERE REPLACE(UPPER(tracking_number), ' ', '') = REPLACE(UPPER($1), ' ', '')
      ORDER BY id DESC LIMIT 1`,
    [String(trackingNumber || '')]
  );
  return r.rows[0] || null;
}

// Offene Sendungen, deren Tracking erneut geprueft werden soll.
// Reihenfolge: am laengsten nicht geprueft zuerst.
async function listForTrackingCheck(limit = 40) {
  const r = await query(
    `SELECT id, carrier, tracking_number, status, tracking_verified, tracking_attempts
       FROM shipments
      WHERE tracking_number IS NOT NULL
        AND tracking_number <> ''
        AND status IN ('shipped','in_transit','label_created')
        AND (tracking_checked_at IS NULL OR tracking_checked_at < now() - interval '3 hours')
      ORDER BY tracking_checked_at ASC NULLS FIRST
      LIMIT $1`,
    [limit]
  );
  return r.rows;
}

async function setShipmentStatus(id, status) {
  const r = await query(
    `UPDATE shipments SET status = $2, updated_at = now() WHERE id = $1 RETURNING *`,
    [id, status]
  );
  return r.rows[0] || null;
}

/* ------------------------------------------------------------
   Haendler traegt Versanddienst + Trackingnummer ein.
   Setzt den Status auf 'shipped' und die Sendung auf UNGEPRUEFT
   zurueck - bestaetigt wird sie erst durch den Carrier (escrow.js).
   Aendert nur die eigene Sendung des Haendlers.
   ------------------------------------------------------------ */
async function setSellerTracking(id, sellerUserId, { carrier, tracking_number }) {
  const r = await query(
    `UPDATE shipments SET
       carrier           = COALESCE($3, carrier),
       tracking_number   = COALESCE($4, tracking_number),
       status            = 'shipped',
       tracking_verified = false,
       tracking_state    = NULL,
       tracking_detail   = NULL,
       tracking_checked_at = NULL,
       tracking_attempts = 0,
       updated_at        = now()
     WHERE id = $1 AND seller_user_id = $2
     RETURNING *`,
    [id, sellerUserId, carrier ?? null, tracking_number ?? null]
  );
  return r.rows[0] || null;
}

/* ------------------------------------------------------------
   Ergebnis einer Carrier-Pruefung speichern.
   ok=false (wir konnten nicht pruefen) zaehlt NICHT als Fehlversuch
   des Haendlers - dann wird nur der Zeitstempel fortgeschrieben.
   ------------------------------------------------------------ */
async function saveTrackingResult(id, result) {
  const newStatus = result && result.status ? result.status : null;
  const r = await query(
    `UPDATE shipments SET
       tracking_verified   = CASE WHEN $2 THEN true ELSE tracking_verified END,
       tracking_verified_at= CASE WHEN $2 AND tracking_verified_at IS NULL THEN now() ELSE tracking_verified_at END,
       tracking_state      = COALESCE($3, tracking_state),
       tracking_detail     = COALESCE($4, tracking_detail),
       tracking_url        = COALESCE($5, tracking_url),
       eta                 = COALESCE($6::date, eta),
       carrier             = COALESCE($7, carrier),
       status              = COALESCE($8, status),
       delivered_at        = CASE WHEN $3 = 'delivered' AND delivered_at IS NULL THEN now() ELSE delivered_at END,
       tracking_checked_at = now(),
       tracking_attempts   = CASE WHEN $9 AND NOT $2 THEN tracking_attempts + 1 ELSE tracking_attempts END,
       updated_at          = now()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      !!(result && result.valid),
      (result && result.state) || null,
      (result && result.detail) || null,
      (result && result.url) || null,
      (result && result.eta) || null,
      (result && result.carrier) || null,
      newStatus,
      !!(result && result.ok),
    ]
  );
  return r.rows[0] || null;
}

// Versandanteil freigeben (nach bestaetigter Trackingnummer).
async function releaseShippingFee(id) {
  const r = await query(
    `UPDATE shipments SET
       shipping_payout_status = 'released',
       shipping_released_at   = now(),
       updated_at             = now()
     WHERE id = $1 AND shipping_payout_status = 'held'
     RETURNING *`,
    [id]
  );
  return r.rows[0] || null;
}

// Warenwert freigeben: alle Positionen dieser Sendung auf 'released'.
async function releaseGoods(id, reason) {
  const up = await query(
    `UPDATE order_items SET
       payout_status      = 'released',
       payout_released_at = now()
     WHERE payout_status IN ('pending','held')
       AND (id IN (SELECT order_item_id FROM shipment_items WHERE shipment_id = $1)
            OR id = (SELECT order_item_id FROM shipments WHERE id = $1))
     RETURNING id, payout_amount`,
    [id]
  );
  const s = await query(
    `UPDATE shipments SET
       released_at    = COALESCE(released_at, now()),
       release_reason = COALESCE(release_reason, $2),
       updated_at     = now()
     WHERE id = $1
     RETURNING *`,
    [id, reason || null]
  );
  return { items: up.rows, shipment: s.rows[0] || null };
}

// Kunde bestaetigt den Empfang.
async function setBuyerConfirmed(id, buyerUserId) {
  const r = await query(
    `UPDATE shipments SET
       buyer_confirmed_at = COALESCE(buyer_confirmed_at, now()),
       status = CASE WHEN status IN ('shipped','in_transit') THEN 'delivered' ELSE status END,
       delivered_at = COALESCE(delivered_at, now()),
       updated_at = now()
     WHERE id = $1 AND buyer_user_id = $2
     RETURNING *`,
    [id, buyerUserId]
  );
  return r.rows[0] || null;
}

// Label-Daten (nur noch fuer den optionalen Provider-Weg).
async function setShipmentTracking(id, { carrier, tracking_number, label_url, provider, provider_shipment_id, cost_usd }) {
  const r = await query(
    `UPDATE shipments SET
       carrier              = COALESCE($2, carrier),
       tracking_number      = COALESCE($3, tracking_number),
       label_url            = COALESCE($4, label_url),
       provider             = COALESCE($5, provider),
       provider_shipment_id = COALESCE($6, provider_shipment_id),
       cost_usd             = COALESCE($7, cost_usd),
       status               = CASE WHEN $3 IS NOT NULL AND status = 'pending' THEN 'label_created' ELSE status END,
       updated_at           = now()
     WHERE id = $1
     RETURNING *`,
    [id, carrier ?? null, tracking_number ?? null, label_url ?? null,
     provider ?? null, provider_shipment_id ?? null, cost_usd ?? null]
  );
  return r.rows[0] || null;
}

module.exports = {
  // Stationen
  listPickupStations, listAllPickupStations, createPickupStation,
  updatePickupStation, deletePickupStation,
  // Sendungen
  createShipmentsForPaidOrder, getShipmentsByOrder, listShipments,
  getShipment, getSellerShipment, getBuyerShipment, findByTracking,
  listForTrackingCheck,
  // Status + Tracking
  setShipmentStatus, setSellerTracking, setShipmentTracking, saveTrackingResult,
  // Treuhand
  releaseShippingFee, releaseGoods, setBuyerConfirmed,
};
