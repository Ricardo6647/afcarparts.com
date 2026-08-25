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

async function createOrder({ buyerUserId, email, currency, subtotal, shipping, total, status, address }) {
  const r = await query(
    `INSERT INTO orders (buyer_user_id, email, currency, subtotal, shipping, total, status, address)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [buyerUserId || null, email || null, currency || 'USD', subtotal || 0, shipping || 0, total || 0, status || 'pending', address || {}]
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

async function recordPayment({ orderId, provider, providerPaymentId, amount, currency, status, method, raw }) {
  const r = await query(
    `INSERT INTO payments (order_id, provider, provider_payment_id, amount, currency, status, method, raw)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (provider, provider_payment_id)
     DO UPDATE SET status = EXCLUDED.status, raw = EXCLUDED.raw, updated_at = now()
     RETURNING *`,
    [orderId || null, provider, providerPaymentId, amount || 0, currency || 'USD', status || 'pending', method || null, raw || {}]
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
  // webhooks
  wasEventProcessed, recordEvent, markEventProcessed,
};
