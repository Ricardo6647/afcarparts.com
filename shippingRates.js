// file: shippingRates.js   (NEUE DATEI, ins Backend-Repo neben shippingDb.js)
// ============================================================
// VERSANDTARIFE DES HAENDLERS
//
// Grundsatz: Was der Kunde an Versand zahlt, legt der HAENDLER fest -
// nicht die Plattform und kein Schaetzalgorithmus. Damit gibt es keine
// Differenz zwischen dem, was wir kassieren, und dem, was der Haendler
// am Schalter bezahlt. Der Betrag wird bei der Bestellung eingefroren
// (shipments.shipping_fee_usd) und spaeter unveraendert erstattet.
//
// Tarif:  Preis = base_usd + per_kg_usd * Gewicht
//         optional gratis ab Warenwert free_over_usd
//         country = ISO-2 Zielland, '*' = alle uebrigen Laender
//
// Hat ein Haendler noch keinen Tarif, greift ein Plattform-Notpreis
// (ENV), damit der Checkout nie blockiert. Das ist ausdruecklich nur
// ein Notnagel - im Dashboard wird der Haendler aufgefordert, eigene
// Tarife zu pflegen (hasRates()).
// ============================================================

const { query } = require('./db');

function money(n) { return Math.round((Number(n) || 0) * 100) / 100; }
function cc(c) { const s = String(c || '').toUpperCase().trim(); return s === '*' ? '*' : s.slice(0, 2); }

/* ------------------------------------------------------------
   Plattform-Notpreis (nur wenn der Haendler nichts gepflegt hat)
   ------------------------------------------------------------ */
function platformFallback(weightKg) {
  const base = parseFloat(process.env.SHIP_FALLBACK_BASE_USD || '8');
  const perKg = parseFloat(process.env.SHIP_FALLBACK_PER_KG_USD || '2.5');
  const w = (weightKg > 0) ? weightKg : 1;
  return {
    cost_usd: money(base + perKg * w),
    source: 'platform_default',
    rate_id: null,
    country: null,
    min_days: null,
    max_days: null,
    carrier_hint: null,
    has_rate: false,
  };
}

/* ============================================================
   PFLEGE DURCH DEN HAENDLER
   ============================================================ */

async function listRates(sellerUserId) {
  const r = await query(
    `SELECT id, country, base_usd, per_kg_usd, free_over_usd,
            min_days, max_days, carrier_hint, active, updated_at
       FROM shipping_rates
      WHERE seller_user_id = $1
      ORDER BY (country = '*') ASC, country ASC`,
    [sellerUserId]
  );
  return r.rows;
}

async function hasRates(sellerUserId) {
  const r = await query(
    `SELECT 1 FROM shipping_rates
      WHERE seller_user_id = $1 AND active = true LIMIT 1`,
    [sellerUserId]
  );
  return r.rowCount > 0;
}

// Anlegen oder aendern - ein Tarif je (Haendler, Land).
async function upsertRate(sellerUserId, data) {
  const country = cc(data && data.country);
  if (!country) throw new Error('Land fehlt');
  const r = await query(
    `INSERT INTO shipping_rates
       (seller_user_id, country, base_usd, per_kg_usd, free_over_usd,
        min_days, max_days, carrier_hint, active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,COALESCE($9,true))
     ON CONFLICT (seller_user_id, country) DO UPDATE SET
       base_usd      = EXCLUDED.base_usd,
       per_kg_usd    = EXCLUDED.per_kg_usd,
       free_over_usd = EXCLUDED.free_over_usd,
       min_days      = EXCLUDED.min_days,
       max_days      = EXCLUDED.max_days,
       carrier_hint  = EXCLUDED.carrier_hint,
       active        = EXCLUDED.active,
       updated_at    = now()
     RETURNING *`,
    [
      sellerUserId,
      country,
      money(data.base_usd),
      money(data.per_kg_usd),
      (data.free_over_usd === '' || data.free_over_usd == null) ? null : money(data.free_over_usd),
      (data.min_days == null || data.min_days === '') ? null : parseInt(data.min_days, 10),
      (data.max_days == null || data.max_days === '') ? null : parseInt(data.max_days, 10),
      data.carrier_hint || null,
      typeof data.active === 'boolean' ? data.active : null,
    ]
  );
  return r.rows[0];
}

