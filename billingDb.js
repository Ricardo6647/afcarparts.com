// file: billingDb.js
// AFCARPARTS - Datenzugriffsschicht fuer Abrechnung & Marktplatz-Auszahlung (Phase 0)
// Provider-neutral. Spricht nur mit Postgres ueber ./db (query -> { rows }).
// Konvention wie userDb.js / storeDb.js: duenne Wrapper, geben rows/Objekte zurueck.

const { query } = require('./db');

/* ============================================================
   MERCHANTS  (1 Zeile pro Verkaeufer-User)
   ============================================================ */

// Stellt sicher, dass fuer einen Seller-User ein merchants-Datensatz existiert.
// Idempotent: legt an, falls nicht vorhanden, und gibt den Datensatz zurueck.
async function ensureMerchant(userId) {
  const ins = await query(
    `INSERT INTO merchants (user_id)
     VALUES ($1)
     ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id
     RETURNING *`,
    [userId]
  );
  return ins.rows[0];
}

async function getMerchantByUserId(userId) {
  const r = await query(`SELECT * FROM merchants WHERE user_id = $1`, [userId]);
  return r.rows[0] || null;
}

async function getMerchantById(merchantId) {
  const r = await query(`SELECT * FROM merchants WHERE id = $1`, [merchantId]);
  return r.rows[0] || null;
}

async function setMerchantKyc(merchantId, kycStatus) {
  const r = await query(
    `UPDATE merchants SET kyc_status = $2, updated_at = now() WHERE id = $1 RETURNING *`,
    [merchantId, kycStatus]
  );
  return r.rows[0] || null;
}

async function setDefaultPayoutProvider(merchantId, provider) {
  const r = await query(
    `UPDATE merchants SET default_payout_provider = $2, updated_at = now() WHERE id = $1 RETURNING *`,
    [merchantId, provider]
  );
  return r.rows[0] || null;
}

async function acceptContract(merchantId, version) {
  const r = await query(
    `UPDATE merchants
        SET contract_version = $2, contract_accepted_at = now(), updated_at = now()
      WHERE id = $1 RETURNING *`,
    [merchantId, version]
  );
  return r.rows[0] || null;
}

/* ============================================================
   PROVIDER_ACCOUNTS  (externe IDs pro Merchant pro Provider)
   kind: 'customer' | 'subaccount' | 'payee' | 'connect'
   ============================================================ */

async function upsertProviderAccount({ merchantId, provider, kind, externalId, status, currency, meta }) {
  const r = await query(
    `INSERT INTO provider_accounts (merchant_id, provider, kind, external_id, status, currency, meta)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (merchant_id, provider, kind)
     DO UPDATE SET external_id = EXCLUDED.external_id,
                   status      = EXCLUDED.status,
                   currency    = EXCLUDED.currency,
                   meta        = EXCLUDED.meta,
                   updated_at  = now()
     RETURNING *`,
    [merchantId, provider, kind, externalId, status || 'active', currency || null, meta || {}]
  );
  return r.rows[0];
}

async function getProviderAccount(merchantId, provider, kind) {
  const r = await query(
    `SELECT * FROM provider_accounts
      WHERE merchant_id = $1 AND provider = $2 AND kind = $3`,
    [merchantId, provider, kind]
  );
  return r.rows[0] || null;
}

/* ============================================================
   SUBSCRIPTIONS  (Haendler-Abo)
   plan: 'basic' | 'pro'   status: 'active'|'past_due'|'unpaid'|'canceled'|'incomplete'
   ============================================================ */

async function upsertSubscription({ merchantId, provider, plan, productLimit, status, providerSubscriptionId, currentPeriodEnd, cancelAtPeriodEnd }) {
  const r = await query(
    `INSERT INTO subscriptions
       (merchant_id, provider, plan, product_limit, status, provider_subscription_id, current_period_end, cancel_at_period_end)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (provider, provider_subscription_id)
     DO UPDATE SET plan                 = EXCLUDED.plan,
                   product_limit        = EXCLUDED.product_limit,
                   status               = EXCLUDED.status,
                   current_period_end   = EXCLUDED.current_period_end,
                   cancel_at_period_end = EXCLUDED.cancel_at_period_end,
                   updated_at           = now()
     RETURNING *`,
    [merchantId, provider, plan, productLimit, status, providerSubscriptionId, currentPeriodEnd || null, !!cancelAtPeriodEnd]
  );
  return r.rows[0];
}

