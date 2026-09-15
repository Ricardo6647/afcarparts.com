// file: migrateShippingV2.js   (NEUE DATEI, ins Backend-Repo neben shippingDb.js)
// ============================================================
// VERSAND V2 - Schema fuer das Treuhand-Modell
//
// Was sich aendert (fachlich):
//   1. Der HAENDLER legt seinen Versandpreis fest (shipping_rates),
//      nicht mehr eine Plattform-Schaetzung.
//   2. Eine Sendung = ein Haendler in einer Bestellung, nicht mehr
//      eine Sendung je Artikel. Zuordnung ueber shipment_items.
//   3. Geld wird GEHALTEN, bis der Versand nachgewiesen ist:
//      - Versandanteil  -> frei bei verifizierter Trackingnummer
//      - Warenwert      -> frei bei "zugestellt" ODER Kundenbestaetigung
//   4. Mehrwertsteuer wird bei Bestellung EINGEFROREN (wie der
//      Wechselkurs). Standard ist 0 %, bis Saetze gepflegt sind -
//      lieber keine Steuer als eine falsche.
//
// Einhaengen in server.js (eine Zeile, bei den anderen Routen):
//   app.get('/api/migrate-shipping-v2', require('./migrateShippingV2'));
//
// Einmal aufrufen: GET /api/migrate-shipping-v2?secret=MIGRATION_SECRET
// Idempotent - mehrfaches Aufrufen ist ungefaehrlich.
// ============================================================

const { query } = require('./db');