// Loescht nur einen eigenen Tarif (Schutz gegen fremde IDs).
async function deleteRate(sellerUserId, id) {
  const r = await query(
    `DELETE FROM shipping_rates WHERE id = $1 AND seller_user_id = $2 RETURNING id`,
    [id, sellerUserId]
  );
  return r.rowCount > 0;
}

/* ============================================================
   BERECHNUNG
   ============================================================ */

// Passenden Tarif suchen: exaktes Zielland, sonst die '*'-Zeile.
async function findRate(sellerUserId, country) {
  const c = cc(country);
  const r = await query(
    `SELECT * FROM shipping_rates
      WHERE seller_user_id = $1 AND active = true AND country IN ($2, '*')
      ORDER BY (country = $2) DESC
      LIMIT 1`,
    [sellerUserId, c || '*']
  );
  return r.rows[0] || null;
}

/* ------------------------------------------------------------
   Versandkosten EINER Sendung (ein Haendler, ein Ziel).
   goodsUsd = Warenwert dieses Haendlers in dieser Bestellung,
   noetig fuer die Gratis-Schwelle.
   Wirft NIE - der Checkout darf an der Berechnung nicht scheitern.
   ------------------------------------------------------------ */
async function quoteForSeller({ sellerUserId, country, weightKg, goodsUsd }) {
  const w = (Number(weightKg) > 0) ? Number(weightKg) : 1;
  if (!sellerUserId) return platformFallback(w);

  let rate = null;
  try {
    rate = await findRate(sellerUserId, country);
  } catch (e) {
    console.error('[shippingRates] Tarifsuche fehlgeschlagen:', e.message);
  }
  if (!rate) return platformFallback(w);

  const goods = Number(goodsUsd) || 0;
  const freeOver = (rate.free_over_usd == null) ? null : Number(rate.free_over_usd);
  const free = (freeOver != null && freeOver > 0 && goods >= freeOver);

  return {
    cost_usd: free ? 0 : money(Number(rate.base_usd) + Number(rate.per_kg_usd) * w),
    source: free ? 'seller_free' : 'seller',
    rate_id: rate.id,
    country: rate.country,
    min_days: rate.min_days,
    max_days: rate.max_days,
    carrier_hint: rate.carrier_hint,
    has_rate: true,
  };
}

/* ------------------------------------------------------------
   Kompletter Warenkorb -> Versand je Haendler.
   items: [{ seller_user_id, weight_kg, goods_usd }]  (bereits gruppiert)
   Liefert { shipping_usd, breakdown[] } - breakdown wird beim
   Bestellen je Sendung gespeichert, damit die Erstattung spaeter
   exakt dem entspricht, was der Kunde gezahlt hat.
   ------------------------------------------------------------ */
async function quoteGroups(groups, country) {
  const breakdown = [];
  let total = 0;
  for (const g of (groups || [])) {
    const q = await quoteForSeller({
      sellerUserId: g.seller_user_id,
      country,
      weightKg: g.weight_kg,
      goodsUsd: g.goods_usd,
    });
    total += Number(q.cost_usd) || 0;
    breakdown.push({
      seller_user_id: g.seller_user_id || null,
      weight_kg: money(g.weight_kg),
      goods_usd: money(g.goods_usd),
      cost_usd: money(q.cost_usd),
      source: q.source,
      rate_id: q.rate_id,
      min_days: q.min_days,
      max_days: q.max_days,
      has_rate: q.has_rate,
    });
  }
  return { shipping_usd: money(total), breakdown };
}

module.exports = {
  listRates, hasRates, upsertRate, deleteRate,
  findRate, quoteForSeller, quoteGroups, platformFallback,
};