// Aktives Abo eines Merchants (fuer das Portal-Gate in Phase 1).
async function getActiveSubscription(merchantId) {
  const r = await query(
    `SELECT * FROM subscriptions
      WHERE merchant_id = $1 AND status = 'active'
      ORDER BY current_period_end DESC NULLS LAST, created_at DESC
      LIMIT 1`,
    [merchantId]
  );
  return r.rows[0] || null;
}

async function setSubscriptionStatusByProviderId(provider, providerSubscriptionId, status, currentPeriodEnd, cancelAtPeriodEnd) {
  // cancelAtPeriodEnd: true/false setzt das Flag, undefined/null laesst es unveraendert.
  const r = await query(
    `UPDATE subscriptions
        SET status = $3,
            current_period_end   = COALESCE($4, current_period_end),
            cancel_at_period_end = COALESCE($5, cancel_at_period_end),
            updated_at = now()
      WHERE provider = $1 AND provider_subscription_id = $2
      RETURNING *`,
    [provider, providerSubscriptionId, status, currentPeriodEnd || null,
     (cancelAtPeriodEnd === true || cancelAtPeriodEnd === false) ? cancelAtPeriodEnd : null]
  );
  return r.rows[0] || null;
}

/* ============================================================
   ORDERS / ORDER_ITEMS  (Bestellungen in Postgres)
   ============================================================ */