module.exports = async function migrateShippingV2(req, res) {
  if (!process.env.MIGRATION_SECRET) {
    return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  }
  if (req.query.secret !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  const log = [];
  try {
    // ID-Typen erkennen (typkompatible Fremdschluessel) - gleiches Muster
    // wie /api/migrate-shipping. users.id kann TEXT oder BIGINT sein.
    const typeRes = await query(
      `SELECT table_name, data_type FROM information_schema.columns
        WHERE table_schema='public' AND column_name='id'
          AND table_name IN ('users','products')`
    );
    const map = {};
    for (const r of typeRes.rows) map[r.table_name] = r.data_type;
    const sqlType = (t) => (String(t || '').toLowerCase().includes('char') ||
                            String(t || '').toLowerCase() === 'text') ? 'TEXT' : 'BIGINT';
    const USER_ID = sqlType(map.users);
    log.push('ID-Typen erkannt: users=' + USER_ID);

    const stmts = [

      /* ========================================================
         1. VERSANDTARIFE DES HAENDLERS
         country = ISO-2 Zielland, '*' = alle uebrigen Laender.
         Preis = base_usd + per_kg_usd * Gewicht, optional gratis
         ab einem Warenwert (free_over_usd).
         ======================================================== */
      `CREATE TABLE IF NOT EXISTS shipping_rates (
         id BIGSERIAL PRIMARY KEY,
         seller_user_id ${USER_ID} REFERENCES users(id) ON DELETE CASCADE,
         country TEXT NOT NULL DEFAULT '*',
         base_usd NUMERIC(12,2) NOT NULL DEFAULT 0,
         per_kg_usd NUMERIC(12,2) NOT NULL DEFAULT 0,
         free_over_usd NUMERIC(12,2),
         min_days INTEGER,
         max_days INTEGER,
         carrier_hint TEXT,
         active BOOLEAN NOT NULL DEFAULT true,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS uniq_shipping_rate_seller_country
         ON shipping_rates (seller_user_id, country)`,
      `CREATE INDEX IF NOT EXISTS idx_shipping_rates_seller
         ON shipping_rates (seller_user_id)`,

      /* ========================================================
         2. SENDUNG <-> BESTELLPOSITIONEN (n:m)
         Eine Sendung buendelt jetzt alle Positionen EINES Haendlers
         aus EINER Bestellung. Die alte Spalte shipments.order_item_id
         bleibt fuer Altdaten stehen und wird bei neuen Sendungen
         nicht mehr gefuellt.
         ======================================================== */
      `CREATE TABLE IF NOT EXISTS shipment_items (
         id BIGSERIAL PRIMARY KEY,
         shipment_id BIGINT NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
         order_item_id BIGINT NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (order_item_id)
       )`,
      `CREATE INDEX IF NOT EXISTS idx_shipment_items_shipment
         ON shipment_items (shipment_id)`,

      /* ========================================================
         3. SENDUNG: Geld, Tracking-Nachweis, Freigabe
         ======================================================== */

      // Was der Kunde fuer DIESE Sendung an Versand gezahlt hat
      // (eingefrorener Haendlertarif zum Bestellzeitpunkt).
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS shipping_fee_usd NUMERIC(12,2) NOT NULL DEFAULT 0`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS shipping_rate_id BIGINT`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS weight_kg NUMERIC(8,3)`,

      // Auszahlung des Versandanteils (frei bei verifiziertem Tracking)
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS shipping_payout_status TEXT NOT NULL DEFAULT 'held'`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS shipping_released_at TIMESTAMPTZ`,

      // Tracking-Nachweis
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_verified BOOLEAN NOT NULL DEFAULT false`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_verified_at TIMESTAMPTZ`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_state TEXT`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_detail TEXT`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_checked_at TIMESTAMPTZ`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_attempts INTEGER NOT NULL DEFAULT 0`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS tracking_url TEXT`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS eta DATE`,

      // Zustellung + Freigabe des Warenwerts
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS buyer_confirmed_at TIMESTAMPTZ`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS released_at TIMESTAMPTZ`,
      `ALTER TABLE shipments ADD COLUMN IF NOT EXISTS release_reason TEXT`,

      // Status-Werte erweitern (returned kam bisher nicht vor)
      `ALTER TABLE shipments DROP CONSTRAINT IF EXISTS shipments_status_check`,
      `ALTER TABLE shipments ADD CONSTRAINT shipments_status_check
         CHECK (status IN ('pending','label_created','shipped','in_transit',
                           'delivered','returned','problem','cancelled'))`,

      `ALTER TABLE shipments DROP CONSTRAINT IF EXISTS shipments_shipping_payout_status_check`,
      `ALTER TABLE shipments ADD CONSTRAINT shipments_shipping_payout_status_check
         CHECK (shipping_payout_status IN ('held','released','paid','cancelled'))`,

      `CREATE INDEX IF NOT EXISTS idx_shipments_order_seller
         ON shipments (order_id, seller_user_id)`,
      // Idempotenz fuer NEUE Sendungen: ein Haendler je Bestellung.
      // Greift bewusst nur, wo order_item_id NULL ist - Altdaten mit
      // einer Sendung je Position bleiben dadurch unangetastet.
      `CREATE UNIQUE INDEX IF NOT EXISTS uniq_shipments_order_seller_v2
         ON shipments (order_id, seller_user_id)
         WHERE order_item_id IS NULL`,
      `CREATE INDEX IF NOT EXISTS idx_shipments_open_tracking
         ON shipments (status, tracking_verified)
         WHERE status IN ('shipped','in_transit')`,

      /* ========================================================
         4. AUSZAHLUNG WIRD GEHALTEN
         'held'     = Geld ist bei uns, Versand noch nicht nachgewiesen
         'released' = zur Auszahlung freigegeben
         'paid'     = an den Haendler ausgezahlt
         ======================================================== */
      `ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_payout_status_check`,
      `ALTER TABLE order_items ADD CONSTRAINT order_items_payout_status_check
         CHECK (payout_status IN ('pending','held','released','paid','failed','reversed'))`,
      `ALTER TABLE order_items ADD COLUMN IF NOT EXISTS payout_released_at TIMESTAMPTZ`,
      `CREATE INDEX IF NOT EXISTS idx_order_items_payout_status
         ON order_items (payout_status)`,

      /* ========================================================
         5. MEHRWERTSTEUER - eingefroren wie der Wechselkurs
         Saetze pflegt der Admin je Land. Fehlt ein Land, gilt 0 %.
         tax_mode: 'none' | 'exclusive' (auf Netto aufgeschlagen)
         ======================================================== */
      `CREATE TABLE IF NOT EXISTS tax_rates (
         id BIGSERIAL PRIMARY KEY,
         country TEXT NOT NULL,
         rate NUMERIC(5,4) NOT NULL DEFAULT 0,
         label TEXT,
         applies_to_shipping BOOLEAN NOT NULL DEFAULT true,
         active BOOLEAN NOT NULL DEFAULT true,
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (country)
       )`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_country TEXT`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_rate NUMERIC(5,4) NOT NULL DEFAULT 0`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_mode TEXT NOT NULL DEFAULT 'none'`,
    ];

    for (const sql of stmts) {
      await query(sql);
      const m = sql.match(/(?:TABLE|INDEX) (?:IF NOT EXISTS )?([a-z_]+)/i);
      log.push('ok: ' + (m ? m[1] : sql.slice(0, 60)));
    }

    /* --------------------------------------------------------
       Altbestand nachziehen: Positionen, die beim Bezahlen bereits
       auf 'paid' gesetzt wurden, obwohl noch nichts versendet ist.
       Nur dort, wo die Bestellung noch nicht ausgeliefert ist -
       bereits ausgezahltes Geld wird NICHT angefasst.
       -------------------------------------------------------- */
    const fix = await query(
      `UPDATE order_items oi
          SET payout_status = 'held'
         FROM orders o
        WHERE o.id = oi.order_id
          AND oi.payout_status = 'paid'
          AND o.status = 'paid'
          AND NOT EXISTS (
                SELECT 1 FROM payouts p
                 WHERE p.order_id = o.id AND p.status = 'paid' AND p.kind <> 'auto_split'
              )
        RETURNING oi.id`
    );
    log.push('Offene Positionen auf "held" gesetzt: ' + fix.rowCount);

    res.json({ success: true, log });
  } catch (err) {
    console.error('[migrate-shipping-v2]', err.message);
    res.status(500).json({ error: err.message, log });
  }
};
