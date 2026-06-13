// file: shippingDb.js  (NEUE DATEI, ins Backend-Repo neben billingDb.js)
// Phase 0 Versand: Datenzugriff fuer shipments + pickup_stations.
// Tabellen werden ueber GET /api/migrate-shipping?secret=... angelegt (siehe server.js-Block).

const { query } = require('./db');

/* ============================================================
   ABHOLSTATIONEN
   ============================================================ */

// Oeffentlich: aktive Stationen, optional nach Land (ISO-2) und Stadt gefiltert.
// Stadt wird unscharf verglichen (ILIKE), damit "Lagos" auch "Lagos Island" findet.
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

// Admin: alle Stationen (auch inaktive)
async function listAllPickupStations() {
  const r = await query(
    `SELECT * FROM pickup_stations ORDER BY country, city, name`
  );
  return r.rows;
}

async function createPickupStation({ country, city, name, address, phone, opening_hours, active }) {
  const r = await query(
    `INSERT INTO pickup_stations (country, city, name, address, phone, opening_hours, active)
     VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7, true))
     RETURNING *`,
    [String(country || '').toUpperCase().trim(), city || '', name || '', address || '', phone || null, opening_hours || null, active]
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

// Legt fuer eine BEZAHLTE Bestellung pro order_item eine Sendung an.
// Traegt Artikelnummer (product_id), Haendler-ID (seller_user_id) und
// Kaeufer-ID (buyer_user_id) ein. Idempotent: vorhandene Sendungen je
// order_item werden uebersprungen (ON CONFLICT DO NOTHING).
async function createShipmentsForPaidOrder(orderId) {
  const r = await query(
    `INSERT INTO shipments
       (order_id, order_item_id, product_id, seller_user_id, buyer_user_id, pickup_station_id, provider, status)
     SELECT
       o.id,
       oi.id,
       oi.product_id,
       p.seller_id,
       o.buyer_user_id,
       NULLIF(o.address->>'pickup_station_id','')::BIGINT,
       'manual',
       'pending'
     FROM orders o
     JOIN order_items oi ON oi.order_id = o.id
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE o.id = $1 AND o.status = 'paid'
     ON CONFLICT (order_item_id) WHERE order_item_id IS NOT NULL DO NOTHING
     RETURNING id`,
    [orderId]
  );
  return r.rows.map((row) => row.id);
}

async function getShipmentsByOrder(orderId) {
  const r = await query(
    `SELECT s.*, ps.name AS pickup_station_name, ps.city AS pickup_station_city
       FROM shipments s
       LEFT JOIN pickup_stations ps ON ps.id = s.pickup_station_id
      WHERE s.order_id = $1
      ORDER BY s.id`,
    [orderId]
  );
  return r.rows;
}

// Plattformweite Liste (Admin) bzw. gefiltert auf einen Haendler (Haendler-Dashboard).
async function listShipments({ status, sellerUserId, buyerUserId, page = 1, perPage = 50 } = {}) {
  const where = [];
  const params = [];
  if (status)       { params.push(status);       where.push(`s.status = $${params.length}`); }
  if (sellerUserId) { params.push(sellerUserId); where.push(`s.seller_user_id = $${params.length}`); }
  if (buyerUserId)  { params.push(buyerUserId);  where.push(`s.buyer_user_id = $${params.length}`); }
  const offset = (Math.max(1, page) - 1) * perPage;
  params.push(perPage, offset);
  const r = await query(
    `SELECT s.*, ps.name AS pickup_station_name, ps.city AS pickup_station_city
       FROM shipments s
       LEFT JOIN pickup_stations ps ON ps.id = s.pickup_station_id
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY s.created_at DESC
      LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
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

// Haendler-Sicht (Phase 1c): Carrier/Tracking eintragen UND Status -> 'shipped'.
// Aendert NUR die eigene Sendung des Haendlers: seller_user_id muss passen,
// sonst wird nichts geaendert und null zurueckgegeben (Schutz gegen fremde IDs).
async function setSellerTracking(id, sellerUserId, { carrier, tracking_number }) {
  const r = await query(
    `UPDATE shipments SET
       carrier         = COALESCE($3, carrier),
       tracking_number = COALESCE($4, tracking_number),
       status          = 'shipped',
       updated_at      = now()
     WHERE id = $1 AND seller_user_id = $2
     RETURNING *`,
    [id, sellerUserId, carrier ?? null, tracking_number ?? null]
  );
  return r.rows[0] || null;
}

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
    [id, carrier ?? null, tracking_number ?? null, label_url ?? null, provider ?? null, provider_shipment_id ?? null, cost_usd ?? null]
  );
  return r.rows[0] || null;
}

module.exports = {
  listPickupStations,
  listAllPickupStations,
  createPickupStation,
  updatePickupStation,
  deletePickupStation,
  createShipmentsForPaidOrder,
  getShipmentsByOrder,
  listShipments,
  setShipmentStatus,
  setShipmentTracking,
  setSellerTracking,
};