// fx: { base_currency, fx_rate, fx_source, fx_at } - EINMALIG eingefroren.
// Wird nach dem Anlegen nie wieder veraendert; alle Berichte lesen ihn nur.
async function createOrder({ buyerUserId, email, currency, subtotal, shipping, total, status, address, fx }) {
  const f = fx || {};
  const r = await query(
    `INSERT INTO orders (buyer_user_id, email, currency, subtotal, shipping, total, status, address,
                         base_currency, fx_rate, fx_source, fx_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [buyerUserId || null, email || null, currency || 'USD', subtotal || 0, shipping || 0, total || 0,
     status || 'pending', address || {},
     f.base_currency || 'USD',
     (f.fx_rate === undefined || f.fx_rate === null) ? 1 : f.fx_rate,
     f.fx_source || 'identity',
     f.fx_at || new Date().toISOString()]
  );
  return r.rows[0];
}

async function addOrderItem({ orderId, productId, shopId, merchantId, title, qty, unitPrice, lineTotal, commissionRate, commissionAmount, payoutAmount }) {
  const r = await query(
    `INSERT INTO order_items
       (order_id, product_id, shop_id, merchant_id, title, qty, unit_price, line_total,
        commission_rate, commission_amount, payout_amount, payout_status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending')
     RETURNING *`,
    [orderId, productId || null, shopId || null, merchantId || null, title || null,
     qty || 1, unitPrice || 0, lineTotal || 0, commissionRate || 0, commissionAmount || 0, payoutAmount || 0]
  );
  return r.rows[0];
}

async function getOrder(orderId) {
  const r = await query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
  return r.rows[0] || null;
}

async function listOrderItems(orderId) {
  const r = await query(`SELECT * FROM order_items WHERE order_id = $1 ORDER BY id ASC`, [orderId]);
  return r.rows;
}

async function setOrderStatus(orderId, status) {
  const r = await query(
    `UPDATE orders SET status = $2, updated_at = now() WHERE id = $1 RETURNING *`,
    [orderId, status]
  );
  return r.rows[0] || null;
}

/* ============================================================
   PAYMENTS (Inkasso vom Kunden) / PAYOUTS (an Haendler) / DISPUTES
   ============================================================ */

// fxRate/localAmount/localCurrency: der beim INKASSO tatsaechlich verwendete
// Kurs (z. B. USD -> GHS bei pawaPay). Getrennt vom eingefrorenen Berichtskurs
// der Bestellung, weil beide unterschiedliche Fragen beantworten:
//   orders.fx_rate    -> was ist die Bestellung im Bericht wert?
//   payments.fx_rate  -> zu welchem Kurs kam das Geld tatsaechlich herein?
async function recordPayment({ orderId, provider, providerPaymentId, amount, currency, status, method, raw,
                               fxRate, localAmount, localCurrency }) {
  const r = await query(
    `INSERT INTO payments (order_id, provider, provider_payment_id, amount, currency, status, method, raw,
                           fx_rate, local_amount, local_currency)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     ON CONFLICT (provider, provider_payment_id)
     DO UPDATE SET status = EXCLUDED.status, raw = EXCLUDED.raw, updated_at = now(),
                   fx_rate        = COALESCE(EXCLUDED.fx_rate, payments.fx_rate),
                   local_amount   = COALESCE(EXCLUDED.local_amount, payments.local_amount),
                   local_currency = COALESCE(EXCLUDED.local_currency, payments.local_currency)
     RETURNING *`,
    [orderId || null, provider, providerPaymentId, amount || 0, currency || 'USD',
     status || 'pending', method || null, raw || {},
     (fxRate === undefined || fxRate === null) ? null : fxRate,
     (localAmount === undefined || localAmount === null) ? null : localAmount,
     localCurrency || null]
  );
  return r.rows[0];
}

async function recordPayout({ merchantId, orderId, provider, providerPayoutId, amount, currency, status, kind, raw }) {
  const r = await query(
    `INSERT INTO payouts (merchant_id, order_id, provider, provider_payout_id, amount, currency, status, kind, raw)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT (provider, provider_payout_id)
     DO UPDATE SET status = EXCLUDED.status, raw = EXCLUDED.raw, updated_at = now()
     RETURNING *`,
    [merchantId, orderId || null, provider, providerPayoutId || null, amount || 0, currency || 'USD', status || 'pending', kind || 'auto_split', raw || {}]
  );
  return r.rows[0];
}

async function recordDispute({ paymentId, orderId, provider, providerDisputeId, amount, currency, status, reason, raw }) {
  const r = await query(
    `INSERT INTO disputes (payment_id, order_id, provider, provider_dispute_id, amount, currency, status, reason, raw)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT (provider, provider_dispute_id)
     DO UPDATE SET status = EXCLUDED.status, raw = EXCLUDED.raw, updated_at = now()
     RETURNING *`,
    [paymentId || null, orderId || null, provider, providerDisputeId, amount || 0, currency || 'USD', status || 'open', reason || null, raw || {}]
  );
  return r.rows[0];
}

/* ============================================================
   LEDGER  (Haendlerguthaben aus Plattform-Charges)

   Wenn die Plattform selbst kassiert (Haendler ohne Stripe-Connect-Konto,
   also Nigeria, Ghana, Suedafrika, Angola, Mobile-Money-Laender), steht
   der Haendleranteil in order_items.payout_amount mit payout_status
   'pending'. Diese Funktionen lesen und schliessen diese Posten ab.
   Keine neue Tabelle noetig - die Spalten existieren bereits.
   ============================================================ */

// Offene Auszahlungen, gruppiert pro Haendler und Waehrung.
// Nur aus bezahlten Bestellungen - unbezahlte duerfen nie ausgezahlt werden.
async function listPendingPayouts() {
  const r = await query(
    `SELECT oi.merchant_id,
            m.user_id,
            m.default_payout_provider,
            o.currency,
            COUNT(*)::int                     AS item_count,
            SUM(oi.payout_amount)::float8     AS amount,
            SUM(oi.payout_amount * o.fx_rate)::float8 AS amount_base,
            SUM(oi.commission_amount)::float8 AS commission,
            MIN(o.created_at)                 AS oldest_order
       FROM order_items oi
       JOIN orders    o ON o.id = oi.order_id
       JOIN merchants m ON m.id = oi.merchant_id
      WHERE o.status = 'paid'
        AND oi.payout_status IN ('pending','released')
        AND oi.merchant_id IS NOT NULL
      GROUP BY oi.merchant_id, m.user_id, m.default_payout_provider, o.currency
      HAVING SUM(oi.payout_amount) > 0
      ORDER BY SUM(oi.payout_amount) DESC`
  );
  return r.rows;
}

// Offenes Guthaben eines einzelnen Haendlers (fuer sein Dashboard).
async function getMerchantBalance(merchantId) {
  const r = await query(
    `SELECT o.currency,
            COUNT(*)::int                 AS item_count,
            SUM(oi.payout_amount)::float8 AS amount
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
      WHERE oi.merchant_id = $1
        AND o.status = 'paid'
        AND oi.payout_status IN ('pending','released')
      GROUP BY o.currency`,
    [merchantId]
  );
  return r.rows;
}

// Posten nach erfolgter Auszahlung abschliessen. Gibt die Anzahl zurueck.
// payoutId verknuepft die Posten mit dem payouts-Datensatz (Audit-Spur).
async function markPayoutItemsPaid(merchantId, currency, payoutId) {
  const r = await query(
    `UPDATE order_items oi
        SET payout_status = 'paid'
       FROM orders o
      WHERE o.id = oi.order_id
        AND oi.merchant_id = $1
        AND o.currency = $2
        AND o.status = 'paid'
        AND oi.payout_status IN ('pending','released')
      RETURNING oi.id`,
    [merchantId, currency]
  );
  return { count: r.rows.length, payoutId: payoutId || null };
}

// Alle hinterlegten Auszahlungsziele eines Haendlers auf einen Blick.
async function listProviderAccounts(merchantId) {
  const r = await query(
    `SELECT provider, kind, external_id, status, currency, meta
       FROM provider_accounts WHERE merchant_id = $1`,
    [merchantId]
  );
  return r.rows;
}

/* ============================================================
   UMSATZ-AUSWERTUNG nach Zeitraum

   ACHTUNG zur Rechenlogik: order_items.payout_amount ist BEREITS
   der Nettobetrag (line_total minus commission_amount). Wer davon
   nochmals Provision abzieht, zahlt dem Haendler zu wenig aus.
   Deshalb liefern diese Abfragen alle drei Groessen getrennt:
     gross      = Umsatz des Haendlers vor Provision
     commission = einbehaltene Provision
     net        = was der Haendler bekommt  (gross - commission)
   ============================================================ */

// Erlaubte Zeitraster - Whitelist, damit nie ungeprueftes SQL entsteht.
const PERIODS = ['day', 'week', 'month', 'quarter', 'year'];
function safePeriod(p) {
  const v = String(p || 'month').toLowerCase();
  return PERIODS.includes(v) ? v : 'month';
}

// Zeitreihe fuer EINEN Haendler.
async function getMerchantEarnings(merchantId, { period = 'month', from = null, to = null, limit = 24 } = {}) {
  const p = safePeriod(period);
  const r = await query(
    `SELECT date_trunc($2, o.created_at)          AS bucket,
            o.currency,
            COUNT(*)::int                          AS item_count,
            COUNT(DISTINCT o.id)::int              AS order_count,
            SUM(oi.line_total)::float8             AS gross,
            SUM(oi.commission_amount)::float8      AS commission,
            SUM(oi.payout_amount)::float8          AS net,
            SUM(CASE WHEN oi.payout_status IN ('pending','released') THEN oi.payout_amount ELSE 0 END)::float8 AS pending,
            SUM(CASE WHEN oi.payout_status = 'paid'    THEN oi.payout_amount ELSE 0 END)::float8 AS paid,
            -- Umrechnung mit dem zur Bestellung EINGEFRORENEN Kurs
            SUM(oi.line_total    * o.fx_rate)::float8 AS gross_base,
            SUM(oi.commission_amount * o.fx_rate)::float8 AS commission_base,
            SUM(oi.payout_amount * o.fx_rate)::float8 AS net_base,
            BOOL_OR(o.fx_source = 'unavailable')      AS fx_incomplete
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
      WHERE oi.merchant_id = $1
        AND o.status = 'paid'
        AND ($3::timestamptz IS NULL OR o.created_at >= $3)
        AND ($4::timestamptz IS NULL OR o.created_at <  $4)
      GROUP BY 1, 2
      ORDER BY 1 DESC
      LIMIT $5`,
    [merchantId, p, from, to, Math.min(Number(limit) || 24, 200)]
  );
  return r.rows;
}

// Gesamtsumme eines Haendlers ueber einen Zeitraum (ohne Raster).
async function getMerchantEarningsTotal(merchantId, { from = null, to = null } = {}) {
  const r = await query(
    `SELECT o.currency,
            COUNT(DISTINCT o.id)::int         AS order_count,
            SUM(oi.line_total)::float8        AS gross,
            SUM(oi.commission_amount)::float8 AS commission,
            SUM(oi.payout_amount)::float8     AS net
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
      WHERE oi.merchant_id = $1
        AND o.status = 'paid'
        AND ($2::timestamptz IS NULL OR o.created_at >= $2)
        AND ($3::timestamptz IS NULL OR o.created_at <  $3)
      GROUP BY o.currency`,
    [merchantId, from, to]
  );
  return r.rows;
}

// Admin: alle Haendler mit Umsatz im Zeitraum, fuer Uebersicht und Nachweis.
async function listAllMerchantEarnings({ from = null, to = null } = {}) {
  const r = await query(
    `SELECT oi.merchant_id,
            m.user_id,
            m.default_payout_provider,
            o.currency,
            COUNT(DISTINCT o.id)::int              AS order_count,
            COUNT(*)::int                          AS item_count,
            SUM(oi.line_total)::float8             AS gross,
            SUM(oi.commission_amount)::float8      AS commission,
            SUM(oi.payout_amount)::float8          AS net,
            SUM(CASE WHEN oi.payout_status IN ('pending','released') THEN oi.payout_amount ELSE 0 END)::float8 AS pending,
            SUM(CASE WHEN oi.payout_status = 'paid'    THEN oi.payout_amount ELSE 0 END)::float8 AS paid,
            -- Basiswaehrung, gerechnet mit dem eingefrorenen Kurs der Bestellung
            SUM(oi.line_total        * o.fx_rate)::float8 AS gross_base,
            SUM(oi.commission_amount * o.fx_rate)::float8 AS commission_base,
            SUM(oi.payout_amount     * o.fx_rate)::float8 AS net_base,
            SUM(CASE WHEN oi.payout_status IN ('pending','released')
                     THEN oi.payout_amount * o.fx_rate ELSE 0 END)::float8 AS pending_base,
            BOOL_OR(o.fx_source = 'unavailable')          AS fx_incomplete,
            MIN(o.created_at)                      AS first_order,
            MAX(o.created_at)                      AS last_order
       FROM order_items oi
       JOIN orders    o ON o.id = oi.order_id
       JOIN merchants m ON m.id = oi.merchant_id
      WHERE o.status = 'paid'
        AND oi.merchant_id IS NOT NULL
        AND ($1::timestamptz IS NULL OR o.created_at >= $1)
        AND ($2::timestamptz IS NULL OR o.created_at <  $2)
      GROUP BY oi.merchant_id, m.user_id, m.default_payout_provider, o.currency
      ORDER BY SUM(oi.payout_amount) DESC`,
    [from, to]
  );
  return r.rows;
}

// Einzelposten eines Haendlers - die Belegebene fuer einen Nachweis.
async function listMerchantEarningItems(merchantId, { from = null, to = null, limit = 5000 } = {}) {
  const r = await query(
    `SELECT o.id                  AS order_id,
            o.created_at,
            o.currency,
            oi.title,
            oi.qty,
            oi.unit_price::float8        AS unit_price,
            oi.line_total::float8        AS gross,
            oi.commission_rate::float8   AS commission_rate,
            oi.commission_amount::float8 AS commission,
            oi.payout_amount::float8     AS net,
            oi.payout_status,
            o.base_currency,
            o.fx_rate::float8            AS fx_rate,
            o.fx_source,
            (oi.payout_amount * o.fx_rate)::float8 AS net_base
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
      WHERE oi.merchant_id = $1
        AND o.status = 'paid'
        AND ($2::timestamptz IS NULL OR o.created_at >= $2)
        AND ($3::timestamptz IS NULL OR o.created_at <  $3)
      ORDER BY o.created_at DESC, oi.id ASC
      LIMIT $4`,
    [merchantId, from, to, Math.min(Number(limit) || 5000, 20000)]
  );
  return r.rows;
}

/* ============================================================
   WEBHOOK_EVENTS  (Idempotenz: jedes Provider-Event nur 1x verarbeiten)
   ============================================================ */

// true, wenn dieses (provider, eventId) bereits verarbeitet wurde.
async function wasEventProcessed(provider, eventId) {
  const r = await query(
    `SELECT 1 FROM webhook_events WHERE provider = $1 AND provider_event_id = $2 AND processed_at IS NOT NULL`,
    [provider, eventId]
  );
  return r.rows.length > 0;
}

// Legt das Event an (falls neu) und gibt zurueck, ob es NEU ist.
// Verhindert Doppelverarbeitung bei Webhook-Retries.
async function recordEvent({ provider, eventId, type, payload }) {
  const r = await query(
    `INSERT INTO webhook_events (provider, provider_event_id, type, payload)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (provider, provider_event_id) DO NOTHING
     RETURNING id`,
    [provider, eventId, type || null, payload || {}]
  );
  return { isNew: r.rows.length > 0 };
}

async function markEventProcessed(provider, eventId) {
  await query(
    `UPDATE webhook_events SET processed_at = now() WHERE provider = $1 AND provider_event_id = $2`,
    [provider, eventId]
  );
}

module.exports = {
  // merchants
  ensureMerchant, getMerchantByUserId, getMerchantById, setMerchantKyc,
  setDefaultPayoutProvider, acceptContract,
  // provider accounts
  upsertProviderAccount, getProviderAccount,
  // subscriptions
  upsertSubscription, getActiveSubscription, setSubscriptionStatusByProviderId,
  // orders
  createOrder, addOrderItem, getOrder, listOrderItems, setOrderStatus,
  // money
  recordPayment, recordPayout, recordDispute,
  // ledger
  listPendingPayouts, getMerchantBalance, markPayoutItemsPaid, listProviderAccounts,
  // earnings
  getMerchantEarnings, getMerchantEarningsTotal, listAllMerchantEarnings,
  listMerchantEarningItems, PERIODS,
  // webhooks
  wasEventProcessed, recordEvent, markEventProcessed,
};
