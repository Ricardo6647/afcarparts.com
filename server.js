// file: server.js
// AFRICARPARTS - Backend API + Frontend
// Status: categories, shops, products laufen auf Postgres (mehrsprachig)
// Auth: bcrypt + JWT (Etappe 3.4)
// Seller-Dashboard: Image-Upload + CRUD (Etappe 4.2)

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { load, save } = require('./store');
const { uploadToR2, deleteFromR2 } = require('./r2');
const { query } = require('./db');
const db = require('./storeDb');
const billingDb = require('./billingDb');
const fx = require('./fx');
let accountingDb = null;
try { accountingDb = require('./accountingDb'); }
catch (e) { console.error('[accounting] Modul nicht ladbar:', e.message); }
const shippingDb = require('./shippingDb');
const mailer = require('./mailer'); // Transaktions-E-Mails (Bestellung, Passwort, Haendler)
const shippingProviders = require('./shippingProviders');
const shippingRates = require('./shippingRates');
const tracking = require('./trackingProviders');
const escrow = require('./escrow');
   const payments = require('./paymentProviders'); // Phase 0: Fundament + Routing
// === PATCH 1: Auth-Imports ===
const cookieParser = require('cookie-parser');
const userDb = require('./userDb');
const { signAccessToken, verifyAccessToken } = require('./auth');
const { autoFillTranslations } = require('./translator');

const app = express();
// ============================================================
//  PHASE 1 - BLOCK W : STRIPE WEBHOOK  (RAW BODY!)
//  EINFUEGEN direkt NACH:  const app = express();   (ca. Zeile 24)
//  und VOR:  app.use(express.json(...));            (ca. Zeile 52)
//  Grund: Stripe verlangt den ROHEN Body zur Signaturpruefung.
// ============================================================
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const evt = await payments.ingestWebhook('stripe', {
      rawBody: req.body,        // Buffer dank express.raw
      headers: req.headers,
    });
    // Duplikat (Retry) -> still bestaetigen
    if (!evt) return res.json({ received: true, duplicate: true });

    if (evt.kind === 'subscription') {
      await handleStripeSubscriptionEvent(evt);
    } else if (evt.kind === 'order_payment') {
      await handleStripeOrderPaid(evt);
    }

    await payments.markWebhookDone('stripe', evt.eventId);
    res.json({ received: true });
  } catch (err) {
    console.error('[stripe webhook]', err.message);
    // 400 -> Stripe weiss, dass es nicht erfolgreich war
    res.status(400).json({ error: err.message });
  }
});

// Setzt eine per Stripe bezahlte Bestellung server-seitig auf 'paid' (greift, wenn der Kaeufer nach der Zahlung nicht zur Seite zurueckkehrt).
// Idempotent ueber den Bestellstatus: laeuft nur, wenn die Bestellung noch nicht 'paid' ist
// (greift z. B., wenn der Kaeufer nach der Zahlung nicht zur Seite zurueckkehrt).
async function handleStripeOrderPaid(evt) {
  const d = evt.data || {};
  const orderId = d.orderId;
  if (!orderId) return;
  if ((d.paymentStatus || 'paid') !== 'paid') return;

  const order = await billingDb.getOrder(orderId);
  if (!order) { console.warn('[stripe/webhook] order_payment: Bestellung', orderId, 'nicht gefunden'); return; }
  if (order.status === 'paid') return; // bereits verarbeitet (z. B. via verify) -> idempotent

  await billingDb.recordPayment({
    orderId: orderId, provider: 'stripe',
    providerPaymentId: d.paymentIntentId || ('evt_' + evt.eventId),
    amount: (d.amountTotal ? d.amountTotal / 100 : Number(order.total) || 0),
    currency: (d.currency || order.currency || 'usd'),
    status: 'succeeded', method: 'card', raw: { via: 'stripe_webhook', eventId: evt.eventId },
  });

  await billingDb.setOrderStatus(orderId, 'paid');
  await shippingDb.createShipmentsForPaidOrder(orderId).catch((e) => console.error('[shipping]', e.message));
  mailer.notifyOrderPaid(orderId); // wirft nie, idempotent
  const items = await billingDb.listOrderItems(orderId);

  for (const it of items) {
    if (it.product_id) {
      await query(`UPDATE products SET stock = GREATEST(COALESCE(stock,0) - $2, 0) WHERE id = $1`, [it.product_id, it.qty || 1]);
    }
  }
    // TREUHAND: Geld bleibt bei uns, bis der Versand nachgewiesen ist.
  // Freigabe erfolgt je Sendung in escrow.js - bei bestaetigtem Tracking
  // (Versandanteil) bzw. bei Zustellung/Kundenbestaetigung (Warenwert).
  await query(`UPDATE order_items SET payout_status = 'held' WHERE order_id = $1 AND payout_status = 'pending'`, [orderId]);
  console.log('[escrow] Bestellung', orderId, '- Haendleranteil gehalten bis Versandnachweis');
  console.log('[stripe/webhook] Bestellung', orderId, 'via Webhook auf paid gesetzt');
}

// Spiegelt Stripe-Abo-Events in die eigene subscriptions-Tabelle.
async function handleStripeSubscriptionEvent(evt) {
  const d = evt.data || {};
  const PLAN_LIMIT = { basic: 10, pro: 100 };

  if (d.action === 'checkout_completed') {
    if (d.providerSubscriptionId && d.merchantId) {
      await billingDb.upsertSubscription({
        merchantId: d.merchantId,
        provider: 'stripe',
        plan: d.plan || 'basic',
        productLimit: PLAN_LIMIT[d.plan] || 0,
        status: 'active',
        providerSubscriptionId: d.providerSubscriptionId,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      });
    }
    return;
  }

  if (d.action === 'sub_updated') {
    if (!d.providerSubscriptionId) return;
    const updated = await billingDb.setSubscriptionStatusByProviderId(
      'stripe', d.providerSubscriptionId, d.status, d.currentPeriodEnd, d.cancelAtPeriodEnd
    );
    // Falls der Datensatz noch nicht existiert: anlegen (Merchant aus metadata)
    if (!updated && d.merchantId) {
      await billingDb.upsertSubscription({
        merchantId: d.merchantId,
        provider: 'stripe',
        plan: d.plan || 'basic',
        productLimit: PLAN_LIMIT[d.plan] || 0,
        status: d.status,
        providerSubscriptionId: d.providerSubscriptionId,
        currentPeriodEnd: d.currentPeriodEnd,
        cancelAtPeriodEnd: d.cancelAtPeriodEnd,
      });
    }
    return;
  }

  if (d.action === 'sub_canceled') {
    await billingDb.setSubscriptionStatusByProviderId('stripe', d.providerSubscriptionId, 'canceled', null);
    return;
  }

  if (d.action === 'payment_failed') {
    if (d.providerSubscriptionId) {
      await billingDb.setSubscriptionStatusByProviderId('stripe', d.providerSubscriptionId, 'past_due', null);
    }
    return;
  }
}

// WICHTIG für Render/Heroku/etc: Trust X-Forwarded-Proto, sonst sind upload URLs http:// statt https:// (Mixed Content!)
app.set('trust proxy', true);

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const allowedOrigins = [
  'https://afcarparts.com',
  'https://www.afcarparts.com',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5500'
];

app.use(cors({
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return cb(null, true);
    return cb(new Error('CORS blocked: ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language', 'x-migration-secret', 'X-View-Seller-Id']
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));
const upload = multer({ dest: uploadsDir });

// === PATCH A (Etappe 4.2): Image-Upload mit Validierung (jpg/png, max 2 MB) ===
// Phase R2: Bilder kommen als Buffer in req.files, werden direkt zu R2 gestreamt
const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new Error('Nur JPEG, PNG und WebP erlaubt'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB pro Bild
});

// Banner-Upload: Bild ODER Video (mp4/webm), bis 20 MB -> R2
const bannerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg','image/png','image/webp','video/mp4','video/webm'];
    if (!ok.includes(file.mimetype)) return cb(new Error('Nur JPG, PNG, WebP, MP4 oder WebM erlaubt'));
    cb(null, true);
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});
const publicDir = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : __dirname;
app.use(express.static(publicDir, { index: 'index.html', extensions: ['html'], maxAge: 0 }));
console.log('Frontend wird ausgeliefert aus:', publicDir);

/* ------------------------------------------------------------
   RATE-LIMIT fuer Login/Registrierung/Passwort-Reset
   Einfacher In-Memory-Zaehler pro IP (reicht fuer eine Render-Instanz).
   Ergaenzt die Kontosperre in userDb (account_locked) um einen Schutz
   gegen Durchprobieren vieler Konten von einer IP.
   ------------------------------------------------------------ */
const _rateBuckets = new Map();
function rateLimit(name, max, windowMs) {
  return function (req, res, next) {
    const key = name + '|' + (req.ip || 'unknown');
    const now = Date.now();
    let b = _rateBuckets.get(key);
    if (!b || now > b.reset) { b = { count: 0, reset: now + windowMs }; _rateBuckets.set(key, b); }
    b.count++;
    if (b.count > max) {
      const retry = Math.ceil((b.reset - now) / 1000);
      res.set('Retry-After', String(retry));
      return res.status(429).json({ error: 'too_many_requests', retry_after: retry });
    }
    next();
  };
}
setInterval(() => {
  const now = Date.now();
  for (const [k, b] of _rateBuckets) if (now > b.reset) _rateBuckets.delete(k);
}, 10 * 60 * 1000).unref();
const RL_LOGIN    = rateLimit('login', 10, 15 * 60 * 1000);   // 10 Versuche / 15 Min.
const RL_REGISTER = rateLimit('register', 10, 60 * 60 * 1000); // 10 Konten / Stunde
const RL_RESET    = rateLimit('reset', 5, 60 * 60 * 1000);     // 5 Reset-Mails / Stunde

function requireAuth(req, res, next) {
  const header = (req.headers.authorization || '').trim();
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const payload = verifyAccessToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });
  req.user = { id: payload.sub, email: payload.email, role: payload.role, name: payload.name };
  next();
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, (err) => {
    if (err) return next(err);
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' });
    }
    next();
  });
}

const SUPPORTED_LANGS = ['en', 'de', 'fr', 'pt', 'sw', 'es', 'ar', 'tr', 'ln'];
function getLang(req) {
  const fromQuery = (req.query.lang || '').toLowerCase().trim();
  if (SUPPORTED_LANGS.includes(fromQuery)) return fromQuery;
  const acceptLang = (req.headers['accept-language'] || '').toLowerCase();
  for (const l of SUPPORTED_LANGS) {
    if (acceptLang.includes(l)) return l;
  }
  return 'en';
}

/* ============================================================
   GEO: Länder-Erkennung anhand der Client-IP
   - 1) Cloudflare-Header cf-ipcountry (falls je Proxy aktiv)
   - 2) Fallback ipwho.is per IP (kostenlos, kein API-Key)
   - In-Memory-Cache (24h) reduziert externe Aufrufe
   ============================================================ */
const _geoCache = new Map(); // ip -> { country, ts }
const _GEO_TTL = 24 * 60 * 60 * 1000;

function getClientIp(req) {
  const xff = String(req.headers['x-forwarded-for'] || '');
  const chain = xff.split(',').map(s => s.trim().replace(/^::ffff:/, '')).filter(Boolean);
  // Client steht links in der Kette: erste ÖFFENTLICHE IP bevorzugen
  // (überspringt Proxy-/Render-interne IPs, die sonst fälschlich ein Land liefern)
  for (const ip of chain) {
    if (!isPrivateIp(ip)) return ip;
  }
  // Fallback: erste Ketten-IP, sonst req.ip
  const first = chain[0] || '';
  const reqIp = String(req.ip || '').replace(/^::ffff:/, '');
  return first || reqIp || '';
}

function isPrivateIp(ip) {
  if (!ip) return true;
  return ip === '::1' || ip.startsWith('127.') || ip.startsWith('10.') ||
    ip.startsWith('192.168.') || /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith('fc') || ip.startsWith('fd');
}

async function detectCountry(req) {
  // 1) Cloudflare-Proxy-Header (kostenlos, sofort) – falls je vorhanden
  const cf = (req.headers['cf-ipcountry'] || '').toUpperCase();
  if (/^[A-Z]{2}$/.test(cf) && cf !== 'XX' && cf !== 'T1') return cf;

  // 2) IP-basierter Fallback über ipwho.is
  const ip = getClientIp(req);
  if (isPrivateIp(ip)) return null;

  const cached = _geoCache.get(ip);
  if (cached && (Date.now() - cached.ts) < _GEO_TTL) return cached.country;

  try {
    const ctrl = new AbortController();
    const tmo = setTimeout(() => ctrl.abort(), 2500);
    const r = await fetch('https://ipwho.is/' + encodeURIComponent(ip) + '?fields=success,country_code', { signal: ctrl.signal });
    clearTimeout(tmo);
    if (r.ok) {
      const j = await r.json();
      const cc = (j && j.success && j.country_code ? String(j.country_code) : '').toUpperCase();
      if (/^[A-Z]{2}$/.test(cc)) {
        _geoCache.set(ip, { country: cc, ts: Date.now() });
        return cc;
      }
    }
  } catch (e) { /* Timeout/Netzfehler → null */ }

  _geoCache.set(ip, { country: null, ts: Date.now() });
  return null;
}

/* Diagnose-Endpunkt: zeigt, welche IP/Land der Server für DICH erkennt.
   Hilft beim Debuggen der "Shops in deiner Nähe"-Geo-Erkennung.
   Gibt NUR geo-relevante Header zurück (keine Cookies/Auth). */
app.get('/api/_geo-debug', async (req, res) => {
  const ip = getClientIp(req);
  let detected = null;
  try { detected = await detectCountry(req); } catch (e) {}
  res.json({
    parsed_client_ip: ip,
    is_private: isPrivateIp(ip),
    detected_country: detected,
    headers: {
      'x-forwarded-for': req.headers['x-forwarded-for'] || null,
      'x-real-ip': req.headers['x-real-ip'] || null,
      'cf-ipcountry': req.headers['cf-ipcountry'] || null,
      'cf-connecting-ip': req.headers['cf-connecting-ip'] || null
    },
    express_req_ip: req.ip || null
  });
});

function makeSlug(text) {
  return String(text || '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

async function resolveTags(tagSlugs) {
  if (!Array.isArray(tagSlugs) || tagSlugs.length === 0) return [];
  const cleaned = tagSlugs.map(t => makeSlug(t)).filter(t => t.length >= 2 && t.length <= 50);
  if (cleaned.length === 0) return [];
  const ids = [];
  for (const slug of cleaned) {
    const res = await query(`
      INSERT INTO tags (slug) VALUES ($1)
      ON CONFLICT (slug) DO UPDATE SET slug = EXCLUDED.slug
      RETURNING id
    `, [slug]);
    ids.push(res.rows[0].id);
  }
  return ids;
}

app.get('/api', (req, res) => {
  res.json({ name: 'AFRICARPARTS API', status: 'running', docs: '/health' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/db-test', requireAdmin, async (req, res) => {
  try {
    const result = await query('SELECT NOW() as time, version() as version');
    res.json({ ok: true, time: result.rows[0].time, version: result.rows[0].version });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/admin/run-migration', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.headers['x-migration-secret'] !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid migration secret' });
  const filename = (req.body && req.body.file) || '001_initial_schema.sql';
  if (!/^\d+_[a-z0-9_]+\.sql$/i.test(filename)) return res.status(400).json({ error: 'Invalid filename format' });
  const migrationPath = path.join(__dirname, 'migrations', filename);
  if (!fs.existsSync(migrationPath)) return res.status(404).json({ error: 'Migration file not found', file: filename });
  try {
    const sql = fs.readFileSync(migrationPath, 'utf8');
    await query(sql);
    res.json({ ok: true, file: filename, message: 'Migration completed successfully' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
// file: server.js — Block einfügen (Phase 0 Migrations-Endpoint)
// Oberhalb von app.get('/api/seed-categories', ...) platzieren.
// Nutzt deinen vorhandenen query()-Helper und ?secret=-Schutz.

/* ============================================================
   PHASE 0 - BILLING/MARKETPLACE MIGRATION
   Einmal aufrufen: GET /api/migrate-billing?secret=MIGRATION_SECRET
   Idempotent (CREATE TABLE IF NOT EXISTS) - mehrfach aufrufbar.
   ============================================================ */
app.get('/api/migrate-billing', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];
  try {
    // 1) ID-Typen der bestehenden Tabellen erkennen, damit FKs typkompatibel sind.
    const typeRes = await query(
      `SELECT table_name, data_type
         FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name = 'id'
          AND table_name IN ('users','shops','products')`
    );
    const map = {};
    for (const row of typeRes.rows) map[row.table_name] = row.data_type;

    const toCol = (dt) => {
      switch ((dt || '').toLowerCase()) {
        case 'integer':           return 'INTEGER';
        case 'bigint':            return 'BIGINT';
        case 'smallint':          return 'SMALLINT';
        case 'uuid':              return 'UUID';
        case 'numeric':           return 'NUMERIC';
        case 'character varying':
        case 'text':              return 'TEXT';
        default:                  return 'BIGINT'; // sinnvoller Default
      }
    };
    const USER_ID    = toCol(map['users']);
    const SHOP_ID    = toCol(map['shops']);
    const PRODUCT_ID = toCol(map['products']);
    log.push(`detected id types: users=${map['users']||'?'} shops=${map['shops']||'?'} products=${map['products']||'?'}`);

    const stmts = [
      // MERCHANTS
      `CREATE TABLE IF NOT EXISTS merchants (
         id BIGSERIAL PRIMARY KEY,
         user_id ${USER_ID} UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
         kyc_status TEXT NOT NULL DEFAULT 'none'
           CHECK (kyc_status IN ('none','pending','verified','rejected')),
         default_payout_provider TEXT,
         contract_version TEXT,
         contract_accepted_at TIMESTAMPTZ,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,

      // PROVIDER ACCOUNTS
      `CREATE TABLE IF NOT EXISTS provider_accounts (
         id BIGSERIAL PRIMARY KEY,
         merchant_id BIGINT NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
         provider TEXT NOT NULL CHECK (provider IN ('stripe','pawapay','payoneer')),
         kind TEXT NOT NULL CHECK (kind IN ('customer','subaccount','payee','connect')),
         external_id TEXT,
         status TEXT NOT NULL DEFAULT 'active',
         currency TEXT,
         meta JSONB NOT NULL DEFAULT '{}'::jsonb,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (merchant_id, provider, kind)
       )`,

      // SUBSCRIPTIONS
      `CREATE TABLE IF NOT EXISTS subscriptions (
         id BIGSERIAL PRIMARY KEY,
         merchant_id BIGINT NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
         provider TEXT NOT NULL CHECK (provider IN ('stripe','pawapay','payoneer')),
         plan TEXT NOT NULL CHECK (plan IN ('basic','pro')),
         product_limit INTEGER NOT NULL DEFAULT 0,
         status TEXT NOT NULL DEFAULT 'incomplete'
           CHECK (status IN ('active','past_due','unpaid','canceled','incomplete')),
         provider_subscription_id TEXT NOT NULL,
         current_period_end TIMESTAMPTZ,
         cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (provider, provider_subscription_id)
       )`,

      // ORDERS
      `CREATE TABLE IF NOT EXISTS orders (
         id BIGSERIAL PRIMARY KEY,
         buyer_user_id ${USER_ID} REFERENCES users(id) ON DELETE SET NULL,
         email TEXT,
         currency TEXT NOT NULL DEFAULT 'USD',
         subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
         shipping NUMERIC(12,2) NOT NULL DEFAULT 0,
         total NUMERIC(12,2) NOT NULL DEFAULT 0,
         status TEXT NOT NULL DEFAULT 'pending'
           CHECK (status IN ('pending','paid','fulfilled','cancelled','refunded')),
         address JSONB NOT NULL DEFAULT '{}'::jsonb,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,

      // ORDER ITEMS (pro Haendler -> Split moeglich)
      `CREATE TABLE IF NOT EXISTS order_items (
         id BIGSERIAL PRIMARY KEY,
         order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
         product_id ${PRODUCT_ID} REFERENCES products(id) ON DELETE SET NULL,
         shop_id ${SHOP_ID} REFERENCES shops(id) ON DELETE SET NULL,
         merchant_id BIGINT REFERENCES merchants(id) ON DELETE SET NULL,
         title TEXT,
         qty INTEGER NOT NULL DEFAULT 1,
         unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
         line_total NUMERIC(12,2) NOT NULL DEFAULT 0,
         commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0,
         commission_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
         payout_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
         payout_status TEXT NOT NULL DEFAULT 'pending'
           CHECK (payout_status IN ('pending','paid','failed','reversed')),
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,

      // PAYMENTS (Inkasso)
      `CREATE TABLE IF NOT EXISTS payments (
         id BIGSERIAL PRIMARY KEY,
         order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
         provider TEXT NOT NULL CHECK (provider IN ('stripe','pawapay','payoneer')),
         provider_payment_id TEXT NOT NULL,
         amount NUMERIC(12,2) NOT NULL DEFAULT 0,
         currency TEXT NOT NULL DEFAULT 'USD',
         status TEXT NOT NULL DEFAULT 'pending'
           CHECK (status IN ('pending','succeeded','failed','refunded')),
         method TEXT,
         raw JSONB NOT NULL DEFAULT '{}'::jsonb,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (provider, provider_payment_id)
       )`,

      // PAYOUTS (an Haendler)
      `CREATE TABLE IF NOT EXISTS payouts (
         id BIGSERIAL PRIMARY KEY,
         merchant_id BIGINT REFERENCES merchants(id) ON DELETE SET NULL,
         order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
         provider TEXT NOT NULL CHECK (provider IN ('stripe','pawapay','payoneer')),
         provider_payout_id TEXT,
         amount NUMERIC(12,2) NOT NULL DEFAULT 0,
         currency TEXT NOT NULL DEFAULT 'USD',
         status TEXT NOT NULL DEFAULT 'pending'
           CHECK (status IN ('pending','paid','failed','reversed')),
         kind TEXT NOT NULL DEFAULT 'auto_split'
           CHECK (kind IN ('auto_split','mass_payout','connect','manual')),
         raw JSONB NOT NULL DEFAULT '{}'::jsonb,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (provider, provider_payout_id)
       )`,

      // DISPUTES
      `CREATE TABLE IF NOT EXISTS disputes (
         id BIGSERIAL PRIMARY KEY,
         payment_id BIGINT REFERENCES payments(id) ON DELETE SET NULL,
         order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
         provider TEXT NOT NULL CHECK (provider IN ('stripe','pawapay','payoneer')),
         provider_dispute_id TEXT NOT NULL,
         amount NUMERIC(12,2) NOT NULL DEFAULT 0,
         currency TEXT NOT NULL DEFAULT 'USD',
         status TEXT NOT NULL DEFAULT 'open',
         reason TEXT,
         raw JSONB NOT NULL DEFAULT '{}'::jsonb,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (provider, provider_dispute_id)
       )`,

      // WEBHOOK EVENTS (Idempotenz)
      `CREATE TABLE IF NOT EXISTS webhook_events (
         id BIGSERIAL PRIMARY KEY,
         provider TEXT NOT NULL,
         provider_event_id TEXT NOT NULL,
         type TEXT,
         payload JSONB NOT NULL DEFAULT '{}'::jsonb,
         processed_at TIMESTAMPTZ,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (provider, provider_event_id)
       )`,

      // INDIZES
      `CREATE INDEX IF NOT EXISTS idx_provider_accounts_merchant ON provider_accounts (merchant_id)`,
      `CREATE INDEX IF NOT EXISTS idx_subscriptions_merchant ON subscriptions (merchant_id)`,
      `CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id)`,
      `CREATE INDEX IF NOT EXISTS idx_order_items_merchant ON order_items (merchant_id)`,
      `CREATE INDEX IF NOT EXISTS idx_payments_order ON payments (order_id)`,
      `CREATE INDEX IF NOT EXISTS idx_payouts_merchant ON payouts (merchant_id)`,
      `CREATE INDEX IF NOT EXISTS idx_disputes_order ON disputes (order_id)`,
    ];

    for (const sql of stmts) {
      await query(sql);
      const m = sql.match(/(?:TABLE|INDEX) IF NOT EXISTS ([a-z_]+)/i);
      log.push('ok: ' + (m ? m[1] : sql.slice(0, 40)));
    }

    res.json({ ok: true, message: 'Billing-Schema bereit', log });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, log });
  }
});
// file: server.js — Block einfügen (Phase 2.0 Reparatur: orders-Schema)
// Oberhalb von app.get('/api/seed-afcarparts-categories', ...) platzieren.
// Einmal aufrufen: GET /api/migrate-orders-fix?secret=MIGRATION_SECRET

/* ============================================================
   PHASE 2.0 FIX - bringt orders/order_items auf das korrekte Schema.
   - orders LEER  -> sauber neu anlegen (DROP + CREATE)
   - orders HAT DATEN -> nur fehlende Spalten ergaenzen (non-destruktiv)
   Idempotent, mehrfach aufrufbar.
   ============================================================ */
app.get('/api/migrate-orders-fix', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];
  try {
    // ID-Typen erkennen (typkompatible Fremdschluessel)
    const typeRes = await query(
      `SELECT table_name, data_type FROM information_schema.columns
        WHERE table_schema='public' AND column_name='id'
          AND table_name IN ('users','shops','products')`
    );
    const map = {};
    for (const r of typeRes.rows) map[r.table_name] = r.data_type;
    const toCol = (dt) => ({ integer: 'INTEGER', bigint: 'BIGINT', smallint: 'SMALLINT', uuid: 'UUID',
      'character varying': 'TEXT', text: 'TEXT' }[(dt || '').toLowerCase()] || 'BIGINT');
    const USER_ID = toCol(map['users']);
    const SHOP_ID = toCol(map['shops']);
    const PRODUCT_ID = toCol(map['products']);

    // Existiert orders schon? Wenn ja: wie viele Zeilen?
    const exists = await query(
      `SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='orders'`
    );
    let rowCount = 0;
    if (exists.rows.length) {
      const c = await query(`SELECT count(*)::int AS c FROM orders`);
      rowCount = c.rows[0].c;
    }
    log.push('orders existiert: ' + (exists.rows.length ? 'ja' : 'nein') + ', Zeilen: ' + rowCount);

    if (!exists.rows.length || rowCount === 0) {
      // ---- Sauberer Neuaufbau (leer/nicht vorhanden) ----
      await query(`DROP TABLE IF EXISTS order_items CASCADE`);
      await query(`DROP TABLE IF EXISTS orders CASCADE`);
      log.push('alte orders/order_items verworfen (waren leer)');

      await query(`
        CREATE TABLE orders (
          id BIGSERIAL PRIMARY KEY,
          buyer_user_id ${USER_ID} REFERENCES users(id) ON DELETE SET NULL,
          email TEXT,
          currency TEXT NOT NULL DEFAULT 'USD',
          subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
          shipping NUMERIC(12,2) NOT NULL DEFAULT 0,
          total NUMERIC(12,2) NOT NULL DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'pending'
            CHECK (status IN ('pending','paid','fulfilled','cancelled','refunded')),
          address JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`);
      await query(`
        CREATE TABLE order_items (
          id BIGSERIAL PRIMARY KEY,
          order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          product_id ${PRODUCT_ID} REFERENCES products(id) ON DELETE SET NULL,
          shop_id ${SHOP_ID} REFERENCES shops(id) ON DELETE SET NULL,
          merchant_id BIGINT REFERENCES merchants(id) ON DELETE SET NULL,
          title TEXT,
          qty INTEGER NOT NULL DEFAULT 1,
          unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
          line_total NUMERIC(12,2) NOT NULL DEFAULT 0,
          commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0,
          commission_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
          payout_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
          payout_status TEXT NOT NULL DEFAULT 'pending'
            CHECK (payout_status IN ('pending','paid','failed','reversed')),
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`);
      await query(`CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id)`);
      await query(`CREATE INDEX IF NOT EXISTS idx_order_items_merchant ON order_items (merchant_id)`);
      log.push('orders + order_items neu angelegt (korrektes Schema)');
    } else {
      // ---- Non-destruktiv: fehlende Spalten ergaenzen ----
      const orderCols = [
        ['buyer_user_id', USER_ID],
        ['email', 'TEXT'],
        ['currency', "TEXT DEFAULT 'USD'"],
        ['subtotal', 'NUMERIC(12,2) DEFAULT 0'],
        ['shipping', 'NUMERIC(12,2) DEFAULT 0'],
        ['total', 'NUMERIC(12,2) DEFAULT 0'],
        ['status', "TEXT DEFAULT 'pending'"],
        ['address', "JSONB DEFAULT '{}'::jsonb"],
        ['created_at', 'TIMESTAMPTZ DEFAULT now()'],
        ['updated_at', 'TIMESTAMPTZ DEFAULT now()'],
      ];
      for (const [c, def] of orderCols) { await query(`ALTER TABLE orders ADD COLUMN IF NOT EXISTS ${c} ${def}`); }
      log.push('fehlende orders-Spalten ergaenzt');

      // Alte Pflichtspalten (NOT NULL ohne Default) entschaerfen, damit Inserts nicht brechen
      const expected = new Set(orderCols.map(x => x[0]).concat(['id']));
      const leftover = await query(
        `SELECT column_name FROM information_schema.columns
          WHERE table_schema='public' AND table_name='orders'
            AND is_nullable='NO' AND column_default IS NULL`
      );
      for (const r of leftover.rows) {
        if (!expected.has(r.column_name)) {
          await query(`ALTER TABLE orders ALTER COLUMN "${r.column_name}" DROP NOT NULL`);
          log.push('orders: NOT NULL entfernt von ' + r.column_name);
        }
      }
    }

    // Report: aktuelle Spalten
    const oc = await query(
      `SELECT column_name, data_type, is_nullable, column_default
         FROM information_schema.columns
        WHERE table_schema='public' AND table_name='orders'
        ORDER BY ordinal_position`
    );
    res.json({ ok: true, log, orders_columns: oc.rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, log });
  }
});
// file: server.js — PHASE 0 VERSAND, Block einfuegen
// Platzierung: direkt UNTERHALB des kompletten /api/migrate-orders-fix-Blocks.
// Zusaetzlich oben bei den requires (unter `const billingDb = require('./billingDb');`):
//   const shippingDb = require('./shippingDb');
// Einmal aufrufen: GET /api/migrate-shipping?secret=MIGRATION_SECRET

/* ============================================================
   PHASE 0 VERSAND - Schema fuer Sendungen + Abholstationen.
   - shipments: 1 Zeile pro order_item mit Artikelnummer (product_id),
     Haendler-ID (seller_user_id) und Kaeufer-ID (buyer_user_id)
   - pickup_stations: Abholstationen je Land/Stadt (Admin pflegt sie)
   Idempotent, mehrfach aufrufbar.
   ============================================================ */
app.get('/api/migrate-shipping-v2', require('./migrateShippingV2'));
app.get('/api/cleanup-legacy-shipments', require('./cleanupLegacyShipments'));
app.get('/api/migrate-shipping', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];
  try {
    // ID-Typen erkennen (typkompatible Fremdschluessel) - gleiches Muster wie migrate-billing
    const typeRes = await query(
      `SELECT table_name, data_type FROM information_schema.columns
        WHERE table_schema='public' AND column_name='id'
          AND table_name IN ('users','products')`
    );
    const map = {};
    for (const r of typeRes.rows) map[r.table_name] = r.data_type;
    const toCol = (dt) => ({ integer: 'INTEGER', bigint: 'BIGINT', smallint: 'SMALLINT', uuid: 'UUID',
      'character varying': 'TEXT', text: 'TEXT' }[(dt || '').toLowerCase()] || 'BIGINT');
    const USER_ID = toCol(map['users']);
    const PRODUCT_ID = toCol(map['products']);
    log.push(`detected id types: users=${map['users'] || '?'} products=${map['products'] || '?'}`);

    const stmts = [
      // ABHOLSTATIONEN
      `CREATE TABLE IF NOT EXISTS pickup_stations (
         id BIGSERIAL PRIMARY KEY,
         country TEXT NOT NULL,            -- ISO-2, z. B. 'NG', 'GH', 'CD'
         city TEXT NOT NULL,
         name TEXT NOT NULL,
         address TEXT NOT NULL DEFAULT '',
         phone TEXT,
         opening_hours TEXT,
         active BOOLEAN NOT NULL DEFAULT true,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,

      // SENDUNGEN (1 pro order_item -> Split-Bestellungen mit mehreren Haendlern moeglich)
      `CREATE TABLE IF NOT EXISTS shipments (
         id BIGSERIAL PRIMARY KEY,
         order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
         order_item_id BIGINT REFERENCES order_items(id) ON DELETE SET NULL,
         product_id ${PRODUCT_ID} REFERENCES products(id) ON DELETE SET NULL,   -- Artikelnummer
         seller_user_id ${USER_ID} REFERENCES users(id) ON DELETE SET NULL,     -- Haendler-ID
         buyer_user_id ${USER_ID} REFERENCES users(id) ON DELETE SET NULL,      -- Kaeufer-ID
         pickup_station_id BIGINT REFERENCES pickup_stations(id) ON DELETE SET NULL,
         provider TEXT NOT NULL DEFAULT 'manual'
           CHECK (provider IN ('manual','shippo','terminal')),
         provider_shipment_id TEXT,
         carrier TEXT,
         tracking_number TEXT,
         label_url TEXT,
         status TEXT NOT NULL DEFAULT 'pending'
           CHECK (status IN ('pending','label_created','shipped','in_transit','delivered','problem','cancelled')),
         cost_usd NUMERIC(12,2) NOT NULL DEFAULT 0,
         raw JSONB NOT NULL DEFAULT '{}'::jsonb,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,

      // INDIZES
      `CREATE INDEX IF NOT EXISTS idx_pickup_stations_country_city ON pickup_stations (country, city)`,
      `CREATE UNIQUE INDEX IF NOT EXISTS uniq_shipments_order_item ON shipments (order_item_id) WHERE order_item_id IS NOT NULL`,
      `CREATE INDEX IF NOT EXISTS idx_shipments_order ON shipments (order_id)`,
      `CREATE INDEX IF NOT EXISTS idx_shipments_seller ON shipments (seller_user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_shipments_buyer ON shipments (buyer_user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments (status)`,

      // PRODUKTGEWICHT (kg) - fuer automatische Versandberechnung im Checkout
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_kg NUMERIC(8,3)`,
    ];

    for (const sql of stmts) {
      await query(sql);
      const m = sql.match(/(?:TABLE|INDEX) IF NOT EXISTS ([a-z_]+)/i);
      log.push('ok: ' + (m ? m[1] : sql.slice(0, 40)));
    }

    res.json({ ok: true, message: 'Versand-Schema bereit', log });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, log });
  }
});

/* ============================================================
   MIGRATION GROSSHANDEL / B2B (Alibaba-Stil)
   Einmal aufrufen: GET /api/migrate-wholesale?secret=MIGRATION_SECRET
   Idempotent (ADD COLUMN IF NOT EXISTS). Aendert nichts Bestehendes.
     sale_mode    'retail' | 'wholesale' | 'both'  (Default 'retail')
     price_tiers  JSONB    [{ "min":10, "price":14.0 }, ...]  (Mengenstaffel)
   Bestehende Produkte bleiben 'retail' mit leerer Staffel -> Verhalten unveraendert.
   ============================================================ */
app.get('/api/migrate-wholesale', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];
  try {
    const stmts = [
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_mode TEXT NOT NULL DEFAULT 'retail'`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS price_tiers JSONB NOT NULL DEFAULT '[]'::jsonb`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS ean TEXT`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS fits_vehicles TEXT`,
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS tax_number TEXT`,
      // Index fuer den Grosshandel-Filter im Katalog
      `CREATE INDEX IF NOT EXISTS idx_products_sale_mode ON products (sale_mode)`,
      // FIX: alte lang-CHECK auf product_translations (nur en/de/fr/pt/ar) entfernen,
      // damit die Auto-Uebersetzung alle 9 App-Sprachen schreiben darf. Dynamisch,
      // weil der Constraint-Name je nach Anlage variieren kann.
      `DO $$
       DECLARE r record;
       BEGIN
         FOR r IN
           SELECT con.conname FROM pg_constraint con
             JOIN pg_class rel ON rel.oid = con.conrelid
            WHERE rel.relname = 'product_translations'
              AND con.contype = 'c'
              AND pg_get_constraintdef(con.oid) ILIKE '%lang%'
         LOOP
           EXECUTE 'ALTER TABLE product_translations DROP CONSTRAINT ' || quote_ident(r.conname);
         END LOOP;
       END $$`,
      `ALTER TABLE product_translations DROP CONSTRAINT IF EXISTS product_translations_lang_check`,
      `ALTER TABLE product_translations
         ADD CONSTRAINT product_translations_lang_check
         CHECK (lang IN ('en','de','fr','pt','es','ar','tr','sw','ln'))`,
    ];
    for (const sql of stmts) {
      await query(sql);
      log.push('ok: ' + sql.slice(0, 64));
    }
    res.json({ ok: true, message: 'Grosshandel-Schema bereit', log });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, log });
  }
});

/* ============================================================
   ABHOLSTATIONEN - oeffentlich (Checkout: Kunde waehlt Stadt
   -> Stationen anzeigen). Frontend-Aufruf (apiReq ohne /api):
   GET /pickup-stations?country=NG&city=Lagos
   ============================================================ */
app.get('/api/pickup-stations', async (req, res) => {
  try {
    const stations = await shippingDb.listPickupStations({
      country: req.query.country,
      city: req.query.city,
    });
    res.json({ stations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   ABHOLSTATIONEN - Admin-CRUD (Admin-Modul "Versand")
   ============================================================ */
app.get('/api/admin/pickup-stations', requireAdmin, async (req, res) => {
  try {
    const stations = await shippingDb.listAllPickupStations();
    res.json({ stations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/pickup-stations', requireAdmin, async (req, res) => {
  try {
    const { country, city, name } = req.body || {};
    if (!country || !city || !name) {
      return res.status(400).json({ error: 'country, city und name sind Pflichtfelder' });
    }
    const station = await shippingDb.createPickupStation(req.body);
    res.status(201).json({ station });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/pickup-stations/:id', requireAdmin, async (req, res) => {
  try {
    const station = await shippingDb.updatePickupStation(parseInt(req.params.id, 10), req.body || {});
    if (!station) return res.status(404).json({ error: 'Station nicht gefunden' });
    res.json({ station });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/pickup-stations/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await shippingDb.deletePickupStation(parseInt(req.params.id, 10));
    if (!ok) return res.status(404).json({ error: 'Station nicht gefunden' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Admin: Sendungsliste (Filter: ?status=pending&seller_user_id=&page=)
app.get('/api/admin/shipments', requireAdmin, async (req, res) => {
  try {
    const shipments = await shippingDb.listShipments({
      status: req.query.status,
      sellerUserId: req.query.seller_user_id ? parseInt(req.query.seller_user_id, 10) : undefined,
      page: parseInt(req.query.page, 10) || 1,
    });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin TEST-Helfer: Bestellung auf 'paid' setzen und Sendungen erzeugen.
// Nur fuer Tests VOR Live: fuehrt KEINE Auszahlungs-/Stock-Logik aus (die laeuft sonst
// ueber die echten Payment-Webhooks/Verify). Gibt zurueck, wie viele Sendungen entstanden.
// Diagnose-Hilfe: liefert auch, ob die Order-Items einen Haendler (seller_id) haben.
app.post('/api/admin/orders/:id/mark-paid', requireAdmin, async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const order = await billingDb.getOrder(orderId);
    if (!order) return res.status(404).json({ error: 'Bestellung nicht gefunden' });
    const wasPaid = order.status === 'paid';
    if (!wasPaid) await billingDb.setOrderStatus(orderId, 'paid');
    const shipmentIds = await shippingDb.createShipmentsForPaidOrder(orderId);
    if (!wasPaid) mailer.notifyOrderPaid(orderId); // wirft nie, idempotent
    // Diagnose: Items ohne seller_id wuerden Sendungen ohne Haendler-Zuordnung erzeugen
    const diag = await query(
      `SELECT oi.product_id, p.seller_id
         FROM order_items oi LEFT JOIN products p ON p.id = oi.product_id
        WHERE oi.order_id = $1`,
      [orderId]
    );
    res.json({
      ok: true,
      order_id: orderId,
      was_already_paid: wasPaid,
      shipments_created: shipmentIds.length,
      items: diag.rows.map((r) => ({ product_id: r.product_id, seller_id: r.seller_id })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   HAENDLER-VERSAND (Phase 1c) - eigene Sendungen + Tracking
   Nutzt requireSeller (req.user.id = Haendler) und shippingDb.
   Frontend-Route: 'seller-shipments'
   ============================================================ */

// Haendler: nur die EIGENEN Sendungen (Filter: ?status=&page=)
app.get('/api/seller/shipments', requireSeller, async (req, res) => {
  try {
    const scope = resolveSellerScope(req);
    const shipments = await shippingDb.listShipments({
      sellerUserId: scope.id,
      status: req.query.status,
      page: parseInt(req.query.page, 10) || 1,
    });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Haendler: Versanddienst/Tracking eintragen -> Status 'shipped' (nur eigene Sendung)
app.patch('/api/seller/shipments/:id', requireSeller, async (req, res) => {
  try {
    const { carrier, tracking_number } = req.body || {};
    if (!carrier && !tracking_number) {
      return res.status(400).json({ error: 'carrier oder tracking_number erforderlich' });
    }
    const shipment = await shippingDb.setSellerTracking(
      parseInt(req.params.id, 10),
      resolveSellerScope(req).id,
      { carrier, tracking_number }
    );
    if (!shipment) {
      return res.status(404).json({ error: 'Sendung nicht gefunden oder gehoert nicht zu diesem Haendler' });
    }
    res.json({ shipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Haendler: Versandlabel beim Provider erzeugen (Testphase Shippo -> spaeter Terminal Africa).
// Idempotent: ist bereits ein label_url vorhanden, wird es wiederverwendet (kein Doppel-Kauf).
// Speichert label_url/tracking/carrier/provider/cost an der EIGENEN Sendung des Haendlers.
app.post('/api/seller/shipments/:id/label', requireSeller, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const shipment = await shippingDb.getSellerShipment(id, resolveSellerScope(req).id);
    if (!shipment) {
      return res.status(404).json({ error: 'Sendung nicht gefunden oder gehoert nicht zu diesem Haendler' });
    }
    if (shipment.label_url) {
      return res.json({ shipment, reused: true });
    }

    let result;
    try {
      result = await shippingProviders.createLabel(shipment);
    } catch (e) {
      // NO_TOKEN / NOT_CONFIGURED -> 503 (Konfiguration), sonst 502 (Provider-Fehler)
      const code = (e.code === 'NO_TOKEN' || e.code === 'NOT_CONFIGURED') ? 503 : 502;
      return res.status(code).json({ error: e.message });
    }

    const updated = await shippingDb.setShipmentTracking(id, {
      carrier: result.carrier,
      tracking_number: result.tracking_number,
      label_url: result.label_url,
      provider: result.provider,
      provider_shipment_id: result.provider_shipment_id,
      cost_usd: result.cost_usd,
    });
    res.json({ shipment: updated, provider: result.provider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ============================================================
//  PHASE A (2026-08) - HAENDLER-AUSZAHLUNGSKONTO (pawaPay / Payoneer)
//  Reines DB-Onboarding: wir speichern nur das Auszahlungsziel.
//  - Afrika:  pawaPay  -> Mobile-Money-Nummer (MSISDN mit Laendervorwahl, ohne +)
//  - Europa/weltweit: Payoneer -> Payoneer-E-Mail (oder IBAN in meta)
//  Die eigentlichen Auszahlungen laufen spaeter als woechentlicher
//  Batch (Phase E/F) aus dem internen Ledger.
// ============================================================

// Laenderliste kommt aus dem Adapter (eine Quelle der Wahrheit).
// Nigeria und Ghana sind dort ausgeschlossen -> Haendler dieser Laender
// muessen Payoneer als Auszahlungsziel waehlen. Angola und Suedafrika
// stehen ohnehin nicht in der pawaPay-Abdeckung.
//
// WICHTIG: Der Server darf NICHT starten koennen und dann an einer
// fehlenden Adapter-Methode sterben. Bei Datei-fuer-Datei-Deploys ist
// server.js manchmal schon neu, waehrend paymentProviders/pawapay.js
// noch die alte Fassung ist. Deshalb hier ein weicher Fallback statt
// eines harten Absturzes - die Seite bleibt online, im Log steht klar,
// was fehlt.
const PAWAPAY_FALLBACK = ['BJ','BF','CM','CD','CG','CI','GA','KE','MW','ML','MZ','RW','SN','SL','TZ','UG','ZM','ZW'];

let PawaPayCls = null;
try {
  PawaPayCls = require('./paymentProviders/pawapay');
} catch (e) {
  console.error('[pawapay] Adapter nicht ladbar:', e.message);
}

const PAWAPAY_COUNTRIES = (() => {
  if (PawaPayCls && typeof PawaPayCls.payoutCountries === 'function') {
    return PawaPayCls.payoutCountries();
  }
  console.warn(
    '[pawapay] Adapter ist veraltet (payoutCountries() fehlt) - nutze Fallback-Laenderliste. ' +
    'Bitte paymentProviders/pawapay.js aktualisieren.'
  );
  return PAWAPAY_FALLBACK;
})();

console.log('[pawapay] Mobile-Money-Laender aktiv:', PAWAPAY_COUNTRIES.join(','));

// Payoneer-Adapter (Phase F): baut die Zahllauf-CSV. Gleiche Vorsicht wie
// bei pawaPay - fehlt die Datei noch, bleibt der Server oben und meldet es.
let PayoneerCls = null;
try {
  PayoneerCls = require('./paymentProviders/payoneer');
} catch (e) {
  console.error('[payoneer] Adapter nicht ladbar:', e.message);
}
if (PayoneerCls) {
  const pc = PayoneerCls.config();
  console.log('[payoneer] Mindestauszahlung:', pc.min_payout, '| Guthaben:', pc.balances.join(','),
              '| unbestaetigt:', pc.unconfirmed_countries.join(',') || '-');
}

// Status beider Auszahlungs-Schienen des Haendlers
app.get('/api/seller/payout-account', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const m = await billingDb.ensureMerchant(req.user.id);
    const pp = await billingDb.getProviderAccount(m.id, 'pawapay', 'payee');
    const po = await billingDb.getProviderAccount(m.id, 'payoneer', 'payee');
    const wrap = (a) => a && a.external_id
      ? { connected: true, account: { external_id: a.external_id, status: a.status, meta: a.meta } }
      : { connected: false, account: null };
    const pawapay = wrap(pp), payoneer = wrap(po);
    const cn = await billingDb.getProviderAccount(m.id, 'stripe', 'connect');
    const stripe = (cn && cn.external_id && cn.status === 'active')
      ? { connected: true, account: { external_id: cn.external_id, status: cn.status, meta: cn.meta } }
      : { connected: false, account: null };

    // Welche Wege koennte dieser Haendler JETZT waehlen? Das Frontend
    // zeigt daraus eine Umschaltung statt eines stillen Automatismus.
    const availableMethods = [];
    if (stripe.connected)   availableMethods.push('stripe');
    if (pawapay.connected)  availableMethods.push('pawapay');
    if (payoneer.connected) availableMethods.push('payoneer');

    res.json({
      connected: stripe.connected || pawapay.connected || payoneer.connected,
      default_provider: m.default_payout_provider || null,
      available_methods: availableMethods,
      stripe,
      pawapay, payoneer,
      // Massgebliche Liste fuer das Laender-Dropdown im Frontend.
      pawapay_countries: PAWAPAY_COUNTRIES,
      // Regeln fuer das Payoneer-Formular + Hinweistexte im Dashboard.
      payoneer_config: PayoneerCls ? {
        min_payout: PayoneerCls.config().min_payout,
        balances: PayoneerCls.config().balances,
        unconfirmed_countries: PayoneerCls.config().unconfirmed_countries,
        blocked_countries: PayoneerCls.config().blocked_countries,
      } : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   Auszahlungsweg bewusst umstellen.

   Bisher ergab sich der Weg als Nebenwirkung des Speicherns eines Ziels.
   Wer schon ein Ziel hatte und ein zweites anlegte, wurde stillschweigend
   umgeleitet - oder eben nicht, wie beim Wechsel zu Stripe. Beides ist
   schlecht: Bei Geld darf nichts stillschweigend passieren.

   Diese Route macht den Wechsel zu einer eigenen, sichtbaren Handlung
   und prueft vorher, ob das Ziel wirklich benutzbar ist.
   ------------------------------------------------------------ */
app.post('/api/seller/payout-method', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const provider = String((req.body || {}).provider || '').toLowerCase();
    if (['stripe', 'pawapay', 'payoneer'].indexOf(provider) === -1) {
      return res.status(400).json({ error: "provider muss 'stripe', 'pawapay' oder 'payoneer' sein" });
    }
    const m = await billingDb.ensureMerchant(req.user.id);

    // Ist das gewuenschte Ziel ueberhaupt einsatzbereit?
    if (provider === 'stripe') {
      const acc = await billingDb.getProviderAccount(m.id, 'stripe', 'connect');
      if (!acc || !acc.external_id || acc.status !== 'active') {
        return res.status(400).json({
          error: 'Dein Stripe-Konto ist noch nicht bereit. Bitte schliesse das Stripe-Onboarding ab.',
          needs: 'stripe_onboarding',
        });
      }
    } else {
      const acc = await billingDb.getProviderAccount(m.id, provider, 'payee');
      if (!acc || !acc.external_id) {
        return res.status(400).json({
          error: 'Fuer diesen Weg ist noch kein Auszahlungsziel hinterlegt.',
          needs: provider,
        });
      }
    }

    const previous = m.default_payout_provider || null;
    if (previous === provider) {
      return res.json({ success: true, provider, changed: false });
    }

    // Offenes Guthaben? Der Wechsel gilt auch dafuer - das muss der
    // Haendler wissen, damit er sich nicht wundert, wo das Geld ankommt.
    let pendingNote = null;
    try {
      const bal = await billingDb.getMerchantBalance(m.id);
      const open = (bal || []).reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
      if (open > 0) {
        pendingNote = 'Dein offenes Guthaben von ' + open.toFixed(2)
          + ' wird ab sofort ueber den neuen Weg ausgezahlt.';
      }
    } catch (e) { /* Hinweis ist Beiwerk */ }

    await billingDb.setDefaultPayoutProvider(m.id, provider);
    console.log('[payout] Haendler', m.id, 'wechselt Auszahlungsweg:', previous || '-', '->', provider);

    res.json({ success: true, provider, previous, changed: true, note: pendingNote });
  } catch (err) {
    console.error('[seller/payout-method]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Auszahlungsziel speichern (type: 'pawapay' | 'payoneer')
app.post('/api/seller/payout-account', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const { type, msisdn, country, payee_email, business_name } = req.body || {};
    const m = await billingDb.ensureMerchant(req.user.id);

    if (type === 'pawapay') {
      const num = String(msisdn || '').replace(/[^0-9]/g, '');
      const c = String(country || '').toUpperCase();
      if (num.length < 8 || num.length > 15) {
        return res.status(400).json({ error: 'Mobile-Money-Nummer ungueltig (mit Laendervorwahl, ohne +, nur Ziffern)' });
      }
      if (!PAWAPAY_COUNTRIES.includes(c)) {
        return res.status(400).json({
          error: 'Fuer dieses Land ist die Mobile-Money-Auszahlung nicht verfuegbar. Bitte hinterlege stattdessen ein Payoneer-Konto.',
          use_provider: 'payoneer',
          country: c,
        });
      }
      await billingDb.upsertProviderAccount({
        merchantId: m.id, provider: 'pawapay', kind: 'payee',
        externalId: num, status: 'active', currency: null,
        meta: { country: c, business_name: business_name || req.user.name || null },
      });
      await billingDb.setDefaultPayoutProvider(m.id, 'pawapay');
      return res.json({ success: true, provider: 'pawapay', msisdn: num, country: c });
    }

    if (type === 'payoneer') {
      // Seit 2026-08-27 laeuft die Payoneer-Auszahlung als Bankkonto-Zahllauf.
      // Dafuer reicht eine E-Mail NICHT - die CSV braucht Kontoinhaber,
      // Kontonummer/IBAN, Bankland und Bankwaehrung.
      const b = req.body || {};
      const holder   = String(b.holder_name || business_name || '').trim();
      const account  = String(b.bank_account || b.iban || '').replace(/\s+/g, '').toUpperCase();
      const bankCty  = String(b.bank_country || '').toUpperCase();
      const bankCur  = String(b.bank_currency || '').toUpperCase();
      const email    = String(payee_email || '').trim().toLowerCase();

      if (holder.length < 2) {
        return res.status(400).json({ error: 'Name des Kontoinhabers erforderlich (genau wie bei der Bank)' });
      }
      if (account.length < 5) {
        return res.status(400).json({ error: 'Kontonummer oder IBAN erforderlich' });
      }
      if (!/^[A-Z]{2}$/.test(bankCty)) {
        return res.status(400).json({ error: 'Land der Bank erforderlich' });
      }
      if (!/^[A-Z]{3}$/.test(bankCur)) {
        return res.status(400).json({ error: 'Waehrung des Bankkontos erforderlich' });
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'E-Mail-Adresse ist ungueltig' });
      }

      // Bisherigen Stand lesen, um (a) eine Aenderung zu erkennen und
      // (b) die alten Daten zu archivieren. Ohne Historie waeren nach einer
      // Aenderung die Bankdaten, auf die frueher ausgezahlt wurde, weg -
      // bei einer Rueckfrage oder Pruefung ist das ein Problem.
      const prev = await billingDb.getProviderAccount(m.id, 'payoneer', 'payee');
      const prevMeta = (prev && prev.meta) || {};
      const changed = !prev
        || prevMeta.holder_name   !== holder
        || prevMeta.bank_account  !== account
        || prevMeta.bank_country  !== bankCty
        || prevMeta.bank_currency !== bankCur;

      const history = Array.isArray(prevMeta.history) ? prevMeta.history.slice(0, 4) : [];
      if (changed && prev) {
        history.unshift({
          holder_name: prevMeta.holder_name || null,
          bank_account: prevMeta.bank_account || prev.external_id || null,
          bank_country: prevMeta.bank_country || null,
          bank_currency: prevMeta.bank_currency || null,
          was_approved: prevMeta.approved === true,
          replaced_at: new Date().toISOString(),
        });
      }

      const meta = {
        holder_name: holder,
        bank_account: account,
        bank_country: bankCty,
        bank_currency: bankCur,
        payee_email: email || null,
        business_name: business_name || req.user.name || null,
        // Payoneer muss jedes Empfaengerkonto einmalig freigeben. Bis das
        // passiert ist, bleibt der Posten im Ledger stehen statt in einer
        // Datei zu landen, die beim Upload abgelehnt wird.
        // ACHTUNG: Bei JEDER Aenderung der Bankdaten faellt die Freigabe
        // zurueck auf false - eine alte Freigabe gilt nicht fuer ein neues
        // Konto. Bleiben die Daten gleich, bleibt die Freigabe bestehen.
        approved: changed ? false : (prevMeta.approved === true),
        approved_at: changed ? null : (prevMeta.approved_at || null),
        history,
        changed_at: changed ? new Date().toISOString() : (prevMeta.changed_at || null),
        updated_at: new Date().toISOString(),
      };

      // Vorab pruefen, damit der Haendler den Fehler SOFORT sieht und nicht
      // erst Wochen spaeter beim Auszahlungslauf.
      if (PayoneerCls) {
        const check = PayoneerCls.validatePayee(Object.assign({}, meta, { approved: true }));
        if (!check.ok) return res.status(400).json({ error: check.reason });
      }

      await billingDb.upsertProviderAccount({
        merchantId: m.id, provider: 'payoneer', kind: 'payee',
        externalId: account, status: meta.approved ? 'active' : 'pending', currency: bankCur,
        meta,
      });
      await billingDb.setDefaultPayoutProvider(m.id, 'payoneer');
      if (changed) {
        console.log('[payout] Haendler', m.id, 'hat die Payoneer-Bankdaten geaendert - Freigabe zurueckgesetzt');
      }
      return res.json({
        success: true, provider: 'payoneer',
        holder_name: holder, bank_country: bankCty, bank_currency: bankCur,
        changed, pending_approval: !meta.approved,
      });
    }



    return res.status(400).json({ error: "type muss 'pawapay' oder 'payoneer' sein" });
  } catch (err) {
    console.error('[seller/payout-account]', err.message);
    res.status(500).json({ error: err.message });
  }
});
/* ------------------------------------------------------------
   LEDGER-ENDPOINTS
   ------------------------------------------------------------ */

// Haendler: mein offenes Guthaben (noch nicht ausgezahlte Verkaufsanteile).
app.get('/api/seller/balance', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    // blockFinancialInAdminView sperrt die Support-Ansicht bereits,
    // deshalb ist req.user.id hier immer der echte Haendler.
    const m = await billingDb.ensureMerchant(req.user.id);
    const rows = await billingDb.getMerchantBalance(m.id);
    const target = await resolvePayoutTarget(m.id);
    res.json({
      balances: rows,
      total: rows.reduce((s, r) => s + (Number(r.amount) || 0), 0),
      payout_method: target ? target.method : null,
      payout_ready: !!target,
    });
  } catch (err) {
    console.error('[seller/balance]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* --- CSV-Helfer: Semikolon-getrennt, BOM fuer Excel, damit Umlaute
       und Sonderzeichen beim Oeffnen korrekt dargestellt werden. --- */
function toCsv(header, rows) {
  const cell = (v) => {
    const s = (v === null || v === undefined) ? '' : String(v);
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const out = [header.join(';')];
  for (const r of rows) out.push(r.map(cell).join(';'));
  return '\uFEFF' + out.join('\r\n');
}
function sendCsv(res, filename, header, rows) {
  res.set('Content-Type', 'text/csv; charset=utf-8');
  res.set('Content-Disposition', 'attachment; filename="' + filename + '"');
  res.send(toCsv(header, rows));
}
const n2 = (v) => (Number(v) || 0).toFixed(2);

// Haendler: Umsatz nach Zeitraster (day|week|month|quarter|year).
app.get('/api/seller/earnings', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const m = await billingDb.ensureMerchant(req.user.id);
    const period = String(req.query.period || 'month');
    const from = req.query.from || null;
    const to = req.query.to || null;

    const series = await billingDb.getMerchantEarnings(m.id, { period, from, to, limit: req.query.limit });
    const totals = await billingDb.getMerchantEarningsTotal(m.id, { from, to });
    const balance = await billingDb.getMerchantBalance(m.id);
    const target = await resolvePayoutTarget(m.id);

    // Effektiver Provisionssatz = tatsaechlich einbehalten / Bruttoumsatz.
    // NICHT der Basissatz: die Staffel senkt ihn mit steigendem Umsatz.
    const gross = totals.reduce((s, t) => s + (Number(t.gross) || 0), 0);
    const commission = totals.reduce((s, t) => s + (Number(t.commission) || 0), 0);

    res.json({
      period, series, totals,
      base_currency: fx.baseCurrency(),
      pending: balance,
      effective_commission_rate: gross > 0 ? commission / gross : null,
      commission_tiers: COMMISSION_TIERS,
      payout_method: target ? target.method : null,
      payout_ready: !!target,
    });
  } catch (err) {
    console.error('[seller/earnings]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Haendler: eigene Einzelposten als CSV (eigener Nachweis / Buchhaltung).
app.get('/api/seller/earnings/export', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const m = await billingDb.ensureMerchant(req.user.id);
    const rows = await billingDb.listMerchantEarningItems(m.id, {
      from: req.query.from || null, to: req.query.to || null,
    });
    sendCsv(res,
      'afcarparts-umsatz-' + new Date().toISOString().slice(0, 10) + '.csv',
      ['Bestellung', 'Datum', 'Artikel', 'Menge', 'Einzelpreis', 'Brutto', 'Provisionssatz',
       'Provision', 'Auszahlung', 'Waehrung', 'Kurs', 'Auszahlung (Basis)', 'Basiswaehrung', 'Kursquelle', 'Status'],
      rows.map((r) => [
        r.order_id, new Date(r.created_at).toISOString().slice(0, 10), r.title, r.qty,
        n2(r.unit_price), n2(r.gross),
        ((Number(r.commission_rate) || 0) * 100).toFixed(2) + '%',
        n2(r.commission), n2(r.net), r.currency,
        (Number(r.fx_rate) || 0).toFixed(6), n2(r.net_base), r.base_currency, r.fx_source,
        r.payout_status,
      ]));
  } catch (err) {
    console.error('[seller/earnings/export]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Guthaben und Umsatz je Haendler. ?format=csv fuer den Nachweis.
app.get('/api/admin/earnings', requireAdmin, async (req, res) => {
  try {
    const from = req.query.from || null;
    const to = req.query.to || null;
    const rows = await billingDb.listAllMerchantEarnings({ from, to });
    const labels = await merchantLabels(rows.map((r) => r.merchant_id));

    const enriched = [];
    for (const r of rows) {
      const target = await resolvePayoutTarget(r.merchant_id);
      const lab = labels[r.merchant_id] || {};
      const gross = Number(r.gross) || 0;
      const commission = Number(r.commission) || 0;
      enriched.push({
        merchant_id: r.merchant_id,
        user_id: r.user_id,
        seller: lab.label || null,
        shop_name: lab.shop_name || null,
        seller_email: lab.email || null,
        currency: r.currency,
        order_count: r.order_count,
        item_count: r.item_count,
        gross,
        commission,
        net: Number(r.net) || 0,
        pending: Number(r.pending) || 0,
        paid: Number(r.paid) || 0,
        // Basiswaehrung: mit dem je Bestellung eingefrorenen Kurs gerechnet.
        // NUR diese Werte duerfen ueber Waehrungen hinweg addiert werden.
        base_currency: fx.baseCurrency(),
        gross_base: Number(r.gross_base) || 0,
        commission_base: Number(r.commission_base) || 0,
        net_base: Number(r.net_base) || 0,
        pending_base: Number(r.pending_base) || 0,
        fx_incomplete: !!r.fx_incomplete,
        effective_rate: gross > 0 ? commission / gross : null,
        first_order: r.first_order,
        last_order: r.last_order,
        payout_method: target ? target.method : null,
        payout_destination: target ? (target.account.external_id || null) : null,
        payout_ready: !!target,
      });
    }

    if (String(req.query.format || '').toLowerCase() === 'csv') {
      const range = (from ? String(from).slice(0, 10) : 'start') + '_bis_' + (to ? String(to).slice(0, 10) : 'heute');
      return sendCsv(res,
        'afcarparts-haendlerguthaben-' + range + '.csv',
        ['Haendler-ID', 'User-ID', 'Bestellungen', 'Positionen', 'Bruttoumsatz', 'Provision',
         'Effektiver Satz', 'Auszahlungsbetrag', 'davon offen', 'davon ausgezahlt', 'Waehrung',
         'Brutto (' + fx.baseCurrency() + ')', 'Provision (' + fx.baseCurrency() + ')',
         'Auszahlung (' + fx.baseCurrency() + ')', 'Offen (' + fx.baseCurrency() + ')', 'Kurs vollstaendig',
         'Auszahlungsweg', 'Ziel', 'Erste Bestellung', 'Letzte Bestellung'],
        enriched.map((e) => [
          e.merchant_id, e.user_id, e.order_count, e.item_count,
          n2(e.gross), n2(e.commission),
          e.effective_rate === null ? '' : (e.effective_rate * 100).toFixed(2) + '%',
          n2(e.net), n2(e.pending), n2(e.paid), e.currency,
          n2(e.gross_base), n2(e.commission_base), n2(e.net_base), n2(e.pending_base),
          e.fx_incomplete ? 'NEIN' : 'ja',
          e.payout_method || 'KEIN ZIEL', e.payout_destination || '',
          e.first_order ? new Date(e.first_order).toISOString().slice(0, 10) : '',
          e.last_order ? new Date(e.last_order).toISOString().slice(0, 10) : '',
        ]));
    }

    res.json({
      merchants: enriched,
      base_currency: fx.baseCurrency(),
      // Summen ausschliesslich in Basiswaehrung - Addition ueber
      // verschiedene Bestellwaehrungen waere sonst schlicht falsch.
      totals: {
        gross: enriched.reduce((s, e) => s + e.gross_base, 0),
        commission: enriched.reduce((s, e) => s + e.commission_base, 0),
        net: enriched.reduce((s, e) => s + e.net_base, 0),
        pending: enriched.reduce((s, e) => s + e.pending_base, 0),
      },
      currencies: Array.from(new Set(enriched.map((e) => e.currency))),
      fx_incomplete: enriched.filter((e) => e.fx_incomplete).length,
      without_payout_target: enriched.filter((e) => !e.payout_ready).length,
    });
  } catch (err) {
    console.error('[admin/earnings]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Einzelposten EINES Haendlers - die Belegebene, wenn es zur
// Aufklaerung kommt. Jede Position mit Datum, Satz und Betrag.
app.get('/api/admin/earnings/:merchantId/export', requireAdmin, async (req, res) => {
  try {
    const mid = parseInt(req.params.merchantId, 10);
    if (!mid) return res.status(400).json({ error: 'merchantId erforderlich' });
    const rows = await billingDb.listMerchantEarningItems(mid, {
      from: req.query.from || null, to: req.query.to || null,
    });
    sendCsv(res,
      'afcarparts-haendler-' + mid + '-belege-' + new Date().toISOString().slice(0, 10) + '.csv',
      ['Bestellung', 'Datum', 'Artikel', 'Menge', 'Einzelpreis', 'Brutto', 'Provisionssatz',
       'Provision', 'Auszahlung', 'Waehrung', 'Kurs', 'Auszahlung (Basis)', 'Basiswaehrung', 'Kursquelle', 'Status'],
      rows.map((r) => [
        r.order_id, new Date(r.created_at).toISOString().slice(0, 19).replace('T', ' '),
        r.title, r.qty, n2(r.unit_price), n2(r.gross),
        ((Number(r.commission_rate) || 0) * 100).toFixed(2) + '%',
        n2(r.commission), n2(r.net), r.currency,
        (Number(r.fx_rate) || 0).toFixed(6), n2(r.net_base), r.base_currency, r.fx_source,
        r.payout_status,
      ]));
  } catch (err) {
    console.error('[admin/earnings/export]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Admin: alle offenen Auszahlungen. ?format=csv liefert die Datei, die du
// im Payoneer-Massenzahlungsbereich hochlaedst bzw. per pawaPay verschickst.
app.get('/api/admin/payouts/pending', requireAdmin, async (req, res) => {
  try {
    const rows = await billingDb.listPendingPayouts();
    const labels = await merchantLabels(rows.map((r) => r.merchant_id));

    // Auszahlungsziel je Haendler ergaenzen
    const enriched = [];
    for (const r of rows) {
      const target = await resolvePayoutTarget(r.merchant_id);
      enriched.push({
        merchant_id: r.merchant_id,
        user_id: r.user_id,
        seller: (labels[r.merchant_id] || {}).label || null,
        currency: r.currency,
        amount: Number(r.amount) || 0,
        commission: Number(r.commission) || 0,
        item_count: r.item_count,
        oldest_order: r.oldest_order,
        method: target ? target.method : null,
        destination: target ? (target.account.external_id || null) : null,
        destination_meta: target ? (target.account.meta || {}) : {},
        ready: !!target,
      });
    }

    if (String(req.query.format || '').toLowerCase() === 'csv') {
      const esc = (v) => {
        const s = v === null || v === undefined ? '' : String(v);
        return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      };
      const lines = ['merchant_id;method;destination;amount;currency;items;ready'];
      for (const e of enriched) {
        lines.push([e.merchant_id, e.method, e.destination, e.amount.toFixed(2),
                    e.currency, e.item_count, e.ready ? 'yes' : 'no'].map(esc).join(';'));
      }
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.set('Content-Disposition', 'attachment; filename="afcarparts-payouts-' +
        new Date().toISOString().slice(0, 10) + '.csv"');
      return res.send(lines.join('\n'));
    }

    res.json({
      payouts: enriched,
      total: enriched.reduce((s, e) => s + e.amount, 0),
      blocked: enriched.filter((e) => !e.ready).length,
    });
  } catch (err) {
    console.error('[admin/payouts/pending]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   Admin: Payoneer-Zahllauf-Datei erzeugen.
   GET /api/admin/payouts/payoneer            -> Vorschau als JSON
   GET /api/admin/payouts/payoneer?format=csv -> Datei zum Hochladen

   Der Upload-Weg in Payoneer: Zahlen -> Zahllauf -> Datei hochladen.
   Es wird IMMER nur die erste Datei geliefert (?batch=2 fuer die naechste),
   weil Payoneer eine Datei pro Vorgang verarbeitet.
   ------------------------------------------------------------ */
app.get('/api/admin/payouts/payoneer', requireAdmin, async (req, res) => {
  try {
    if (!PayoneerCls) {
      return res.status(503).json({ error: 'Payoneer-Adapter nicht geladen (paymentProviders/payoneer.js fehlt)' });
    }

    const rows = await billingDb.listPendingPayouts();
    const items = [];
    for (const r of rows) {
      const target = await resolvePayoutTarget(r.merchant_id);
      if (!target || target.method !== 'payoneer') continue; // andere Schienen ignorieren
      items.push({
        merchant_id: r.merchant_id,
        amount: Number(r.amount) || 0,
        currency: String(r.currency || '').toUpperCase(),
        item_count: r.item_count,
        meta: (target.account && target.account.meta) || {},
      });
    }

    const built = PayoneerCls.buildBatch(items);
    const pnLabels = await merchantLabels(items.map((i) => i.merchant_id));

    if (String(req.query.format || '').toLowerCase() === 'csv') {
      const idx = Math.max(1, parseInt(req.query.batch, 10) || 1) - 1;
      const batch = built.batches[idx];
      if (!batch) return res.status(404).json({ error: 'Keine auszahlbaren Posten in dieser Datei-Nummer' });
      const csv = PayoneerCls.toCsv(batch.rows);
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.set('Content-Disposition', 'attachment; filename="' + PayoneerCls.fileName(batch.ref, batch.currency) + '"');
      return res.send(csv);
    }

    res.json({
      config: PayoneerCls.config(),
      batches: built.batches.map((b, i) => ({
        number: i + 1, ref: b.ref, currency: b.currency,
        rows: b.rows.length, total: Math.round(b.total * 100) / 100,
        merchants: b.items.map((it) => ({
          merchant_id: it.merchant_id,
          seller: (pnLabels[it.merchant_id] || {}).label || null,
          amount: Math.round((Number(it.amount) || 0) * 100) / 100,
        })),
        download: '/api/admin/payouts/payoneer?format=csv&batch=' + (i + 1),
      })),
      blocked: built.blocked.map((b) => Object.assign({}, b, {
        seller: (pnLabels[b.merchant_id] || {}).label || null,
      })),
      payable_total: built.payable.reduce((s, it) => s + it.amount, 0),
    });
  } catch (err) {
    console.error('[admin/payouts/payoneer]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   BUCHHALTUNG (Phase H)

   WAS DAS IST: eine pruefbare Datengrundlage fuer den Steuerberater.
   WAS DAS NICHT IST: ein Jahresabschluss. Eine Bilanz nach § 266 HGB
   umfasst das gesamte Unternehmen - Bankkonten, Anlagevermoegen,
   Eigenkapital, Steuern. Davon kennt der Marktplatz nur einen Ausschnitt.
   Die Uebermittlung ans Finanzamt laeuft ausserdem als E-Bilanz nach
   § 5b EStG im XBRL-Format ueber ERiC, nicht als Datei aus dieser App.

   Einmal aufrufen: GET /api/migrate-accounting?secret=MIGRATION_SECRET
   ============================================================ */
app.get('/api/migrate-accounting', async (req, res) => {
  try {
    if (!process.env.MIGRATION_SECRET || req.query.secret !== process.env.MIGRATION_SECRET) {
      return res.status(403).json({ error: 'Nicht erlaubt' });
    }
    if (!accountingDb) return res.status(503).json({ error: 'accountingDb.js fehlt' });
    const log = await accountingDb.migrate();

    // Ladungsfaehige Anschrift des Haendlershops. Bisher gab es nur Land
    // und Stadt - fuer Rechnungen, Impressum und die Empfaengeranlage bei
    // Payoneer reicht das nicht.
    for (const sql of [
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS street       TEXT`,
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS postal_code  TEXT`,
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS region       TEXT`,
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS vat_id       TEXT`,
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS company_name TEXT`,
      `ALTER TABLE shops ADD COLUMN IF NOT EXISTS reg_number   TEXT`,
    ]) { await query(sql); }
    log.push('Shop-Adressfelder ok (street, postal_code, region, vat_id, company_name, reg_number)');

    res.json({ ok: true, message: 'Buchhaltung + Shop-Adressfelder eingerichtet', log });
  } catch (err) {
    console.error('[migrate-accounting]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Kategorien fuer das Erfassungsformular
app.get('/api/admin/accounting/categories', requireAdmin, (req, res) => {
  if (!accountingDb) return res.status(503).json({ error: 'Buchhaltungsmodul nicht geladen' });
  res.json({ categories: accountingDb.categories(), report_currency: accountingDb.REPORT_CURRENCY });
});

// Periodenauswertung
app.get('/api/admin/accounting/report', requireAdmin, async (req, res) => {
  try {
    if (!accountingDb) return res.status(503).json({ error: 'Buchhaltungsmodul nicht geladen' });
    const report = await accountingDb.periodReport({
      from: req.query.from || null, to: req.query.to || null,
    });
    res.json(report);
  } catch (err) {
    console.error('[accounting/report]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Buchungsjournal (erfasste Saetze)
app.get('/api/admin/accounting/entries', requireAdmin, async (req, res) => {
  try {
    if (!accountingDb) return res.status(503).json({ error: 'Buchhaltungsmodul nicht geladen' });
    const rows = await accountingDb.listEntries({
      from: req.query.from || null, to: req.query.to || null,
      category: req.query.category || null,
    });
    res.json({ entries: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buchungssatz erfassen
app.post('/api/admin/accounting/entries', requireAdmin, async (req, res) => {
  try {
    if (!accountingDb) return res.status(503).json({ error: 'Buchhaltungsmodul nicht geladen' });
    const entry = await accountingDb.addEntry(
      Object.assign({}, req.body || {}, { created_by: req.user.id })
    );
    res.json({ success: true, entry });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Stornieren (Loeschen und Aendern sind auf DB-Ebene gesperrt)
app.post('/api/admin/accounting/entries/:id/reverse', requireAdmin, async (req, res) => {
  try {
    if (!accountingDb) return res.status(503).json({ error: 'Buchhaltungsmodul nicht geladen' });
    const out = await accountingDb.reverseEntry(
      parseInt(req.params.id, 10), req.user.id, (req.body || {}).reason
    );
    res.json({ success: true, reversal_id: out.reversal.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   EXPORT FUER DEN STEUERBERATER

   Absichtlich KEIN DATEV-EXTF-Format: dessen Kopfzeile ist versions-
   abhaengig und eine falsch erzeugte Datei wird beim Import kommentarlos
   verworfen oder - schlimmer - falsch verbucht. Stattdessen ein klar
   benanntes Journal, das jede Kanzlei mappen kann, plus eine Liesmich
   mit den Annahmen. Lieber eine Datei, die erklaert werden kann, als
   eine, die Kompatibilitaet nur vortaeuscht.

   ?format=journal   Buchungsjournal der erfassten Saetze
   ?format=orders    Provisionsnachweis je Bestellposition
   ?format=summary   Periodenzusammenfassung
   ------------------------------------------------------------ */
app.get('/api/admin/accounting/export', requireAdmin, async (req, res) => {
  try {
    if (!accountingDb) return res.status(503).json({ error: 'Buchhaltungsmodul nicht geladen' });
    const from = req.query.from || null;
    const to = req.query.to || null;
    const format = String(req.query.format || 'journal').toLowerCase();
    const CUR = accountingDb.REPORT_CURRENCY;

    const esc = (v) => {
      const s2 = (v === null || v === undefined) ? '' : String(v);
      return /[";\n\r]/.test(s2) ? '"' + s2.replace(/"/g, '""') + '"' : s2;
    };
    const n2 = (v) => (Math.round((Number(v) || 0) * 100) / 100).toFixed(2).replace('.', ',');
    const send = (name, lines) => {
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.set('Content-Disposition', 'attachment; filename="' + name + '"');
      res.send('\uFEFF' + lines.join('\r\n') + '\r\n');
    };
    const span = (from || 'anfang') + '_' + (to || 'heute');

    if (format === 'journal') {
      const rows = await accountingDb.listEntries({ from, to });
      const lines = ['Nr;Belegdatum;Kategorie;Art;Buchungstext;Geschaeftspartner;Betrag;Waehrung;Kurs;Betrag_' + CUR + ';USt_Satz;USt_Betrag;Beleg;Storno_von;Storniert_durch;Erfasst_am'];
      for (const e of rows) {
        lines.push([
          e.id, String(e.entry_date).slice(0, 10), e.category,
          e.direction === 'income' ? 'Ertrag' : 'Aufwand',
          e.description, e.counterparty, n2(e.amount), e.currency,
          String(Number(e.fx_rate)).replace('.', ','), n2(e.amount_report),
          e.vat_rate === null ? '' : n2(e.vat_rate),
          e.vat_amount === null ? '' : n2(e.vat_amount),
          e.doc_ref || e.doc_url, e.reverses_id || '', e.reversed_by_id || '',
          new Date(e.created_at).toISOString(),
        ].map(esc).join(';'));
      }
      return send('buchungsjournal_' + span + '.csv', lines);
    }

    if (format === 'orders') {
      const params = [];
      const where = [`o.status = 'paid'`];
      if (from) { params.push(from); where.push(`o.created_at >= $${params.length}`); }
      if (to)   { params.push(to);   where.push(`o.created_at < ($${params.length}::date + 1)`); }
      const r = await query(`
        SELECT o.id AS order_id, o.created_at, o.currency, o.fx_rate, o.fx_source, o.base_currency,
               oi.merchant_id, oi.line_total, oi.commission_amount, oi.payout_amount, oi.payout_status
          FROM order_items oi
          JOIN orders o ON o.id = oi.order_id
         WHERE ${where.join(' AND ')}
         ORDER BY o.created_at, o.id
      `, params);
      const labels = await merchantLabels(r.rows.map((x) => x.merchant_id));
      const lines = ['Bestellung;Datum;Haendler;Haendler_ID;Waehrung;Brutto;Provision;Haendleranteil;Auszahlstatus;Kurs_zu_' + (fx.baseCurrency()) + ';Kursquelle;Brutto_Basis;Provision_Basis;Haendleranteil_Basis'];
      for (const x of r.rows) {
        const rate = Number(x.fx_rate) || 0;
        lines.push([
          x.order_id, new Date(x.created_at).toISOString().slice(0, 10),
          (labels[x.merchant_id] || {}).label || '', x.merchant_id || '',
          x.currency, n2(x.line_total), n2(x.commission_amount), n2(x.payout_amount),
          x.payout_status, String(rate).replace('.', ','), x.fx_source || '',
          n2(Number(x.line_total) * rate), n2(Number(x.commission_amount) * rate),
          n2(Number(x.payout_amount) * rate),
        ].map(esc).join(';'));
      }
      return send('provisionsnachweis_' + span + '.csv', lines);
    }

    // summary
    const rep = await accountingDb.periodReport({ from, to });
    const m = rep.marketplace;
    const lines = ['Position;Betrag_' + CUR + ';Hinweis'];
    lines.push(['Zeitraum', '', (from || 'Anfang') + ' bis ' + (to || 'heute')].map(esc).join(';'));
    lines.push(['Bruttowarenwert (GMV)', n2(m.gmv), 'KEIN Umsatz der Plattform - nur zur Einordnung'].map(esc).join(';'));
    lines.push(['Provisionsertrag', n2(m.commission), 'Ertrag der Plattform'].map(esc).join(';'));
    lines.push(['Haendleranteil', n2(m.merchant_share), 'Durchlaufender Posten, KEIN Ertrag'].map(esc).join(';'));
    lines.push(['davon noch nicht ausgezahlt', n2(m.liability_open), 'Verbindlichkeit gegenueber Haendlern zum Stichtag'].map(esc).join(';'));
    lines.push(['davon ausgezahlt', n2(m.paid_out), ''].map(esc).join(';'));
    lines.push(['', '', ''].join(';'));
    for (const c of rep.manual.by_category) {
      lines.push([c.label, n2(c.direction === 'income' ? c.amount : -c.amount), c.count + ' Beleg(e)'].map(esc).join(';'));
    }
    lines.push(['', '', ''].join(';'));
    lines.push(['Erträge gesamt', n2(rep.result.income_total), 'Provision + erfasste Erträge'].map(esc).join(';'));
    lines.push(['Aufwendungen gesamt', n2(rep.result.expense_total), 'nur erfasste Belege'].map(esc).join(';'));
    lines.push(['Überschuss (vorläufig)', n2(rep.result.surplus), 'KEIN Jahresergebnis - siehe Hinweise'].map(esc).join(';'));
    lines.push(['', '', ''].join(';'));
    lines.push(['NICHT ENTHALTEN', '', ''].map(esc).join(';'));
    rep.not_included.forEach((x) => lines.push(['', '', x].map(esc).join(';')));
    lines.push(['Kurs ' + m.base_currency + '->' + CUR, String(m.base_to_report_rate).replace('.', ','), 'Quelle: ' + m.base_to_report_source].map(esc).join(';'));
    if (m.fx_incomplete) lines.push(['WARNUNG', '', 'Bestellungen ohne ermittelten Wechselkurs enthalten'].map(esc).join(';'));
    if (m.has_legacy_fx) lines.push(['HINWEIS', '', 'Altbestellungen mit Kurs 1 (fx_source=legacy) enthalten'].map(esc).join(';'));
    return send('zusammenfassung_' + span + '.csv', lines);
  } catch (err) {
    console.error('[accounting/export]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   Haendler-Namen zu merchant_ids nachschlagen.
   Reine Anzeigehilfe: eine ID sagt im Admin nichts, ein Firmenname schon.
   Ein Query fuer alle IDs statt einer Abfrage je Zeile.
   ------------------------------------------------------------ */
async function merchantLabels(merchantIds) {
  const ids = Array.from(new Set((merchantIds || []).filter(Boolean).map(Number)));
  if (!ids.length) return {};
  const r = await query(`
    SELECT m.id AS merchant_id, u.name AS user_name, u.email AS user_email,
           s.name AS shop_name, s.country AS shop_country
      FROM merchants m
      LEFT JOIN users u ON u.id = m.user_id
      LEFT JOIN LATERAL (
            SELECT sh.name, sh.country FROM shops sh
             WHERE sh.owner_id = m.user_id
             ORDER BY sh.created_at ASC LIMIT 1
      ) s ON TRUE
     WHERE m.id = ANY($1::bigint[])
  `, [ids]);
  const map = {};
  for (const row of r.rows) {
    map[row.merchant_id] = {
      label: row.shop_name || row.user_name || row.user_email || ('Händler #' + row.merchant_id),
      shop_name: row.shop_name || null,
      user_name: row.user_name || null,
      email: row.user_email || null,
      country: row.shop_country || null,
    };
  }
  return map;
}

/* ------------------------------------------------------------
   Admin: pawaPay-Auszahlungen mit fertigem Betrag in Landeswaehrung.

   WARUM DAS NOETIG IST: Das Ledger fuehrt den Haendleranteil in USD,
   pawaPay zahlt aber in Landeswaehrung aus. Rechnet man von Hand mit dem
   Tageskurs um, traegt die Plattform das komplette Wechselkursrisiko -
   bei diesen Waehrungen ueber drei Wochen leicht zweistellig.

   Deshalb wird JE BESTELLUNG mit dem Kurs gerechnet, zu dem auch kassiert
   wurde (payments.fx_rate, beim Deposit eingefroren). Die Summe daraus ist
   automatisch gewichtet - ohne dass irgendwo ein Durchschnitt gebildet
   werden muesste. Der Live-Kurs wird nur zum Vergleich mitgeliefert.
   ------------------------------------------------------------ */

// Mobile-Money-Waehrungen ohne Nachkommastellen (identisch zum Adapter).
const MM_ZERO_DECIMAL = ['XOF', 'XAF', 'CDF', 'RWF', 'UGX', 'TZS', 'MWK', 'NGN'];

app.get('/api/admin/payouts/pawapay', requireAdmin, async (req, res) => {
  try {
    const r = await query(`
      SELECT oi.merchant_id,
             o.currency                                   AS ledger_currency,
             p.local_currency,
             COUNT(*)::int                                AS item_count,
             SUM(oi.payout_amount)::float8                AS amount,
             SUM(oi.payout_amount * COALESCE(p.fx_rate,0))::float8 AS amount_local,
             COUNT(*) FILTER (WHERE p.fx_rate IS NULL)::int        AS missing_rate_items,
             MIN(o.created_at)                            AS oldest_order
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        LEFT JOIN LATERAL (
              SELECT pm.fx_rate, pm.local_currency
                FROM payments pm
               WHERE pm.order_id = o.id
                 AND pm.fx_rate IS NOT NULL
               ORDER BY (pm.status = 'succeeded') DESC, pm.updated_at DESC
               LIMIT 1
        ) p ON TRUE
       WHERE o.status = 'paid'
         AND oi.payout_status = 'pending'
         AND oi.merchant_id IS NOT NULL
       GROUP BY oi.merchant_id, o.currency, p.local_currency
       HAVING SUM(oi.payout_amount) > 0
       ORDER BY SUM(oi.payout_amount) DESC
    `);

    const rows = [];
    for (const row of r.rows) {
      const target = await resolvePayoutTarget(row.merchant_id);
      if (!target || target.method !== 'pawapay') continue;

      const meta = (target.account && target.account.meta) || {};
      const amountUsd = Number(row.amount) || 0;
      const localCur = row.local_currency || null;
      const frozenLocal = Number(row.amount_local) || 0;
      const weighted = (frozenLocal > 0 && amountUsd > 0) ? (frozenLocal / amountUsd) : null;

      // Live-Kurs nur zum Vergleich - NICHT zum Auszahlen.
      let liveRate = null, liveLocal = null, diffPct = null;
      if (localCur) {
        try {
          const lr = await fx.getRate(row.ledger_currency || 'USD', localCur);
          liveRate = lr.rate;
          liveLocal = amountUsd * lr.rate;
          if (weighted) diffPct = ((liveRate - weighted) / weighted) * 100;
        } catch (e) { /* Live-Kurs ist Beiwerk */ }
      }

      const roundLocal = (v) => {
        if (v === null || v === undefined) return null;
        return MM_ZERO_DECIMAL.includes(String(localCur || '').toUpperCase())
          ? Math.round(v)
          : Math.round(v * 100) / 100;
      };

      const problems = [];
      if (!meta.country && !target.account.external_id) problems.push('Keine Mobile-Money-Nummer hinterlegt');
      if (!localCur) problems.push('Kein Inkasso-Kurs gefunden (Bestellung nicht ueber pawaPay bezahlt?)');
      if (row.missing_rate_items > 0) problems.push(row.missing_rate_items + ' Position(en) ohne eingefrorenen Kurs');

      rows.push({
        merchant_id: row.merchant_id,
        seller: null, // wird unten nachgetragen
        msisdn: target.account.external_id || null,
        country: meta.country || null,
        business_name: meta.business_name || null,
        item_count: row.item_count,
        oldest_order: row.oldest_order,
        ledger_currency: row.ledger_currency,
        amount: Math.round(amountUsd * 100) / 100,
        local_currency: localCur,
        amount_local: roundLocal(frozenLocal),
        weighted_rate: weighted ? Math.round(weighted * 1000000) / 1000000 : null,
        live_rate: liveRate ? Math.round(liveRate * 1000000) / 1000000 : null,
        amount_local_live: roundLocal(liveLocal),
        diff_pct: diffPct === null ? null : Math.round(diffPct * 100) / 100,
        ready: problems.length === 0,
        problems,
      });
    }

    const ppLabels = await merchantLabels(rows.map((x) => x.merchant_id));
    rows.forEach((x) => { x.seller = (ppLabels[x.merchant_id] || {}).label || null; });

    res.json({
      rows,
      base_currency: fx.baseCurrency(),
      total_usd: Math.round(rows.reduce((s, x) => s + x.amount, 0) * 100) / 100,
    });
  } catch (err) {
    console.error('[admin/payouts/pawapay]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   Admin: ALLE hinterlegten Auszahlungsziele.
   Bewusst getrennt von /payouts/pending: dort stehen nur Haendler mit
   offenem Guthaben. Ein Haendler, der gerade seine Bankdaten eingetragen
   hat und noch nichts verkauft hat, taucht dort nicht auf - du koenntest
   ihn also weder pruefen noch freigeben. Diese Route zeigt ihn.
   ------------------------------------------------------------ */
app.get('/api/admin/payouts/payees', requireAdmin, async (req, res) => {
  try {
    const r = await query(`
      SELECT pa.merchant_id, pa.provider, pa.external_id, pa.status, pa.currency, pa.meta,
             pa.updated_at, m.user_id, m.default_payout_provider,
             u.name AS user_name, u.email AS user_email, u.country AS user_country
        FROM provider_accounts pa
        JOIN merchants m ON m.id = pa.merchant_id
        LEFT JOIN users u ON u.id = m.user_id
       WHERE pa.kind = 'payee'
       ORDER BY pa.provider, pa.merchant_id
    `);

    const payees = r.rows.map((row) => {
      const meta = row.meta || {};
      const base = {
        merchant_id: row.merchant_id,
        user_id: row.user_id,
        seller: row.user_name || row.user_email || null,
        email: row.user_email || null,
        provider: row.provider,
        status: row.status,
        updated_at: row.updated_at,
        is_default: row.default_payout_provider === row.provider,
      };
      if (row.provider === 'payoneer') {
        const check = PayoneerCls
          ? PayoneerCls.validatePayee(Object.assign({}, meta, { approved: true }))
          : { ok: true };
        return Object.assign(base, {
          approved: meta.approved === true,
          approved_at: meta.approved_at || null,
          holder_name: meta.holder_name || null,
          bank_account: meta.bank_account || row.external_id || null,
          bank_country: meta.bank_country || null,
          bank_currency: meta.bank_currency || row.currency || null,
          payee_email: meta.payee_email || null,
          business_name: meta.business_name || null,
          data_ok: check.ok,
          data_problem: check.ok ? null : check.reason,
          changed_at: meta.changed_at || null,
          history: Array.isArray(meta.history) ? meta.history : [],
        });
      }
      if (row.provider === 'pawapay') {
        return Object.assign(base, {
          msisdn: row.external_id || null,
          country: meta.country || null,
          business_name: meta.business_name || null,
        });
      }
      return Object.assign(base, { external_id: row.external_id, meta });
    });

    res.json({
      payees,
      counts: {
        total: payees.length,
        payoneer_pending: payees.filter((p) => p.provider === 'payoneer' && !p.approved).length,
        payoneer_approved: payees.filter((p) => p.provider === 'payoneer' && p.approved).length,
      },
    });
  } catch (err) {
    console.error('[admin/payouts/payees]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   Admin: Empfaengerkonto als von Payoneer freigegeben markieren.
   Payoneer muss jedes fremde Bankkonto einmalig genehmigen, bevor es in
   einem Zahllauf akzeptiert wird. Erst danach darf der Haendler in eine
   Datei - sonst wird der ganze Upload abgewiesen.
   ------------------------------------------------------------ */
app.post('/api/admin/payouts/payoneer/approve', requireAdmin, async (req, res) => {
  try {
    const merchantId = parseInt((req.body || {}).merchant_id, 10);
    const approved = (req.body || {}).approved !== false;
    if (!merchantId) return res.status(400).json({ error: 'merchant_id erforderlich' });

    const acc = await billingDb.getProviderAccount(merchantId, 'payoneer', 'payee');
    if (!acc || !acc.external_id) return res.status(404).json({ error: 'Kein Payoneer-Ziel hinterlegt' });

    const meta = Object.assign({}, acc.meta || {}, {
      approved,
      approved_at: approved ? new Date().toISOString() : null,
    });
    await billingDb.upsertProviderAccount({
      merchantId, provider: 'payoneer', kind: 'payee',
      externalId: acc.external_id, status: approved ? 'active' : 'pending',
      currency: meta.bank_currency || null, meta,
    });
    res.json({ success: true, merchant_id: merchantId, approved });
  } catch (err) {
    console.error('[admin/payouts/payoneer/approve]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Auszahlung als erledigt markieren, NACHDEM das Geld raus ist.
// Schliesst die offenen Posten und legt einen payouts-Datensatz als Beleg an.
app.post('/api/admin/payouts/settle', requireAdmin, async (req, res) => {
  try {
    const { merchant_id, currency, reference } = req.body || {};
    if (!merchant_id || !currency) {
      return res.status(400).json({ error: 'merchant_id und currency erforderlich' });
    }
    const balance = await billingDb.getMerchantBalance(parseInt(merchant_id, 10));
    const row = balance.find((b) => String(b.currency) === String(currency));
    if (!row || !(Number(row.amount) > 0)) {
      return res.status(400).json({ error: 'Kein offener Betrag in dieser Waehrung' });
    }

    const target = await resolvePayoutTarget(merchant_id);
    const payout = await billingDb.recordPayout({
      merchantId: parseInt(merchant_id, 10),
      provider: target ? target.method : 'manual',
      providerPayoutId: reference || ('manual-' + Date.now()),
      amount: Number(row.amount),
      currency,
      status: 'paid',
      kind: 'ledger_batch',
      raw: { reference: reference || null, settled_by: 'admin', item_count: row.item_count },
    });

    const result = await billingDb.markPayoutItemsPaid(parseInt(merchant_id, 10), currency, payout.id);
    res.json({ ok: true, settled_items: result.count, amount: Number(row.amount), currency });
  } catch (err) {
    console.error('[admin/payouts/settle]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Oeffentliche Laenderliste fuer den Checkout: in welchen Laendern
// kassieren wir per Mobile Money? Alle uebrigen Laender laufen ueber den
// Stripe-Kartencheckout. Das Frontend koppelt daran die Zahlungsart,
// damit der Kunde nichts angeboten bekommt, was es nicht gibt.
app.get('/api/payments/countries', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json({
    mobile_money: PAWAPAY_COUNTRIES,   // pawaPay
    card_fallback: true,               // alles andere -> Stripe
  });
});

// --- Diagnose: was ist bei pawaPay fuer UNSER Konto wirklich frei? ---
// Zeigt die Laender/Provider/Limits aus /v2/active-conf und danebengestellt
// unsere eigene Routing-Entscheidung. Damit siehst du sofort, ob eine
// Freischaltung (z. B. Ghana) angekommen ist - dann nur noch
// PAWAPAY_EXCLUDED_COUNTRIES in Render anpassen, kein Deploy noetig.
app.get('/api/admin/pawapay/active-conf', requireAdmin, async (req, res) => {
  try {
    const fn = (name, fb) => (PawaPayCls && typeof PawaPayCls[name] === 'function')
      ? PawaPayCls[name]() : fb;
    const routing = {
      aktiv_bei_uns: PAWAPAY_COUNTRIES,
      ausgeschlossen: fn('excludedCountries', ['NG', 'GH']),
      technisch_bekannt: fn('supportedCountries', []),
      adapter_aktuell: !!(PawaPayCls && typeof PawaPayCls.payoutCountries === 'function'),
    };
    if (!process.env.PAWAPAY_API_TOKEN) {
      return res.json({ routing, active_conf: null, hinweis: 'PAWAPAY_API_TOKEN fehlt' });
    }
    const pawapay = payments.getProvider('pawapay');
    const conf = await pawapay.activeConfiguration();
    res.json({ routing, active_conf: conf });
  } catch (err) {
    console.error('[admin/pawapay/active-conf]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
//  PHASE 3a - STRIPE CONNECT ONBOARDING (EU/US/global-Haendler)
//  EINFUEGEN bei deinen anderen Routen, z. B. oberhalb von
//  app.get('/api/seed-categories', ...).
//  Nutzt requireSeller (Phase 1), billingDb, payments.
//
//  Voraussetzung: In Stripe muss CONNECT aktiviert sein
//  (Dashboard -> Connect -> Get started, im Testmodus).
// ============================================================

// Onboarding starten -> gehosteter Stripe-Link
app.post('/api/seller/stripe-connect', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const { country } = req.body || {};
    const m = await billingDb.ensureMerchant(req.user.id);
    const stripe = payments.getProvider('stripe');

    const accountId = await stripe.createConnectAccount({
      merchant: m, email: req.user.email, country: country || undefined,
    });

    const base = process.env.PUBLIC_BASE_URL || 'https://afcarparts.com';
    const url = await stripe.createAccountLink({
      accountId,
      refreshUrl: base + '/#seller-stripe-connect',
      returnUrl: base + '/#seller-stripe-connect?connected=1',
    });

    res.json({ onboarding_url: url, account_id: accountId });
  } catch (err) {
    console.error('[seller/stripe-connect]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Status des Connect-Kontos (zahlungsbereit?)
app.get('/api/seller/stripe-connect', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const m = await billingDb.ensureMerchant(req.user.id);
    const acct = await billingDb.getProviderAccount(m.id, 'stripe', 'connect');
    if (!acct || !acct.external_id) return res.json({ connected: false, account: null });

    const stripe = payments.getProvider('stripe');
    const info = await stripe.getConnectAccount(acct.external_id);

    await billingDb.upsertProviderAccount({
      merchantId: m.id, provider: 'stripe', kind: 'connect',
      externalId: acct.external_id, status: info.chargesEnabled ? 'active' : 'pending',
      meta: {
        country: info.country, charges_enabled: info.chargesEnabled,
        payouts_enabled: info.payoutsEnabled, details_submitted: info.detailsSubmitted,
      },
    });

    // Sobald Connect bereit ist und der Haendler noch nichts gewaehlt hat,
    // wird Stripe zur Standardmethode - Stripe traegt dabei die
    // Regulierungslast.
    //
    // ACHTUNG (Fehler behoben 08/2026): Frueher stand hier NUR diese
    // Bedingung. Ein Haendler, der vorher Payoneer hinterlegt hatte und
    // danach Stripe Connect einrichtete, blieb deshalb stillschweigend
    // auf Payoneer - er sah "verbunden", und das Geld lief weiter woanders
    // hin. Ein bestehender Weg wird weiterhin NICHT ueberschrieben, aber
    // der Haendler bekommt jetzt eine sichtbare Umschaltmoeglichkeit
    // (POST /api/seller/payout-method).
    if (info.chargesEnabled && !m.default_payout_provider) {
      await billingDb.setDefaultPayoutProvider(m.id, 'stripe');
    }
    const canSwitchToStripe = !!(info.chargesEnabled && m.default_payout_provider
                                 && m.default_payout_provider !== 'stripe');

    res.json({
      connected: info.chargesEnabled,
      default_provider: m.default_payout_provider || (info.chargesEnabled ? 'stripe' : null),
      can_switch_to_stripe: canSwitchToStripe,
      account: {
        id: info.id, charges_enabled: info.chargesEnabled,
        payouts_enabled: info.payoutsEnabled, details_submitted: info.detailsSubmitted,
        country: info.country,
      },
    });
  } catch (err) {
    console.error('[seller/stripe-connect:status]', err.message);
    res.status(500).json({ error: err.message });
  }
});
// ── ONE-TIME CATEGORY SEED ────────────────────────────────────
// Call once: GET /api/seed-categories?secret=YOUR_MIGRATION_SECRET
app.get('/api/seed-categories', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  function mkSlug(t) { return String(t||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').substring(0,80); }

  // [en, de, fr, pt, es, ar, tr, sw, ln, icon, sort, parentSlug]
  const CATS = [
    ['Engine & Drivetrain','Motor & Antrieb','Moteur & Transmission','Motor & Transmissão','Motor & Transmisión','المحرك والناقل','Motor & Aktarma','Injini & Uendeshaji','Moteur & Entraînement','🔧',10,null],
    ['Engine Block & Components','Motorblock & Komponenten','Bloc Moteur & Composants','Bloco Motor & Componentes','Bloque Motor & Componentes','كتلة المحرك ومكوناتها','Motor Bloğu','Bloku la Injini','Bloka ya Moteur','⚙️',11,'engine-drivetrain'],
    ['Timing','Steuertrieb','Distribution','Distribuição','Distribución','توقيت المحرك','Triger Sistemi','Mfumo wa Wakati','Distribution','⛓️',12,'engine-drivetrain'],
    ['Fuel System','Kraftstoffsystem','Alimentation','Sistema de Combustível','Sistema de Combustible','نظام الوقود','Yakıt Sistemi','Mfumo wa Mafuta','Système Carburant','⛽',13,'engine-drivetrain'],
    ['Air Intake','Luftansaugung','Admission Air','Admissão de Ar','Admisión de Aire','سحب الهواء','Hava Emişi','Uingizaji Hewa','Admission Air','💨',14,'engine-drivetrain'],
    ['Cooling System','Kühlsystem','Refroidissement','Sistema de Arrefecimento','Sistema de Refrigeración','نظام التبريد','Soğutma Sistemi','Mfumo wa Kupoza','Refroidissement','🌡️',15,'engine-drivetrain'],
    ['Lubrication System','Schmiersystem','Lubrification','Sistema de Lubrificação','Sistema de Lubricación','نظام التزليق','Yağlama Sistemi','Mafuta ya Kulinika','Lubrification','🛢️',16,'engine-drivetrain'],
    ['Clutch & Gearbox','Kupplung & Getriebe','Embrayage & Boîte','Embraiagem & Caixa','Embrague & Caja','القابض وصندوق التروس','Debriyaj & Şanzıman','Klachi & Gearbox','Embrayage & Boîte','🔄',17,'engine-drivetrain'],
    ['Brakes','Bremsanlage','Freinage','Sistema de Travagem','Sistema de Frenos','نظام الفرامل','Fren Sistemi','Mfumo wa Breki','Système Frein','🛑',20,null],
    ['Brake Pads','Bremsbeläge','Plaquettes de Frein','Pastilhas de Travão','Pastillas de Freno','أحذية الفرامل','Fren Balataları','Pedi za Breki','Plaquettes Frein','🔴',21,'brakes'],
    ['Brake Discs','Bremsscheiben','Disques de Frein','Discos de Travão','Discos de Freno','أقراص الفرامل','Fren Diskleri','Diski za Breki','Disques Frein','💿',22,'brakes'],
    ['Brake Calipers','Bremssättel','Étriers & Cylindres','Pinças & Cilindros','Pinzas & Cilindros','ملازم الفرامل','Fren Kaliperleri','Kalipa & Silinda','Étriers & Cylindres','🔩',23,'brakes'],
    ['ABS / ESP Sensors','ABS / ESP Sensorik','Capteurs ABS / ESP','Sensores ABS / ESP','Sensores ABS / ESP','حساسات ABS / ESP','ABS / ESP Sensörleri','Sensa za ABS / ESP','Capteurs ABS / ESP','📡',24,'brakes'],
    ['Brake Lines','Bremsleitungen','Canalisations de Frein','Tubagens de Travão','Tuberías de Freno','أنابيب الفرامل','Fren Boruları','Mabomba ya Breki','Canalisations Frein','〰️',25,'brakes'],
    ['Parking Brake','Handbremse','Frein à Main','Travão de Mão','Freno de Mano','فرامل اليد','El Freni','Breki ya Mkono','Frein à Main','🅿️',26,'brakes'],
    ['Suspension & Steering','Fahrwerk & Lenkung','Suspension & Direction','Suspensão & Direção','Suspensión & Dirección','التعليق والتوجيه','Süspansiyon & Direksiyon','Kusimamia & Uendeshaji','Suspension & Direction','🔀',30,null],
    ['Shock Absorbers & Springs','Stoßdämpfer & Federung','Amortisseurs & Ressorts','Amortecedores & Molas','Amortiguadores & Muelles','الممتصات والزنبركات','Amortisörler & Yaylar','Vifaa vya Kusimamia','Amortisseurs & Ressorts','🌀',31,'suspension-steering'],
    ['Steering Parts','Lenkung','Direction','Direção','Dirección','نظام التوجيه','Direksiyon','Mfumo wa Uendeshaji','Direction','🎮',32,'suspension-steering'],
    ['Axle Parts','Achsteile','Pièces Train Roulant','Peças de Eixo','Piezas Tren Delantero','أجزاء المحور','Aks Parçaları','Sehemu za Mhimili','Pièces Train Roulant','⚙️',33,'suspension-steering'],
    ['Wheel Bearings','Radlager','Roulements de Roue','Rolamentos de Roda','Rodamientos de Rueda','محامل العجل','Tekerlek Rulmanları','Beari za Gurudumu','Roulements Roue','⭕',34,'suspension-steering'],
    ['Electrics & Sensors','Elektrik & Sensorik','Électricité & Capteurs','Elétrica & Sensores','Electricidad & Sensores','الكهرباء والمستشعرات','Elektrik & Sensörler','Umeme & Sensa','Électrique & Capteurs','⚡',40,null],
    ['Battery & Charging','Batterie & Ladung','Batterie & Charge','Bateria & Carregamento','Batería & Carga','البطارية والشحن','Akü & Şarj','Betri & Kuchaji','Batterie & Charge','🔋',41,'electrics-sensors'],
    ['Lighting','Beleuchtung','Éclairage','Iluminação','Iluminación','الإضاءة','Aydınlatma','Taa','Éclairage','💡',42,'electrics-sensors'],
    ['Sensors','Sensoren','Capteurs','Sensores','Sensores','المستشعرات','Sensörler','Sensa','Capteurs','📡',43,'electrics-sensors'],
    ['Control Units','Steuergeräte','Calculateurs','Centralinas','Centralitas','وحدات التحكم','Kontrol Üniteleri','Vitengo vya Kudhibiti','Calculateurs','🖥️',44,'electrics-sensors'],
    ['Switches & Controls','Schalter & Bedienelemente','Commandes & Contacteurs','Interruptores & Comandos','Interruptores & Mandos','المفاتيح والأوامر','Anahtarlar & Kumandalar','Vitufe & Vidhibiti','Commandes & Contacteurs','🔘',45,'electrics-sensors'],
    ['Filters','Filter','Filtres','Filtros','Filtros','الفلاتر','Filtreler','Vichungi','Filtres','🔲',50,null],
    ['Air Filters','Luftfilter','Filtres à Air','Filtros de Ar','Filtros de Aire','فلاتر الهواء','Hava Filtreleri','Vichungi vya Hewa','Filtres Air','💨',51,'filters'],
    ['Oil Filters','Ölfilter','Filtres à Huile','Filtros de Óleo','Filtros de Aceite','فلاتر الزيت','Yağ Filtreleri','Vichungi vya Mafuta','Filtres Huile','🛢️',52,'filters'],
    ['Fuel Filters','Kraftstofffilter','Filtres à Carburant','Filtros de Combustível','Filtros de Combustible','فلاتر الوقود','Yakıt Filtreleri','Vichungi vya Petroli','Filtres Carburant','⛽',53,'filters'],
    ['Cabin Filters','Innenraumfilter','Filtres Habitacle','Filtros de Habitáculo','Filtros de Habitáculo','فلاتر المقصورة','Polen Filtreleri','Vichungi vya Cabin','Filtres Habitacle','🌿',54,'filters'],
    ['Body & Exterior','Karosserie & Außen','Carrosserie & Extérieur','Carroçaria & Exterior','Carrocería & Exterior','هيكل الجسم والمظهر','Kaporta & Dış','Mwili wa Gari & Nje','Carrosserie & Extérieur','🚗',60,null],
    ['Bumpers','Stoßfänger','Pare-Chocs','Para-Choques','Parachoques','المصدات','Tamponlar','Bumper','Pare-Chocs','🚧',61,'body-exterior'],
    ['Wings & Panels','Kotflügel & Türen','Ailes & Panneaux','Guarda-Lamas & Painéis','Aletas & Paneles','الأجنحة والألواح','Çamurluğlar & Paneller','Mabawa & Paneli','Ailes & Panneaux','🚪',62,'body-exterior'],
    ['Mirrors','Spiegel','Rétroviseurs','Espelhos','Espejos','المرايا','Aynalar','Vioo','Rétroviseurs','🔍',63,'body-exterior'],
    ['Window Regulators','Fensterheber','Lève-Vitres','Elevadores de Vidro','Elevalunas','رافعات الزجاج','Cam Mekanizmaları','Mifumo ya Glasi','Lève-Vitres','🪟',64,'body-exterior'],
    ['Locks & Closures','Schlösser & Schließsysteme','Serrures & Fermeture','Fechos & Fechaduras','Cierres & Cerraduras','الأقفال وأنظمة الإغلاق','Kilitler & Kapama','Malfungo & Kufunga','Serrures & Fermeture','🔑',65,'body-exterior'],
    ['Interior & Comfort','Innenraum & Komfort','Intérieur & Confort','Interior & Conforto','Interior & Confort','المقصورة الداخلية','İç Mekan & Konfor','Ndani ya Gari & Starehe','Intérieur & Confort','🪑',70,null],
    ['Seats & Mechanism','Sitze & Mechanik','Sièges & Mécanismes','Bancos & Mecanismos','Asientos & Mecanismos','المقاعد وآلياتها','Koltuklar & Mekanizmalar','Viti & Mifumo','Sièges & Mécanismes','🪑',71,'interior-comfort'],
    ['Dashboard & Trim','Armaturen & Verkleidung','Tableau de Bord & Garnitures','Painel & Estofos','Salpicadero & Guarnecidos','لوحة القيادة والتشطيبات','Gösterge Paneli','Dashibodi & Mapambo','Tableau de Bord','📊',72,'interior-comfort'],
    ['Air Conditioning','Klimaanlage','Climatisation','Ar Condicionado','Climatización','تكييف الهواء','Klima','Kiyoyozi','Climatisation','❄️',73,'interior-comfort'],
    ['Heating','Heizung','Chauffage','Aquecimento','Calefacción','التدفئة','Isıtma','Mfumo wa Joto','Chauffage','🌡️',74,'interior-comfort'],
    ['Exhaust System','Abgasanlage','Ligne Échappement','Sistema de Escape','Sistema de Escape','نظام العادم','Egzoz Sistemi','Mfumo wa Ekzosti','Ligne Échappement','💨',80,null],
    ['Exhaust Manifold','Krümmer','Collecteur Échappement','Coletor de Escape','Colector de Escape','مشعب العادم','Egzoz Manifoldu','Manifold ya Ekzosti','Collecteur Échappement','🔧',81,'exhaust-system'],
    ['Catalytic Converter','Katalysator','Catalyseur','Catalisador','Catalizador','المحول الحراري','Katalitik Konvertör','Kisafishaji Kemikali','Catalyseur','♻️',82,'exhaust-system'],
    ['Particulate Filter','Partikelfilter','Filtre à Particules','Filtro de Partículas','Filtro de Partículas','فلتر الجسيمات','Partikül Filtresi','Kichungi cha Chembe','Filtre à Particules','🔲',83,'exhaust-system'],
    ['Silencer & Pipes','Endschalldämpfer','Silencieux & Tubes','Silencioso & Tubagens','Silenciador & Tubos','كاتمات الصوت','Susturucu & Borular','Kisimamizi & Mabomba','Silencieux & Tubes','🔇',84,'exhaust-system'],
    ['Lambda Sensors','Lambdasonden','Sondes Lambda','Sondas Lambda','Sondas Lambda','مسابير لامبدا','Lambda Sensörleri','Sensa za Lambda','Sondes Lambda','📡',85,'exhaust-system'],
    ['Wheels & Tyres','Räder & Reifen','Roues & Pneumatiques','Rodas & Pneus','Ruedas & Neumáticos','العجلات والإطارات','Tekerlekler & Lastikler','Magurudumu & Matairi','Roues & Pneumatiques','🛞',90,null],
    ['Rims','Felgen','Jantes','Jantes','Llantas','الجنوط','Jantlar','Rimi','Jantes','⭕',91,'wheels-tyres'],
    ['Tyres','Reifen','Pneumatiques','Pneus','Neumáticos','الإطارات','Lastikler','Matairi','Pneumatiques','🛞',92,'wheels-tyres'],
    ['TPMS Sensors','Reifendrucksensoren (RDKS)','Capteurs TPMS','Sensores TPMS','Sensores TPMS','حساسات ضغط الإطار','TPMS Sensörleri','Sensa za TPMS','Capteurs TPMS','📡',93,'wheels-tyres'],
    ['Wheel Bolts & Nuts','Radschrauben & Muttern','Boulons & Écrous Roue','Parafusos & Porcas','Tornillos & Tuercas','براغي وصواميل العجل','Civata & Somunları','Bolti & Nati','Boulons & Écrous','🔩',94,'wheels-tyres'],
    ['Oils, Fluids & Chemicals','Öle, Flüssigkeiten & Chemie','Huiles, Liquides & Chimie','Óleos, Fluidos & Química','Aceites, Líquidos & Química','الزيوت والسوائل','Yağlar, Sıvılar & Kimyasallar','Mafuta, Vinywaji & Kemikali','Huiles, Liquides & Produits','🛢️',100,null],
    ['Engine Oil','Motoröl','Huile Moteur','Óleo de Motor','Aceite de Motor','زيت المحرك','Motor Yağı','Mafuta ya Injini','Huile Moteur','🛢️',101,'oils-fluids-chemicals'],
    ['Gear Oil','Getriebeöl','Huile Boîte','Óleo de Caixa','Aceite de Caja','زيت ناقل الحركة','Şanzıman Yağı','Mafuta ya Gearbox','Huile Boîte','⚙️',102,'oils-fluids-chemicals'],
    ['Brake Fluid','Bremsflüssigkeit','Liquide de Frein','Líquido de Travões','Líquido de Frenos','سائل الفرامل','Fren Hidroliği','Maji ya Breki','Liquide de Frein','🔴',103,'oils-fluids-chemicals'],
    ['Coolant','Kühlmittel','Liquide Refroidissement','Líquido de Arrefecimento','Líquido Refrigerante','سائل التبريد','Antifriz','Kibaridi','Liquide Refroidissement','🌡️',104,'oils-fluids-chemicals'],
    ['Additives & Chemicals','Additive & Chemie','Additifs & Produits','Aditivos & Químicos','Aditivos & Productos','المواد المضافة','Katkı Maddeleri','Vongeza & Kemikali','Additifs & Produits','⚗️',105,'oils-fluids-chemicals'],
    ['Accessories & Wear Parts','Zubehör & Verschleißteile','Accessoires & Pièces Usure','Acessórios & Peças Desgaste','Accesorios & Piezas Desgaste','الملحقات وقطع التآكل','Aksesuar & Aşınan Parçalar','Vifaa & Vipande','Accessoires & Pièces Usure','🔧',110,null],
    ['Wiper Blades','Wischerblätter','Balais Essuie-Glace','Palhetas Limpa-Vidros','Escobillas Limpiaparabrisas','مساحات الزجاج','Silecek Lastikleri','Blade za Mfuta','Balais Essuie-Glace','🌧️',111,'accessories-wear-parts'],
    ['Bulbs','Glühbirnen','Ampoules','Lâmpadas','Bombillas','المصابيح','Ampuller','Balbu','Ampoules','💡',112,'accessories-wear-parts'],
    ['Fuses','Sicherungen','Fusibles','Fusíveis','Fusibles','الفيوزات','Sigortalar','Fyuzi','Fusibles','⚡',113,'accessories-wear-parts'],
    ['Belts & Pulleys','Riemen & Rollen','Courroies & Galets','Correias & Polias','Correas & Poleas','السيور والبكرات','Kayışlar & Gergi','Mikanda & Roli','Courroies & Galets','🔄',114,'accessories-wear-parts'],
  ];

  const LANGS = ['en','de','fr','pt','ar'];
  const slugToId = {};
  const results = [];

  try {
    await query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id INTEGER`);

    for (const row of CATS) {
      const [en,de,fr,pt,es,ar,tr,sw,ln,icon,sort,parentSlug] = row;
      const names = {en,de,fr,pt,es,ar,tr,sw,ln};
      const slug  = mkSlug(en);
      const parentId = parentSlug ? (slugToId[parentSlug] || null) : null;

      const r = await query(
        `INSERT INTO categories (slug, icon_url, sort_order, parent_id, active)
         VALUES ($1,$2,$3,$4,true)
         ON CONFLICT (slug) DO UPDATE
           SET icon_url=EXCLUDED.icon_url, sort_order=EXCLUDED.sort_order, parent_id=EXCLUDED.parent_id, active=true
         RETURNING id`,
        [slug, icon, sort, parentId]
      );
      const catId = r.rows[0].id;
      slugToId[slug] = catId;

      for (const lang of LANGS) {
        if (!names[lang]) continue;
        await query(
          `INSERT INTO category_translations (category_id, lang, name)
           VALUES ($1,$2,$3)
           ON CONFLICT (category_id, lang) DO UPDATE SET name=EXCLUDED.name`,
          [catId, lang, names[lang]]
        );
      }
      results.push({ id: catId, slug, parent: parentId });
    }

    const total = await query('SELECT COUNT(*) as c FROM categories');
    const trans = await query('SELECT COUNT(*) as c FROM category_translations');
    res.json({
      ok: true,
      inserted: results.length,
      total_categories: total.rows[0].c,
      total_translations: trans.rows[0].c,
      categories: results
    });
  } catch(e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
// ── END SEED ─────────────────────────────────────────────────


// ════════════════════════════════════════════════════════════════════
// AUTODOC-STYLE CATEGORY EXTENSION
// Call once: GET /api/seed-autodoc?secret=YOUR_MIGRATION_SECRET
//
// Strategy:
//   1. Update DE translations of the 11 existing main categories
//      to short Autodoc-style names (e.g. "Bremsanlage" → "Bremsen").
//   2. Promote 12 existing subcategories to main level
//      (parent_id = NULL) — e.g. Klimaanlage, Beleuchtung, Felgen.
//   3. Insert 14 brand new main categories
//      (Motoröl, Tuning, Autopflege, Werkzeuge, …).
//
// Result: 37 main categories matching the Autodoc reference, with
//         all existing products & subs preserved.
// Idempotent: safe to run multiple times.
// ════════════════════════════════════════════════════════════════════
app.get('/api/seed-autodoc', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];

  async function setTranslation(catId, lang, name) {
    await query(`
      INSERT INTO category_translations (category_id, lang, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (category_id, lang) DO UPDATE SET name = EXCLUDED.name
    `, [catId, lang, name]);
  }

  try {
    await query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id INTEGER`);

    // ────────────────────────────────────────────────────────────
    // 0. RELAX language check constraint
    //    Old: only en/de/fr/pt/ar. New: + es/tr/sw/ln (9 langs used in app)
    // ────────────────────────────────────────────────────────────
    try {
      await query(`ALTER TABLE category_translations DROP CONSTRAINT IF EXISTS category_translations_lang_check`);
      await query(`
        ALTER TABLE category_translations
        ADD CONSTRAINT category_translations_lang_check
        CHECK (lang IN ('en','de','fr','pt','es','ar','tr','sw','ln'))
      `);
      log.push('✓ Relaxed lang check constraint to 9 languages');
    } catch (e) {
      log.push('⚠ Could not relax constraint: ' + e.message);
    }

    // ────────────────────────────────────────────────────────────
    // 1. RENAME existing 11 main categories to Autodoc-style DE names
    // ────────────────────────────────────────────────────────────
    const renames = [
      // [slug,                       de,                           sort_order]
      ['engine-drivetrain',           'Motor',                      10],
      ['brakes',                      'Bremsen',                    20],
      ['suspension-steering',         'Radaufhängung & Lenker',     30],
      ['electrics-sensors',           'Elektrik',                   40],
      ['filters',                     'Filter',                     50],
      ['body-exterior',               'Karosserie',                 60],
      ['interior-comfort',            'Innenraum',                  70],
      ['exhaust-system',              'Auspuff',                    80],
      ['wheels-tyres',                'Reifen',                     90],
      ['oils-fluids-chemicals',       'Öle & Flüssigkeiten',       100],
      ['accessories-wear-parts',      'Autozubehör',               110],
    ];
    for (const [slug, de, sort] of renames) {
      const r = await query('SELECT id FROM categories WHERE slug=$1', [slug]);
      if (!r.rows.length) { log.push(`SKIP rename ${slug}: not found`); continue; }
      const catId = r.rows[0].id;
      await query('UPDATE categories SET sort_order=$1, active=true WHERE id=$2', [sort, catId]);
      await setTranslation(catId, 'de', de);
      log.push(`✓ Renamed ${slug} → ${de}`);
    }

    // ────────────────────────────────────────────────────────────
    // 2. PROMOTE 12 existing subs to main category level
    //    (parent_id = NULL + new DE name + sort_order)
    // ────────────────────────────────────────────────────────────
    const promotions = [
      // [slug,                         de,                              sort_order]
      ['cooling-system',                'Kühlung',                       120],
      ['heating',                       'Heizung und Lüftung',           130],
      ['fuel-system',                   'Kraftstoffsystem',              140],
      ['steering-parts',                'Lenkung',                       150],
      ['clutch-gearbox',                'Getriebe',                      160],
      ['air-conditioning',              'Klimaanlage',                   170],
      ['lighting',                      'Beleuchtung',                   180],
      ['control-units',                 'Steuergeräte, Sensoren, Relais',190],
      ['rims',                          'Felgen',                        200],
      ['shock-absorbers-springs',       'Federung',                      210],
      ['belts-pulleys',                 'Riemen, Ketten, Rollen',        220],
      ['wheel-bearings',                'Lager',                         230],
    ];
    for (const [slug, de, sort] of promotions) {
      const r = await query('SELECT id FROM categories WHERE slug=$1', [slug]);
      if (!r.rows.length) { log.push(`SKIP promote ${slug}: not found`); continue; }
      const catId = r.rows[0].id;
      await query('UPDATE categories SET parent_id=NULL, sort_order=$1, active=true WHERE id=$2', [sort, catId]);
      await setTranslation(catId, 'de', de);
      log.push(`✓ Promoted ${slug} → main (${de})`);
    }

    // ────────────────────────────────────────────────────────────
    // 3. INSERT 14 brand new main categories
    //    Format: [slug, icon, sort, {lang: name}]
    // ────────────────────────────────────────────────────────────
    const newCats = [
      ['motor-oil',           '🛢️', 105, { en:'Engine Oil',                    de:'Motoröl',                      fr:'Huile Moteur',          pt:'Óleo de Motor',          sw:'Mafuta ya Injini',         es:'Aceite de Motor',          ar:'زيت المحرك' }],
      ['windshield-washer',   '💦', 115, { en:'Windshield Washer',             de:'Scheibenwaschanlage',          fr:'Lave-Glace',            pt:'Lava Para-Brisas',       sw:'Mfumo wa Kifuta Kioo',     es:'Limpiaparabrisas',         ar:'غسالة الزجاج' }],
      ['ignition-glow',       '⚡', 125, { en:'Ignition & Glow Plugs',         de:'Zündanlage & Glühanlage',      fr:'Allumage & Préchauffage',pt:'Sistema de Ignição',     sw:'Mfumo wa Kuwasha',         es:'Sistema de Encendido',     ar:'الإشعال والتسخين' }],
      ['seals-gaskets',       '🔘', 135, { en:'Seals & Gaskets',               de:'Dichtungen und Dichtringe',    fr:'Joints & Étanchéité',   pt:'Vedações & Juntas',      sw:'Mihuri na Gaskiti',        es:'Juntas & Retenes',         ar:'الحشيات' }],
      ['clutch',              '🔄', 145, { en:'Clutch',                        de:'Kupplung',                     fr:'Embrayage',             pt:'Embraiagem',             sw:'Klachi',                   es:'Embrague',                 ar:'القابض' }],
      ['drive-shafts-joints', '🔗', 155, { en:'Drive Shafts & Joints',         de:'Antriebswellen & Gelenke',     fr:'Arbres & Cardans',      pt:'Eixos & Juntas',         sw:'Shafti za Uendeshaji',     es:'Ejes & Juntas',            ar:'أعمدة الإدارة' }],
      ['trailer-hitch',       '🚛', 165, { en:'Trailer Hitch & Accessories',   de:'Anhängerkupplung und Zubehör', fr:'Attelage Remorque',     pt:'Engate de Reboque',      sw:'Kifaa cha Treila',         es:'Enganche de Remolque',     ar:'وصلة المقطورة' }],
      ['cardan-differential', '⚙️', 175, { en:'Cardan Shafts & Differential',  de:'Kardanwellen & Differential',  fr:'Cardans & Différentiel',pt:'Cardãs & Diferencial',   sw:'Kardani na Diferensia',    es:'Cardanes & Diferencial',   ar:'الكاردان والديفرنس' }],
      ['repair-kits',         '🛠️', 185, { en:'Repair Kits',                   de:'Reparatursätze',               fr:'Kits de Réparation',    pt:'Kits de Reparação',      sw:'Vifaa vya Ukarabati',      es:'Kits de Reparación',       ar:'مجموعات الإصلاح' }],
      ['tools-workshop',      '🔧', 195, { en:'Tools & Workshop Equipment',    de:'Werkzeuge & Werkstattausrüstung',fr:'Outils & Équipement',pt:'Ferramentas & Oficina',  sw:'Vifaa vya Karakana',       es:'Herramientas & Taller',    ar:'الأدوات والمعدات' }],
      ['pipes-hoses',         '〰️', 205, { en:'Pipes & Hoses',                 de:'Rohre und Schläuche',          fr:'Tubes & Tuyaux',        pt:'Tubos & Mangueiras',     sw:'Mabomba na Mipira',        es:'Tubos & Mangueras',        ar:'الأنابيب والخراطيم' }],
      ['car-care',            '🧴', 215, { en:'Car Care',                      de:'Autopflege',                   fr:'Entretien Auto',        pt:'Cuidados Auto',          sw:'Utunzaji wa Gari',         es:'Cuidado del Coche',        ar:'العناية بالسيارة' }],
      ['tuning',              '🏁', 225, { en:'Tuning',                        de:'Tuning',                       fr:'Tuning',                pt:'Tuning',                 sw:'Tuning',                   es:'Tuning',                   ar:'تيونينغ' }],
      ['fasteners',           '🔩', 235, { en:'Fasteners',                     de:'Befestigungsmaterial',         fr:'Fixations',             pt:'Fixadores',              sw:'Vifungo na Vibandiko',     es:'Sujetadores',              ar:'مواد التثبيت' }],
    ];
    for (const [slug, icon, sort, names] of newCats) {
      const r = await query(`
        INSERT INTO categories (slug, icon_url, sort_order, parent_id, active)
        VALUES ($1, $2, $3, NULL, true)
        ON CONFLICT (slug) DO UPDATE
          SET icon_url=EXCLUDED.icon_url, sort_order=EXCLUDED.sort_order, parent_id=NULL, active=true
        RETURNING id
      `, [slug, icon, sort]);
      const catId = r.rows[0].id;
      for (const [lang, name] of Object.entries(names)) {
        await setTranslation(catId, lang, name);
      }
      log.push(`✓ Added new main: ${slug} (${names.de})`);
    }

    // ────────────────────────────────────────────────────────────
    // 4. Stats
    // ────────────────────────────────────────────────────────────
    const mains = await query('SELECT COUNT(*)::int AS c FROM categories WHERE parent_id IS NULL AND active=true');
    const subs  = await query('SELECT COUNT(*)::int AS c FROM categories WHERE parent_id IS NOT NULL AND active=true');

    res.json({
      ok: true,
      total_main_categories: mains.rows[0].c,
      total_sub_categories:  subs.rows[0].c,
      operations_count: log.length,
      log
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message, log });
  }
});

// ============================================================
//  PHASE 1 - BLOCK B : BILLING-ENDPOINTS (Haendler-Abo)
//  EINFUEGEN irgendwo bei deinen anderen app.get/app.post-Routen,
//  z. B. direkt OBERHALB von app.get('/api/seed-categories', ...).
//  Nutzt den globalen JSON-Parser (normal) und requireAuth (bereits definiert).
// ============================================================

// Nur Haendler (oder Admin) duerfen Abo-Aktionen ausfuehren.
function requireSeller(req, res, next) {
  requireAuth(req, res, () => {
   if (!req.user || !['dealer', 'seller', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Nur fuer Haendler' });
    }
    next();
  });
}

/* ============================================================
   SUPPORT-ANSICHT (Admin "View as Seller")
   - Ein Admin darf per Header X-View-Seller-Id ein Ziel-Haendlerkonto
     "uebernehmen", um technische Probleme zu loesen.
   - resolveSellerScope() liefert die effektive Haendler-ID:
       * Admin + gueltiger Header -> Ziel-Haendler (isAdminView=true)
       * sonst                    -> eigener Account
   - Nur Admins koennen den Header nutzen; alle anderen werden ignoriert.
   - Jede SCHREIBENDE Aktion in der Support-Ansicht wird protokolliert.
   - Finanz-Endpoints (Auszahlung/Stripe/Abo) sind komplett gesperrt.
   ============================================================ */
let _supportAuditReady = false;
async function ensureSupportAudit() {
  if (_supportAuditReady) return;
  await query(`CREATE TABLE IF NOT EXISTS support_audit (
    id BIGSERIAL PRIMARY KEY,
    admin_id  TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    method    TEXT,
    path      TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`);
  _supportAuditReady = true;
}
async function logSupportAction(adminId, sellerId, method, path) {
  try {
    await ensureSupportAudit();
    await query(
      'INSERT INTO support_audit (admin_id, seller_id, method, path) VALUES ($1,$2,$3,$4)',
      [String(adminId), String(sellerId), method || '', String(path || '').slice(0, 300)]
    );
  } catch (e) { console.error('support_audit log failed:', e.message); }
}
function resolveSellerScope(req) {
  const raw = req.headers['x-view-seller-id'];
  if (req.user && req.user.role === 'admin' && raw) {
    const id = String(raw).trim();
    if (id && id !== String(req.user.id)) {
      if (req.method !== 'GET') {
        logSupportAction(req.user.id, id, req.method, req.originalUrl || req.path).catch(() => {});
      }
      return { id: id, isAdminView: true };
    }
  }
  return { id: req.user ? req.user.id : null, isAdminView: false };
}
// Sperrt Finanz-Endpoints, sobald ein Admin in der Support-Ansicht ist.
function blockFinancialInAdminView(req, res, next) {
  if (req.user && req.user.role === 'admin' && req.headers['x-view-seller-id']) {
    return res.status(403).json({ error: 'FIN_BLOCKED', message: 'Finanzdaten sind in der Support-Ansicht gesperrt.' });
  }
  next();
}

const PLAN_LIMITS = { basic: 10, pro: 100 };
const APP_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://afcarparts.com';

// Abo starten -> liefert gehostete Stripe-Checkout-URL zurueck
app.post('/api/billing/subscribe', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const plan = String((req.body && req.body.plan) || '').toLowerCase();
    if (!PLAN_LIMITS[plan]) return res.status(400).json({ error: 'Ungueltiger Plan (basic|pro)' });

    const merchant = await billingDb.ensureMerchant(req.user.id);
    const stripe = payments.getProvider('stripe');
    const customerId = await stripe.ensureCustomer({
      merchant, email: req.user.email, name: req.user.name,
    });

    const url = await stripe.createSubscriptionCheckout({
      merchant, plan, customerId,
      successUrl: `${APP_BASE_URL}/#seller-dashboard?abo=success`,
      cancelUrl: `${APP_BASE_URL}/#seller-dashboard?abo=cancel`,
    });
    res.json({ url });
  } catch (err) {
    console.error('[billing/subscribe]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Stripe-Kundenportal (verwalten / kuendigen)
app.post('/api/billing/portal', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const merchant = await billingDb.getMerchantByUserId(req.user.id);
    if (!merchant) return res.status(404).json({ error: 'Kein Haendlerkonto' });
    const acct = await billingDb.getProviderAccount(merchant.id, 'stripe', 'customer');
    if (!acct || !acct.external_id) return res.status(400).json({ error: 'Kein Stripe-Kunde vorhanden' });

    const stripe = payments.getProvider('stripe');
    const url = await stripe.createBillingPortal({
      customerId: acct.external_id,
      returnUrl: `${APP_BASE_URL}/#seller-dashboard?abo=portal`,
    });
    res.json({ url });
  } catch (err) {
    console.error('[billing/portal]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Abo-Status (fuer Dashboard-Anzeige und Zugangslogik)
app.get('/api/billing/status', requireSeller, blockFinancialInAdminView, async (req, res) => {
  try {
    const merchant = await billingDb.ensureMerchant(req.user.id);
    const sub = await billingDb.getActiveSubscription(merchant.id);
    res.json({
      hasAccess: !!sub,
      plan: sub ? sub.plan : null,
      productLimit: sub ? sub.product_limit : 0,
      status: sub ? sub.status : 'none',
      currentPeriodEnd: sub ? sub.current_period_end : null,
      cancelAtPeriodEnd: sub ? sub.cancel_at_period_end : false,
    });
  } catch (err) {
    console.error('[billing/status]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Gate-Middleware fuer kuenftige Haendler-Routen: nur mit aktivem Abo.
// Verwendung spaeter z. B.:  app.post('/api/seller/products', requireActiveSubscription, ...)
async function requireActiveSubscription(req, res, next) {
  requireSeller(req, res, async () => {
    try {
      if (req.user.role === 'admin') return next(); // Admin immer durch
      const merchant = await billingDb.getMerchantByUserId(req.user.id);
      const sub = merchant ? await billingDb.getActiveSubscription(merchant.id) : null;
      if (!sub) {
        return res.status(402).json({ error: 'Aktives Abo erforderlich', code: 'NO_ACTIVE_SUBSCRIPTION' });
      }
      req.subscription = sub;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}
// ════════════════════════════════════════════════════════════════════
// AFCARPARTS FULL RESET & SEED  (May 2026)
// GET /api/seed-afcarparts-categories?secret=YOUR_MIGRATION_SECRET
//
// ⚠ DESTRUCTIVE: Wipes ALL existing categories & translations and
// inserts the new 20 main categories + ~110 subcategories.
// All products keep their rows but get category_id = NULL so they
// can be re-assigned in the admin UI afterwards.
//
// Translations baked-in for the 5 priority languages: en, de, fr, pt, sw.
// Idempotent: safe to run multiple times — every run = full reset.
// ════════════════════════════════════════════════════════════════════
app.get('/api/seed-afcarparts-categories', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  function mkSlug(t) {
    return String(t || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'ss')
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
  }

  // ──────────────────────────────────────────────────────────────
  // SEED DATA — 20 main categories with subs, all 5 languages
  // Order: [de, en, fr, pt, sw]
  // ──────────────────────────────────────────────────────────────
  const CATS = [
    {
      icon: '🔧', sort: 10,
      names: ['Motor', 'Engine', 'Moteur', 'Motor', 'Injini'],
      subs: [
        ['Zylinderkopf',       'Cylinder Head',     'Culasse',                'Cabeça do Motor',     'Kichwa cha Silinda'],
        ['Kolben',             'Pistons',           'Pistons',                'Pistões',             'Pistoni'],
        ['Kurbelwelle',        'Crankshaft',        'Vilebrequin',            'Cambota',             'Kurbelweli'],
        ['Ventile',            'Valves',            'Soupapes',               'Válvulas',            'Vali'],
        ['Dichtungen',         'Gaskets',           'Joints',                 'Juntas',              'Gaskiti'],
        ['Ölwanne',            'Oil Sump',          'Carter d\'Huile',        'Cárter de Óleo',      'Sufuria ya Mafuta'],
        ['Motorlager',         'Engine Mounts',     'Supports Moteur',        'Apoios do Motor',     'Misingi ya Injini'],
        ['Steuerkette',        'Timing Chain',      'Chaîne de Distribution', 'Corrente Distrib.',   'Mnyororo wa Wakati'],
        ['Zahnriemen',         'Timing Belt',       'Courroie de Distrib.',   'Correia Distrib.',    'Mkanda wa Wakati'],
        ['Keilriemen',         'V-Belt',            'Courroie Trapézoïdale',  'Correia em V',        'Mkanda wa V'],
      ]
    },
    {
      icon: '🌡️', sort: 20,
      names: ['Kühlung', 'Cooling', 'Refroidissement', 'Arrefecimento', 'Mfumo wa Kupoza'],
      subs: [
        ['Kühler',             'Radiator',          'Radiateur',              'Radiador',            'Redieta'],
        ['Lüfter',             'Cooling Fan',       'Ventilateur',            'Ventoinha',           'Feni ya Kupoza'],
        ['Thermostat',         'Thermostat',        'Thermostat',             'Termostato',          'Thermostat'],
        ['Wasserpumpe',        'Water Pump',        'Pompe à Eau',            'Bomba de Água',       'Pampu ya Maji'],
        ['Ausgleichsbehälter', 'Expansion Tank',    'Vase d\'Expansion',      'Vaso de Expansão',    'Tanki la Upanuzi'],
        ['Kühlschläuche',      'Coolant Hoses',     'Durites de Refroid.',    'Mangueiras Arrefec.', 'Mipira ya Kupoza'],
      ]
    },
    {
      icon: '⛽', sort: 30,
      names: ['Kraftstoffsystem', 'Fuel System', 'Système Carburant', 'Sistema de Combustível', 'Mfumo wa Mafuta'],
      subs: [
        ['Kraftstoffpumpe',    'Fuel Pump',         'Pompe à Carburant',      'Bomba de Combustível','Pampu ya Mafuta'],
        ['Einspritzdüsen',     'Fuel Injectors',    'Injecteurs',             'Injectores',          'Vinjekta'],
        ['Kraftstofffilter',   'Fuel Filter',       'Filtre à Carburant',     'Filtro de Combustível','Kichungi cha Mafuta'],
        ['Tank',               'Fuel Tank',         'Réservoir',              'Depósito',            'Tanki la Mafuta'],
        ['Leitungen',          'Fuel Lines',        'Conduites',              'Tubagens',            'Mabomba'],
        ['Drosselklappe',      'Throttle Body',     'Boîtier Papillon',       'Corpo de Borboleta',  'Mwili wa Kipepeo'],
      ]
    },
    {
      icon: '💨', sort: 40,
      names: ['Abgasanlage', 'Exhaust System', 'Système d\'Échappement', 'Sistema de Escape', 'Mfumo wa Ekzosti'],
      subs: [
        ['Katalysator',        'Catalytic Converter','Catalyseur',            'Catalisador',         'Kisafishaji Kemikali'],
        ['Endschalldämpfer',   'Rear Silencer',     'Silencieux Arrière',     'Silencioso Traseiro', 'Kinyamazishaji cha Nyuma'],
        ['Mittelschalldämpfer','Middle Silencer',   'Silencieux Central',     'Silencioso Central',  'Kinyamazishaji cha Kati'],
        ['Lambdasonde',        'Lambda Sensor',     'Sonde Lambda',           'Sonda Lambda',        'Sensa ya Lambda'],
        ['Abgaskrümmer',       'Exhaust Manifold',  'Collecteur d\'Échap.',   'Coletor de Escape',   'Manifold ya Ekzosti'],
      ]
    },
    {
      icon: '🔄', sort: 50,
      names: ['Getriebe & Kupplung', 'Gearbox & Clutch', 'Boîte & Embrayage', 'Caixa & Embraiagem', 'Gearbox na Klachi'],
      subs: [
        ['Kupplungssatz',      'Clutch Kit',        'Kit d\'Embrayage',       'Kit de Embraiagem',   'Seti ya Klachi'],
        ['Schwungrad',         'Flywheel',          'Volant Moteur',          'Volante do Motor',    'Gurudumu la Injini'],
        ['Getriebe',           'Gearbox',           'Boîte de Vitesses',      'Caixa de Velocidades','Gearbox'],
        ['Antriebswellen',     'Drive Shafts',      'Arbres de Transmission', 'Eixos de Transmissão','Shafti za Uendeshaji'],
        ['Gelenke',            'CV Joints',         'Cardans',                'Juntas Homocinéticas','Kardani'],
        ['Schaltseile',        'Gear Cables',       'Câbles de Vitesses',     'Cabos de Mudanças',   'Kebo za Gia'],
      ]
    },
    {
      icon: '🛑', sort: 60,
      names: ['Bremsen', 'Brakes', 'Freins', 'Travões', 'Breki'],
      subs: [
        ['Bremsscheiben',      'Brake Discs',       'Disques de Frein',       'Discos de Travão',    'Diski za Breki'],
        ['Bremsbeläge',        'Brake Pads',        'Plaquettes de Frein',    'Pastilhas de Travão', 'Pedi za Breki'],
        ['Bremssättel',        'Brake Calipers',    'Étriers de Frein',       'Pinças de Travão',    'Kalipa za Breki'],
        ['ABS-Sensoren',       'ABS Sensors',       'Capteurs ABS',           'Sensores ABS',        'Sensa za ABS'],
        ['Bremsleitungen',     'Brake Lines',       'Conduites de Frein',     'Tubagens de Travão',  'Mabomba ya Breki'],
        ['Bremskraftverstärker','Brake Booster',    'Servofrein',             'Servofreio',          'Kiongezi cha Breki'],
      ]
    },
    {
      icon: '🌀', sort: 70,
      names: ['Fahrwerk', 'Suspension', 'Suspension', 'Suspensão', 'Mfumo wa Kusimama'],
      subs: [
        ['Stoßdämpfer',        'Shock Absorbers',   'Amortisseurs',           'Amortecedores',       'Vinyonyaji vya Mishituko'],
        ['Federn',             'Springs',           'Ressorts',               'Molas',               'Sprini'],
        ['Querlenker',         'Control Arms',      'Bras de Suspension',     'Braços de Suspensão', 'Mikono ya Kudhibiti'],
        ['Stabilisatoren',     'Stabiliser Bars',   'Barres Stabilisatrices', 'Barras Estabilizadoras','Pau za Kuimarisha'],
        ['Spurstangen',        'Tie Rods',          'Biellettes',             'Barras de Direcção',  'Pau za Mwelekeo'],
        ['Radlager',           'Wheel Bearings',    'Roulements de Roue',     'Rolamentos de Roda',  'Beari za Gurudumu'],
      ]
    },
    {
      icon: '🎮', sort: 80,
      names: ['Lenkung', 'Steering', 'Direction', 'Direção', 'Uendeshaji'],
      subs: [
        ['Lenkgetriebe',       'Steering Rack',     'Crémaillère',            'Caixa de Direção',    'Boksi ya Uendeshaji'],
        ['Servopumpe',         'Power Steering Pump','Pompe Direction',       'Bomba Direção Assist.','Pampu ya Uendeshaji'],
        ['Spurstangenköpfe',   'Tie Rod Ends',      'Rotules de Direction',   'Rótulas de Direcção', 'Vichwa vya Pau'],
        ['Lenkstangen',        'Steering Rods',     'Barres de Direction',    'Barras de Direção',   'Pau za Usukani'],
        ['Lenkzwischenwelle',  'Steering Shaft',    'Arbre de Direction',     'Veio de Direção',     'Shafti ya Usukani'],
      ]
    },
    {
      icon: '⚡', sort: 90,
      names: ['Elektrik & Sensoren', 'Electrics & Sensors', 'Électricité & Capteurs', 'Elétrica & Sensores', 'Umeme na Sensa'],
      subs: [
        ['Lichtmaschine',      'Alternator',        'Alternateur',            'Alternador',          'Altaneta'],
        ['Anlasser',           'Starter Motor',     'Démarreur',              'Motor de Arranque',   'Anasa'],
        ['Batterie',           'Battery',           'Batterie',               'Bateria',             'Betri'],
        ['Kabelbaum',          'Wiring Harness',    'Faisceau Électrique',    'Cablagem',            'Mtandao wa Waya'],
        ['Sensoren',           'Sensors',           'Capteurs',               'Sensores',            'Sensa'],
        ['Steuergeräte',       'Control Units',     'Calculateurs',           'Centralinas',         'Vitengo vya Kudhibiti'],
      ]
    },
    {
      icon: '🔥', sort: 100,
      names: ['Zündung', 'Ignition', 'Allumage', 'Ignição', 'Mfumo wa Kuwasha'],
      subs: [
        ['Zündkerzen',         'Spark Plugs',       'Bougies d\'Allumage',    'Velas de Ignição',    'Plagi za Cheche'],
        ['Zündspulen',         'Ignition Coils',    'Bobines d\'Allumage',    'Bobinas de Ignição',  'Koili za Kuwasha'],
        ['Zündkabel',          'Ignition Cables',   'Câbles d\'Allumage',     'Cabos de Ignição',    'Kebo za Kuwasha'],
        ['Verteiler',          'Distributor',       'Distributeur',           'Distribuidor',        'Msambazaji'],
        ['Glühkerzen',         'Glow Plugs',        'Bougies de Préchauffage','Velas de Pré-Aquec.', 'Plagi za Joto'],
      ]
    },
    {
      icon: '🔲', sort: 110,
      names: ['Filter', 'Filters', 'Filtres', 'Filtros', 'Vichungi'],
      subs: [
        ['Ölfilter',           'Oil Filter',        'Filtre à Huile',         'Filtro de Óleo',      'Kichungi cha Mafuta'],
        ['Luftfilter',         'Air Filter',        'Filtre à Air',           'Filtro de Ar',        'Kichungi cha Hewa'],
        ['Innenraumfilter',    'Cabin Filter',      'Filtre Habitacle',       'Filtro de Habitáculo','Kichungi cha Cabin'],
        ['Kraftstofffilter',   'Fuel Filter',       'Filtre à Carburant',     'Filtro de Combustível','Kichungi cha Mafuta'],
      ]
    },
    {
      icon: '🚗', sort: 120,
      names: ['Karosserie', 'Body', 'Carrosserie', 'Carroçaria', 'Mwili wa Gari'],
      subs: [
        ['Stoßstangen',        'Bumpers',           'Pare-Chocs',             'Para-Choques',        'Bumper'],
        ['Kotflügel',          'Fenders',           'Ailes',                  'Guarda-Lamas',        'Mabawa'],
        ['Türen',              'Doors',             'Portes',                 'Portas',              'Milango'],
        ['Motorhaube',         'Bonnet',            'Capot',                  'Capot',               'Kifuniko cha Injini'],
        ['Heckklappe',         'Tailgate',          'Hayon',                  'Porta-Bagagens',      'Mlango wa Nyuma'],
        ['Spiegel',            'Mirrors',           'Rétroviseurs',           'Espelhos',            'Vioo'],
        ['Schweller',          'Sills',             'Bas de Caisse',          'Soleiras',            'Vipande vya Chini'],
      ]
    },
    {
      icon: '💡', sort: 130,
      names: ['Beleuchtung', 'Lighting', 'Éclairage', 'Iluminação', 'Taa'],
      subs: [
        ['Scheinwerfer',       'Headlights',        'Phares',                 'Faróis',              'Taa za Mbele'],
        ['Rückleuchten',       'Tail Lights',       'Feux Arrière',           'Faróis Traseiros',    'Taa za Nyuma'],
        ['Blinker',            'Indicators',        'Clignotants',            'Piscas',              'Taa za Mwelekeo'],
        ['Nebelscheinwerfer',  'Fog Lights',        'Antibrouillards',        'Faróis de Nevoeiro',  'Taa za Ukungu'],
        ['LED-Module',         'LED Modules',       'Modules LED',            'Módulos LED',         'Moduli za LED'],
      ]
    },
    {
      icon: '🪑', sort: 140,
      names: ['Innenraum', 'Interior', 'Intérieur', 'Interior', 'Ndani ya Gari'],
      subs: [
        ['Sitze',              'Seats',             'Sièges',                 'Bancos',              'Viti'],
        ['Armaturenbrett',     'Dashboard',         'Tableau de Bord',        'Painel de Instr.',    'Dashibodi'],
        ['Schalter',           'Switches',          'Commutateurs',           'Interruptores',       'Swichi'],
        ['Verkleidungen',      'Trim Panels',       'Garnitures',             'Estofos',             'Mapambo'],
        ['Gurte',              'Seatbelts',         'Ceintures',              'Cintos de Segurança', 'Mikanda ya Usalama'],
        ['Teppiche',           'Carpets',           'Tapis',                  'Tapetes',             'Mazulia'],
      ]
    },
    {
      icon: '❄️', sort: 150,
      names: ['Klimaanlage & Heizung', 'AC & Heating', 'Climatisation & Chauffage', 'AC & Aquecimento', 'Kiyoyozi na Joto'],
      subs: [
        ['Kompressor',         'AC Compressor',     'Compresseur',            'Compressor',          'Komprasa'],
        ['Kondensator',        'Condenser',         'Condenseur',             'Condensador',         'Kondensa'],
        ['Verdampfer',         'Evaporator',        'Évaporateur',            'Evaporador',          'Mvuke'],
        ['Gebläsemotor',       'Blower Motor',      'Moteur de Ventilation',  'Motor de Ventilação', 'Motoa ya Pepo'],
        ['Heizungsregler',     'Heater Controls',   'Commandes de Chauffage', 'Comandos Aquecim.',   'Vidhibiti vya Joto'],
      ]
    },
    {
      icon: '🪟', sort: 160,
      names: ['Scheiben & Wischer', 'Glass & Wipers', 'Vitres & Essuie-Glaces', 'Vidros & Limpa-Vidros', 'Vioo na Vifuta'],
      subs: [
        ['Frontscheibe',       'Windscreen',        'Pare-Brise',             'Para-Brisas',         'Kioo cha Mbele'],
        ['Heckscheibe',        'Rear Window',       'Lunette Arrière',        'Vidro Traseiro',      'Kioo cha Nyuma'],
        ['Seitenscheiben',     'Side Windows',      'Vitres Latérales',       'Vidros Laterais',     'Vioo vya Pembeni'],
        ['Wischerblätter',     'Wiper Blades',      'Balais d\'Essuie-Glace', 'Palhetas',            'Bleidi za Kufuta'],
        ['Wischermotor',       'Wiper Motor',       'Moteur d\'Essuie-Glace', 'Motor de Limpa-Vidros','Motoa ya Kufuta'],
      ]
    },
    {
      icon: '🛞', sort: 170,
      names: ['Räder & Reifen', 'Wheels & Tyres', 'Roues & Pneus', 'Rodas & Pneus', 'Magurudumu na Matairi'],
      subs: [
        ['Felgen',             'Rims',              'Jantes',                 'Jantes',              'Rimi'],
        ['Reifen',             'Tyres',             'Pneus',                  'Pneus',               'Matairi'],
        ['Radmuttern',         'Wheel Nuts',        'Écrous de Roue',         'Porcas de Roda',      'Nati za Gurudumu'],
        ['Reifendrucksensoren','TPMS Sensors',      'Capteurs TPMS',          'Sensores TPMS',       'Sensa za TPMS'],
      ]
    },
    {
      icon: '⚙️', sort: 180,
      names: ['Antrieb & Differential', 'Drivetrain & Differential', 'Transmission & Différentiel', 'Transmissão & Diferencial', 'Uendeshaji na Diferensia'],
      subs: [
        ['Kardanwelle',        'Propeller Shaft',   'Arbre de Transmission',  'Veio de Transmissão', 'Shafti ya Propela'],
        ['Differential',       'Differential',      'Différentiel',           'Diferencial',         'Diferensia'],
        ['Gelenkwellen',       'Half Shafts',       'Demi-Arbres',            'Semi-Eixos',          'Nusu-Shafti'],
        ['Achsen',             'Axles',             'Essieux',                'Eixos',               'Mhimili'],
      ]
    },
    {
      icon: '🛢️', sort: 190,
      names: ['Flüssigkeiten & Öle', 'Fluids & Oils', 'Liquides & Huiles', 'Fluidos & Óleos', 'Vinywaji na Mafuta'],
      subs: [
        ['Motoröl',            'Engine Oil',        'Huile Moteur',           'Óleo do Motor',       'Mafuta ya Injini'],
        ['Getriebeöl',         'Gearbox Oil',       'Huile de Boîte',         'Óleo da Caixa',       'Mafuta ya Gearbox'],
        ['Bremsflüssigkeit',   'Brake Fluid',       'Liquide de Frein',       'Líquido de Travões',  'Maji ya Breki'],
        ['Kühlmittel',         'Coolant',           'Liquide Refroidissement','Líquido de Arrefec.', 'Kibaridi'],
        ['Servoflüssigkeit',   'Power Steering Fluid','Liquide Direction',    'Líquido Direção Ass.','Maji ya Uendeshaji'],
      ]
    },
    {
      icon: '🧰', sort: 200,
      names: ['Zubehör', 'Accessories', 'Accessoires', 'Acessórios', 'Vifaa'],
      subs: [
        ['Fußmatten',          'Floor Mats',        'Tapis de Sol',           'Tapetes de Pé',       'Mazulia ya Sakafu'],
        ['Dachträger',         'Roof Racks',        'Barres de Toit',         'Tejadilho',           'Vibebe vya Paa'],
        ['Anhängerkupplung',   'Tow Bar',           'Attelage',               'Engate de Reboque',   'Kifaa cha Treila'],
        ['Werkzeug',           'Tools',             'Outils',                 'Ferramentas',         'Zana'],
        ['Batterieladegeräte', 'Battery Chargers',  'Chargeurs de Batterie',  'Carregadores',        'Vichaja vya Betri'],
      ]
    },
  ];

  const LANGS = ['de','en','fr','pt','sw'];
  const log = [];
  let inserted = 0;
  let insertedSubs = 0;

  try {
    // ────────────────────────────────────────────────────────────
    // 0. Schema safety
    // ────────────────────────────────────────────────────────────
    await query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id INTEGER`);
    try {
      await query(`ALTER TABLE category_translations DROP CONSTRAINT IF EXISTS category_translations_lang_check`);
      await query(`
        ALTER TABLE category_translations
        ADD CONSTRAINT category_translations_lang_check
        CHECK (lang IN ('en','de','fr','pt','es','ar','tr','sw','ln'))
      `);
    } catch (e) { log.push('⚠ constraint relax: ' + e.message); }

    // ────────────────────────────────────────────────────────────
    // 1. WIPE — orphan products, then delete categories
    // ────────────────────────────────────────────────────────────
    const prodCount = await query(`UPDATE products SET category_id = NULL WHERE category_id IS NOT NULL RETURNING id`);
    log.push(`✓ Orphaned ${prodCount.rowCount} products (category_id → NULL)`);

    await query(`DELETE FROM category_translations`);
    const wipe = await query(`DELETE FROM categories RETURNING id`);
    log.push(`✓ Deleted ${wipe.rowCount} old categories + all translations`);

    // ────────────────────────────────────────────────────────────
    // 2. INSERT main categories + subs
    // ────────────────────────────────────────────────────────────
    for (const cat of CATS) {
      const [de_m, en_m, fr_m, pt_m, sw_m] = cat.names;
      const mainSlug = mkSlug(en_m);

      const mainIns = await query(`
        INSERT INTO categories (slug, icon_url, sort_order, parent_id, active)
        VALUES ($1, $2, $3, NULL, true)
        RETURNING id
      `, [mainSlug, cat.icon, cat.sort]);
      const mainId = mainIns.rows[0].id;
      inserted++;

      for (let i = 0; i < LANGS.length; i++) {
        await query(`
          INSERT INTO category_translations (category_id, lang, name)
          VALUES ($1, $2, $3)
        `, [mainId, LANGS[i], cat.names[i]]);
      }

      // Subs
      let subOrder = 1;
      for (const sub of cat.subs) {
        const [de_s, en_s, fr_s, pt_s, sw_s] = sub;
        const subSlug = mkSlug(en_s + '-' + en_m);
        const subSort = cat.sort + subOrder;

        const subIns = await query(`
          INSERT INTO categories (slug, icon_url, sort_order, parent_id, active)
          VALUES ($1, $2, $3, $4, true)
          RETURNING id
        `, [subSlug, '▸', subSort, mainId]);
        const subId = subIns.rows[0].id;
        insertedSubs++;

        for (let i = 0; i < LANGS.length; i++) {
          await query(`
            INSERT INTO category_translations (category_id, lang, name)
            VALUES ($1, $2, $3)
          `, [subId, LANGS[i], sub[i]]);
        }
        subOrder++;
      }
      log.push(`✓ ${de_m} (${cat.subs.length} subs)`);
    }

    // ────────────────────────────────────────────────────────────
    // 3. Stats
    // ────────────────────────────────────────────────────────────
    const stats_m = await query('SELECT COUNT(*)::int AS c FROM categories WHERE parent_id IS NULL');
    const stats_s = await query('SELECT COUNT(*)::int AS c FROM categories WHERE parent_id IS NOT NULL');
    const stats_t = await query('SELECT COUNT(*)::int AS c FROM category_translations');

    res.json({
      ok: true,
      message: '✅ AFCARPARTS categories fully reseeded',
      orphaned_products: prodCount.rowCount,
      inserted_main: inserted,
      inserted_subs: insertedSubs,
      total_main_in_db: stats_m.rows[0].c,
      total_subs_in_db: stats_s.rows[0].c,
      total_translations: stats_t.rows[0].c,
      log
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message, log });
  }
});
// ── END AFCARPARTS SEED ──────────────────────────────────────


// ════════════════════════════════════════════════════════════════════
// AUTO-TRANSLATE PROXY  (admin-only)
// POST /api/admin/translate   { text, from, to }
// Uses MyMemory free public API (no key needed for low volume).
// Used by the admin category modal to auto-fill translations.
// ════════════════════════════════════════════════════════════════════
app.post('/api/admin/translate', requireAdmin, async (req, res) => {
  const { text, from, to } = req.body || {};
  if (!text || !from || !to) return res.status(400).json({ error: 'text, from, to required' });
  if (typeof text !== 'string' || text.length > 200) return res.status(400).json({ error: 'text too long (max 200 chars)' });
  if (!/^[a-z]{2}$/.test(from) || !/^[a-z]{2}$/.test(to)) return res.status(400).json({ error: 'invalid lang code' });
  if (from === to) return res.json({ ok: true, translated: text });

  try {
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + from + '|' + to;
    const r = await fetch(url, { method: 'GET' });
    if (!r.ok) return res.status(502).json({ error: 'translate provider error: ' + r.status });
    const data = await r.json();
    const translated = (data && data.responseData && data.responseData.translatedText) || '';
    if (!translated) return res.status(502).json({ error: 'empty translation' });
    res.json({ ok: true, translated: translated, match: data.responseData.match || 0 });
  } catch (e) {
    res.status(500).json({ error: 'translate failed: ' + e.message });
  }
});


// ════════════════════════════════════════════════════════════════════
// SMART RELINK — match orphaned products to new categories by title
// GET /api/relink-products-to-categories?secret=...&dry_run=1
//
// Strategy: for every product where category_id IS NULL, scan the
// title against ALL category names in ALL 5 languages. Sub-categories
// (more specific) and longer names win. Word-boundary matching
// prevents false matches (e.g. "Tank" inside "Tankstelle").
//
// Pass ?dry_run=1 first to preview without writing anything.
// ════════════════════════════════════════════════════════════════════
app.get('/api/relink-products-to-categories', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const dryRun = req.query.dry_run === '1' || req.query.dry_run === 'true';

  function normalize(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'ss');
  }

  // Build a Set of substring variants for a category name:
  //  • Full normalized phrase + plural-stripped forms (min 5 chars)
  //  • For MULTI-word names: also each individual word ≥ 7 chars
  //    The ≥7 threshold blocks generic words ("brake", "pads", "sensor",
  //    "wheel", "fuel", "blades") that would cause false matches like
  //    "Brake Pads" leaking onto "Brake Booster" via the word "brake".
  //  • Single-word category names keep their full-stem chain (min 5).
  function buildVariants(name) {
    const variants = new Set();
    const norm = normalize(name);

    function addWithStems(s, minLen) {
      if (s.length >= minLen) variants.add(s);
      for (const e of ['en','er','es','e','n','s']) {
        if (s.endsWith(e) && s.length - e.length >= minLen) {
          variants.add(s.substring(0, s.length - e.length));
        }
      }
    }

    // Full phrase (and plural strips) — min 5 chars
    addWithStems(norm, 5);

    // Individual words only for multi-word names — min 7 chars
    const words = norm.split(/[^a-z0-9]+/).filter(Boolean);
    if (words.length > 1) {
      for (const w of words) addWithStems(w, 7);
    }
    return Array.from(variants);
  }

  try {
    // ── 1. Load every category + every translation it has
    const catRows = await query(`
      SELECT c.id, c.parent_id, t.lang, t.name
      FROM categories c
      LEFT JOIN category_translations t ON t.category_id = c.id
      WHERE c.active = true
    `);

    // matchers: one entry per category, holding ALL search variants
    // across ALL languages it has translations in
    const byCat = {};
    for (const r of catRows.rows) {
      if (!r.name) continue;
      const variants = buildVariants(r.name);
      if (!variants.length) continue;
      if (!byCat[r.id]) {
        byCat[r.id] = {
          cat_id: r.id,
          is_sub: r.parent_id != null,
          variants: new Set(),
          name_orig: r.name
        };
      }
      for (const v of variants) byCat[r.id].variants.add(v);
    }
    const matchers = Object.values(byCat).map(m => {
      const arr = Array.from(m.variants);
      const maxLen = arr.reduce((mx, v) => Math.max(mx, v.length), 0);
      return {
        cat_id: m.cat_id,
        is_sub: m.is_sub,
        variants: arr,
        name_orig: m.name_orig,
        priority: (m.is_sub ? 100000 : 0) + maxLen
      };
    });
    // Higher priority first: subs beat mains, longer-variant names beat shorter
    matchers.sort((a, b) => b.priority - a.priority);

    // ── 2. Orphaned products — aggregate searchable text from
    //    product_translations.title (all langs) + brand + model + oem
    const prodRows = await query(`
      SELECT p.id,
             p.brand, p.model, p.oem,
             COALESCE(
               (SELECT string_agg(pt.title, ' ' ORDER BY pt.lang)
                FROM product_translations pt WHERE pt.product_id = p.id),
               ''
             ) AS all_titles
      FROM products p
      WHERE p.category_id IS NULL AND COALESCE(p.active, true) = true
    `);

    let matchedCount = 0;
    const byCategory = {};
    const examples = [];
    const unmatchedSamples = [];

    for (const p of prodRows.rows) {
      const haystackRaw = [p.all_titles, p.brand, p.model, p.oem].filter(Boolean).join(' ');
      const haystack = normalize(haystackRaw);
      const displayTitle = (p.all_titles || '').split(' ').slice(0, 8).join(' ') ||
                           [p.brand, p.model, p.oem].filter(Boolean).join(' ') ||
                           ('#' + p.id);

      let hit = null;
      let hitVariant = null;
      for (const m of matchers) {
        for (const v of m.variants) {
          if (haystack.indexOf(v) !== -1) {
            hit = m;
            hitVariant = v;
            break;
          }
        }
        if (hit) break;
      }

      if (hit) {
        if (!dryRun) {
          await query('UPDATE products SET category_id = $1 WHERE id = $2', [hit.cat_id, p.id]);
        }
        matchedCount++;
        byCategory[hit.cat_id] = (byCategory[hit.cat_id] || 0) + 1;
        if (examples.length < 15) {
          examples.push({
            product_id: p.id,
            title: displayTitle,
            matched_via: hitVariant,
            category: hit.name_orig,
            category_id: hit.cat_id
          });
        }
      } else if (unmatchedSamples.length < 10) {
        unmatchedSamples.push({ product_id: p.id, title: displayTitle });
      }
    }

    res.json({
      ok: true,
      dry_run: dryRun,
      total_orphaned: prodRows.rows.length,
      matched: matchedCount,
      unmatched: prodRows.rows.length - matchedCount,
      categories_touched: Object.keys(byCategory).length,
      matches_per_category: byCategory,
      examples,
      unmatched_samples: unmatchedSamples
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});


// ════════════════════════════════════════════════════════════════════
// CATEGORY TREE ENDPOINT (public)
// Returns full hierarchy in one call — used by megamenu & shop sidebar
// GET /api/categories/tree?lang=de
// ════════════════════════════════════════════════════════════════════
app.get('/api/categories/tree', async (req, res) => {
  try {
    const lang = (req.query.lang || 'en').toLowerCase().slice(0, 5);
    const r = await query(`
      SELECT c.id, c.slug, c.icon_url, c.sort_order, c.parent_id,
             COALESCE(t.name, t_en.name, c.slug) AS name
      FROM categories c
      LEFT JOIN category_translations t    ON t.category_id    = c.id AND t.lang    = $1
      LEFT JOIN category_translations t_en ON t_en.category_id = c.id AND t_en.lang = 'en'
      WHERE c.active = TRUE
      ORDER BY c.sort_order ASC NULLS LAST, c.id ASC
    `, [lang]);

    const all   = r.rows;
    const mains = all.filter(c => !c.parent_id);
    const subs  = all.filter(c =>  c.parent_id);

    const tree = mains.map(m => ({
      id: m.id,
      slug: m.slug,
      icon: m.icon_url || '📁',
      name: m.name,
      sort_order: m.sort_order,
      subs: subs
        .filter(s => String(s.parent_id) === String(m.id))
        .map(s => ({
          id: s.id,
          slug: s.slug,
          icon: s.icon_url || '▸',
          name: s.name,
          sort_order: s.sort_order
        }))
    }));

    res.json({ ok: true, tree, total_main: mains.length, total_sub: subs.length });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});


// ════════════════════════════════════════════════════════════════════
// ADMIN CATEGORIES FULL — with product counts (for admin dashboard)
// GET /api/admin/categories/full?lang=de
// ════════════════════════════════════════════════════════════════════
app.get('/api/admin/categories/full', requireAdmin, async (req, res) => {
  try {
    const lang = (req.query.lang || 'de').toLowerCase().slice(0, 5);
    const r = await query(`
      SELECT c.id, c.slug, c.icon_url, c.sort_order, c.parent_id, c.active,
             COALESCE(t.name,    t_en.name, c.slug) AS name,
             COALESCE(t_de.name, t_en.name, c.slug) AS name_de,
             COALESCE(t_en.name,            c.slug) AS name_en,
             (SELECT COUNT(*)::int FROM products p WHERE p.category_id = c.id AND p.active = TRUE AND COALESCE(p.review_status, 'approved') = 'approved') AS product_count
      FROM categories c
      LEFT JOIN category_translations t    ON t.category_id    = c.id AND t.lang    = $1
      LEFT JOIN category_translations t_de ON t_de.category_id = c.id AND t_de.lang = 'de'
      LEFT JOIN category_translations t_en ON t_en.category_id = c.id AND t_en.lang = 'en'
      ORDER BY c.sort_order ASC NULLS LAST, c.id ASC
    `, [lang]);

    res.json({ ok: true, categories: r.rows, total: r.rows.length });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});


app.get('/api/admin/table-columns', async (req, res) => {
  const table = (req.query.table || '').replace(/[^a-z_]/gi, '');
  if (!table) return res.status(400).json({ error: 'table parameter required' });
  try {
    const result = await query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `, [table]);
    res.json({ table, columns: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/db-info', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });
  try {
    const tables = await query(`
      SELECT table_name,
             (SELECT COUNT(*) FROM information_schema.columns
              WHERE table_schema='public' AND table_name=t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public' ORDER BY table_name
    `);
    const tableStats = await Promise.all(tables.rows.map(async (t) => {
      try {
        const c = await query(`SELECT COUNT(*) as c FROM "${t.table_name}"`);
        return { table_name: t.table_name, columns: parseInt(t.column_count, 10), rows: parseInt(c.rows[0].c, 10) };
      } catch {
        return { table_name: t.table_name, columns: parseInt(t.column_count, 10), rows: null };
      }
    }));
    res.json({ ok: true, table_count: tableStats.length, tables: tableStats });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ============================================================
   AUTH (Postgres + bcrypt + JWT) - Etappe 3.4
   ============================================================ */
const setRefreshCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true, secure: true, sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, domain: '.afcarparts.com',
  });
};
const clearRefreshCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true, secure: true, sameSite: 'none', domain: '.afcarparts.com',
  });
};

app.post('/api/auth/register', RL_REGISTER, async (req, res) => {
  try {
    // Haendler registrieren sich NUR ueber /api/auth/register-seller (mit Firmendaten,
    // Haendler-AGB und Pruefung). Hier entsteht immer ein Kundenkonto.
    const user = await userDb.registerUser({ ...(req.body || {}), role: 'customer' });
    const accessToken = signAccessToken(user);
    const refreshToken = await userDb.createRefreshToken(user.id, {
      userAgent: req.headers['user-agent'], ip: req.ip,
    });
    setRefreshCookie(res, refreshToken);
    res.json({ user, accessToken, token: accessToken });
  } catch (err) {
    const map = { email_password_required: 400, password_too_short: 400, invalid_role: 400, email_already_exists: 409 };
    res.status(map[err.message] || 500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   HAENDLER-REGISTRIERUNG (mobile.de-Style)
   POST /api/auth/register-seller
   Legt in EINEM Schritt an: User (role=seller) + Shop (active=FALSE).
   Der Shop erscheint sofort in der Admin-Haendler-Verwaltung und
   kann dort ueber "Freigeben" aktiviert werden.
   Migration einmal aufrufen:
   GET /api/migrate-seller-reg?secret=MIGRATION_SECRET
   ------------------------------------------------------------ */
app.get('/api/migrate-seller-reg', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });
  const log = [];
  try {
    await query(`ALTER TABLE shops ADD COLUMN IF NOT EXISTS plan_choice TEXT`);
    log.push('shops.plan_choice ok');
    await query(`ALTER TABLE shops ADD COLUMN IF NOT EXISTS contact_name TEXT`);
    log.push('shops.contact_name ok');
    res.json({ ok: true, log });
  } catch (err) {
    console.error('[migrate-seller-reg]', err.message);
    res.status(500).json({ ok: false, log, error: err.message });
  }
});

app.post('/api/auth/register-seller', RL_REGISTER, async (req, res) => {
  const b = req.body || {};
  const company = String(b.company || '').trim();
  const country = String(b.country || '').trim().toUpperCase();
  const city = String(b.city || '').trim();
  const taxNumber = String(b.tax_number || '').trim();
  const planRaw = String(b.plan_choice || '').toLowerCase();
  const planChoice = (planRaw === 'basic' || planRaw === 'pro') ? planRaw : null;

  if (!company) return res.status(400).json({ error: 'company_required' });
  if (!country) return res.status(400).json({ error: 'country_required' });
  if (!city) return res.status(400).json({ error: 'city_required' });
  if (!b.terms_accepted) return res.status(400).json({ error: 'terms_required' });

  try {
    const user = await userDb.registerUser({
      name: b.name, email: b.email, phone: b.phone,
      country: country, password: b.password, role: 'seller'
    });

    // Shop direkt anlegen - INAKTIV, bis der Admin ihn in der
    // Haendler-Verwaltung freigibt ("Freigeben"-Button)
    const shopId = await createPendingShop(user.id, { company, country, city, taxNumber, planChoice, email: b.email, phone: b.phone, name: b.name });

    mailer.notifySellerRegistered({
      userId: user.id, email: user.email || b.email, name: b.name, company,
      country, city, plan: planChoice,
    }); // wirft nie

    const accessToken = signAccessToken(user);
    const refreshToken = await userDb.createRefreshToken(user.id, {
      userAgent: req.headers['user-agent'], ip: req.ip,
    });
    setRefreshCookie(res, refreshToken);
    res.json({ user, accessToken, token: accessToken, shop_id: shopId, shop_pending: true });
  } catch (err) {
    const map = { email_password_required: 400, password_too_short: 400, invalid_role: 400, email_already_exists: 409 };
    res.status(map[err.message] || 500).json({ error: err.message });
  }
});

// Legt einen INAKTIVEN Shop fuer einen Haendler an (Freigabe durch Admin).
async function createPendingShop(userId, d) {
  let shopId = null;
  const company = d.company, country = d.country, city = d.city;
  try {
    const user = { id: userId };
    const b = { email: d.email, phone: d.phone, name: d.name };
    const taxNumber = d.taxNumber, planChoice = d.planChoice;
    {
      let finalSlug = makeSlug(company) || ('shop-' + user.id);
      const clash = await query('SELECT 1 FROM shops WHERE slug = $1', [finalSlug]);
      if (clash.rows.length) finalSlug = finalSlug + '-' + user.id;

      const baseFields = {
        owner_id: user.id, slug: finalSlug, name: company,
        country: country || null, city: city || null,
        email: String(b.email || '').trim() || null,
        phone: String(b.phone || '').trim() || null,
        tax_number: taxNumber || null,
        is_china: country === 'CN' || country === 'HK',
        active: false
      };
      try {
        const newShop = await db.insert('shops', {
          ...baseFields,
          contact_name: String(b.name || '').trim() || null,
          plan_choice: planChoice
        });
        shopId = newShop.id;
      } catch (colErr) {
        // Migration /api/migrate-seller-reg noch nicht gelaufen -> ohne neue Spalten anlegen
        if (/plan_choice|contact_name/.test(colErr.message || '')) {
          const newShop = await db.insert('shops', baseFields);
          shopId = newShop.id;
          console.warn('[register-seller] plan_choice/contact_name fehlen - bitte /api/migrate-seller-reg ausfuehren');
        } else {
          throw colErr;
        }
      }
    }
  } catch (shopErr) {
    console.error('[register-seller] shop insert failed:', shopErr.message);
  }
  return shopId;
}

/* ------------------------------------------------------------
   KUNDENKONTO -> HAENDLERKONTO  (POST /api/auth/upgrade-to-seller)
   Wer sich versehentlich als Kunde registriert hat, braucht kein
   zweites Konto: Firmendaten + Haendler-AGB -> Rolle "dealer",
   Shop wird INAKTIV angelegt und vom Admin freigegeben.
   ------------------------------------------------------------ */
app.post('/api/auth/upgrade-to-seller', requireAuth, RL_REGISTER, async (req, res) => {
  const b = req.body || {};
  const company = String(b.company || '').trim();
  const country = String(b.country || '').trim().toUpperCase();
  const city = String(b.city || '').trim();
  const phone = String(b.phone || '').trim();
  const taxNumber = String(b.tax_number || '').trim();
  const planRaw = String(b.plan_choice || '').toLowerCase();
  const planChoice = (planRaw === 'basic' || planRaw === 'pro') ? planRaw : null;
  if (!company) return res.status(400).json({ error: 'company_required' });
  if (!country) return res.status(400).json({ error: 'country_required' });
  if (!city) return res.status(400).json({ error: 'city_required' });
  if (!phone) return res.status(400).json({ error: 'phone_required' });
  if (!b.terms_accepted) return res.status(400).json({ error: 'terms_required' });
  try {
    const u = await query('SELECT id, email, name, role FROM users WHERE id = $1', [req.user.id]);
    const user = u.rows[0];
    if (!user) return res.status(404).json({ error: 'user_not_found' });
    if (user.role === 'admin') return res.status(400).json({ error: 'admin_cannot_upgrade' });
    if (user.role === 'dealer' || user.role === 'seller') return res.status(409).json({ error: 'already_seller' });

    const name = String(b.name || user.name || '').trim() || null;
    await query(`UPDATE users SET role = 'dealer', name = COALESCE($2, name), phone = COALESCE(NULLIF($3, ''), phone), country = COALESCE(NULLIF($4, ''), country) WHERE id = $1`,
      [user.id, name, phone, country]);

    const has = await query('SELECT id FROM shops WHERE owner_id = $1 LIMIT 1', [user.id]);
    const shopId = has.rows.length ? has.rows[0].id
      : await createPendingShop(user.id, { company, country, city, taxNumber, planChoice, email: user.email, phone, name });

    mailer.notifySellerRegistered({ userId: user.id, email: user.email, name, company, country, city, plan: planChoice }); // wirft nie

    const fresh = { id: user.id, email: user.email, name: name || user.name, role: 'dealer' };
    const accessToken = signAccessToken(fresh);
    res.json({ user: fresh, accessToken, token: accessToken, shop_id: shopId, shop_pending: true, upgraded: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', RL_LOGIN, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await userDb.loginUser({ email, password, ip: req.ip });
    const accessToken = signAccessToken(user);
    const refreshToken = await userDb.createRefreshToken(user.id, {
      userAgent: req.headers['user-agent'], ip: req.ip,
    });
    setRefreshCookie(res, refreshToken);
    res.json({ user, accessToken, token: accessToken });
  } catch (err) {
    const map = { email_password_required: 400, invalid_credentials: 401, account_locked: 423 };
    res.status(map[err.message] || 500).json({ error: err.message });
  }
});

app.post('/api/auth/refresh', async (req, res) => {
  const result = await userDb.validateRefreshToken(req.cookies?.refreshToken);
  if (!result) return res.status(401).json({ error: 'invalid_refresh_token' });
  const accessToken = signAccessToken({
    id: result.user_id, email: result.email, role: result.role, name: result.name,
  });
  res.json({ accessToken, token: accessToken });
});

app.post('/api/auth/logout', async (req, res) => {
  await userDb.revokeRefreshToken(req.cookies?.refreshToken);
  clearRefreshCookie(res);
  res.json({ ok: true });
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = await userDb.getUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'user_not_found' });
  res.json({ user });
});

app.post('/api/auth/change-password', requireAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body || {};
    await userDb.changePassword(req.user.id, oldPassword, newPassword);
    clearRefreshCookie(res);
    res.json({ ok: true });
  } catch (err) {
    const map = { password_too_short: 400, invalid_credentials: 401, user_not_found: 404 };
    res.status(map[err.message] || 500).json({ error: err.message });
  }
});

app.post('/api/auth/request-password-reset', RL_RESET, async (req, res) => {
  // Antwort ist IMMER ok - verraet nicht, ob die E-Mail registriert ist.
  try {
    const email = String(req.body?.email || '').trim();
    const token = email ? await userDb.requestPasswordReset(email) : null;
    if (token) {
      mailer.sendPasswordReset({ email, token, lang: req.body?.lang })
        .catch((e) => console.error('[PASSWORD_RESET] Mail', e.message));
    }
  } catch (err) {
    console.error('[PASSWORD_RESET]', err.message);
  }
  res.json({ ok: true });
});

app.post('/api/auth/reset-password', RL_RESET, async (req, res) => {
  try {
    const { token, newPassword } = req.body || {};
    await userDb.resetPassword(token, newPassword);
    res.json({ ok: true });
  } catch (err) {
    const map = { password_too_short: 400, invalid_or_expired_token: 400 };
    res.status(map[err.message] || 500).json({ error: err.message });
  }
});

app.post('/api/admin/migrate-users', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.headers['x-migration-secret'] !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });
  try {
    const { migrateUsers } = require('./scripts/migrate_users_to_postgres');
    const result = await migrateUsers();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ============================================================
//  PHASE 3c - STRIPE KARTEN-CHECKOUT + SPLIT (Destination Charge)
//  EINFUEGEN bei deinen Routen, z. B. oberhalb von
//  app.get('/api/seed-categories', ...).
//  Nutzt billingDb, payments, query.
//
//  Inkasso per Karte (Visa/Maestro, auch Angola-Kaeufer) ueber Stripe.
//  16% Plattform-Gebuehr (application_fee), Rest atomar an das
//  Stripe-Connect-Konto des Haendlers (transfer_data.destination).
//  Aktuell ein Haendler pro Stripe-Bestellung (Multi-Connect -> spaeter).
// ============================================================

// Karten-Zahlung initialisieren -> Stripe-Checkout-URL
/* ------------------------------------------------------------
   AUSZAHLUNGSZIEL EINES HAENDLERS AUFLOESEN

   Massgeblich ist, wo der Haendler Geld empfangen KANN - nicht, wo er
   wohnt. Ein Haendler in Luanda mit portugiesischer IBAN laeuft ueber
   Stripe Connect, ein Nigerianer ueber Payoneer.

   Rangfolge:
     1. merchants.default_payout_provider, sofern das zugehoerige Konto
        wirklich existiert (gespeicherte Wahl des Haendlers gewinnt)
     2. aktives Stripe-Connect-Konto
     3. hinterlegtes pawaPay-Ziel
     4. hinterlegtes Payoneer-Ziel
     5. nichts -> null (Bestellung wird abgelehnt)

   Rueckgabe: { method, account, collectionMode } oder null
     collectionMode 'connect'  -> Stripe splittet sofort (Destination Charge)
     collectionMode 'platform' -> wir kassieren, Ledger zahlt spaeter aus
   ------------------------------------------------------------ */
async function resolvePayoutTarget(merchantId) {
  const mid = parseInt(merchantId, 10);
  if (!mid) return null;

  const merchant = await billingDb.getMerchantById(mid);
  const stored = merchant ? String(merchant.default_payout_provider || '').toLowerCase() : '';

  const connect  = await billingDb.getProviderAccount(mid, 'stripe',   'connect');
  const pawapay  = await billingDb.getProviderAccount(mid, 'pawapay',  'payee');
  const payoneer = await billingDb.getProviderAccount(mid, 'payoneer', 'payee');

  const connectOk  = !!(connect  && connect.external_id && connect.status === 'active');
  const pawapayOk  = !!(pawapay  && pawapay.external_id);
  const payoneerOk = !!(payoneer && payoneer.external_id);

  const available = {
    stripe:   connectOk  ? { method: 'stripe',   account: connect,  collectionMode: 'connect'  } : null,
    pawapay:  pawapayOk  ? { method: 'pawapay',  account: pawapay,  collectionMode: 'platform' } : null,
    payoneer: payoneerOk ? { method: 'payoneer', account: payoneer, collectionMode: 'platform' } : null,
  };

  if (available[stored]) return available[stored];
  return available.stripe || available.pawapay || available.payoneer || null;
}

// ===== CHECKOUT-ROUTING (Phase C, Stand 08/2026) =====
// Kunde aus einem AKTIVEN pawaPay-Land -> Mobile Money ueber pawaPay.
// Sonst -> Stripe (Karte, Bank, internationale Karten); setzt ein aktives
// Stripe-Connect-Konto des Haendlers voraus.
// Kartenlaender per Entscheidung: Nigeria, Ghana, Angola, Suedafrika.
app.post('/api/checkout/route', async (req, res) => {
  try {
    const { order_id } = req.body || {};
    const order = await billingDb.getOrder(order_id);
    if (!order) return res.status(404).json({ error: 'Bestellung nicht gefunden' });

    const items = await billingDb.listOrderItems(order.id);
    if (!items.length) return res.status(400).json({ error: 'Leere Bestellung' });

    const merchantIds = Array.from(new Set(items.filter(i => i.merchant_id).map(i => String(i.merchant_id))));
    if (!merchantIds.length) return res.status(400).json({ error: 'Kein Haendler in der Bestellung' });
    if (merchantIds.length !== 1) {
      return res.status(400).json({ error: 'Mehrere Haendler in einem Warenkorb werden noch nicht unterstuetzt' });
    }

    // Kundenland aus der Lieferadresse
    const addr = order.address || {};
    const buyerCountry = String(addr.country || '').toUpperCase();

    const mid = parseInt(merchantIds[0], 10);

    // Auszahlungsziel EINMAL aufloesen - unabhaengig davon, wie kassiert wird.
    const target = await resolvePayoutTarget(mid);
    if (!target) {
      return res.status(400).json({
        error: 'Haendler #' + mid + ' hat kein aktives Auszahlungskonto',
        merchant_id: mid,
      });
    }

    const PawaPay = require('./paymentProviders/pawapay');
    if (process.env.PAWAPAY_API_TOKEN && PawaPay.isCollectSupported(buyerCountry)) {
      // Mobile Money: Plattform kassiert, Ledger schreibt dem Haendler gut.
      return res.json({
        provider: 'pawapay',
        country: buyerCountry,
        payout_method: target.method,
      });
    }

    // Karte ueber Stripe. Der Unterschied liegt NICHT am Kundenland, sondern
    // am Auszahlungsziel des Haendlers:
    //   Connect vorhanden -> Destination Charge, Stripe splittet sofort
    //   sonst             -> Plattform-Charge, Auszahlung spaeter per
    //                        Payoneer/pawaPay aus dem Ledger
    // Genau hier scheiterten bisher alle Bestellungen bei Haendlern in
    // Nigeria, Ghana, Suedafrika und Angola.
    return res.json({
      provider: 'stripe',
      collection_mode: target.collectionMode,
      payout_method: target.method,
    });
  } catch (err) {
    console.error('[checkout/route]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   PHASE C (2026-08) - pawaPay INKASSO (Mobile Money, Afrika)
   Ablauf:
     1. /api/checkout/pawapay/init  -> depositId erzeugen, VORHER in
        payments speichern, dann Payment Page anfordern, Kunde wird
        auf redirectUrl weitergeleitet.
     2. Kunde zahlt auf dem Handy (PIN). pawaPay meldet den Endstatus
        per Callback an /api/pawapay/callback.
     3. Nach der Rueckkehr fragt das Frontend zusaetzlich
        /api/checkout/pawapay/status ab (falls der Callback noch
        unterwegs ist oder verloren ging).
     4. Ein Abgleich-Lauf holt haengende Zahlungen nach.
   Modell: die Plattform kassiert, der Haendler bekommt 84 % als
   Ledger-Gutschrift und wird im Wochen-Batch ausgezahlt.
   ============================================================ */

// Verbucht eine erfolgreiche pawaPay-Zahlung genau einmal.
async function finalizePawapayDeposit(dep) {
  const pay = await query(
    `SELECT * FROM payments WHERE provider = 'pawapay' AND provider_payment_id = $1`,
    [dep.depositId]
  );
  const row = pay.rows[0];
  if (!row) { console.warn('[pawapay] Unbekannte depositId', dep.depositId); return null; }

  const orderId = row.order_id;
  const succeeded = dep.status === 'COMPLETED';

  await billingDb.recordPayment({
    orderId, provider: 'pawapay', providerPaymentId: dep.depositId,
    amount: row.amount, currency: row.currency,
    status: succeeded ? 'succeeded' : (dep.status === 'FAILED' ? 'failed' : 'pending'),
    method: 'mobile_money',
    raw: Object.assign({}, row.raw || {}, {
      pawapay_status: dep.status,
      local_amount: dep.amount, local_currency: dep.currency,
      provider_txn: dep.providerTransactionId,
      failure_code: dep.failureCode, failure_message: dep.failureMessage,
    }),
  });

  if (!succeeded) return { paid: false, orderId, status: dep.status };

  const order = orderId ? await billingDb.getOrder(orderId) : null;
  if (!order) return { paid: true, orderId, status: dep.status };
  // Schon verbucht? Dann nichts doppelt tun.
  if (order.status === 'paid') return { paid: true, orderId, status: dep.status, already: true };

  await billingDb.setOrderStatus(orderId, 'paid');
  await shippingDb.createShipmentsForPaidOrder(orderId).catch((e) => console.error('[shipping]', e.message));
  mailer.notifyOrderPaid(orderId); // wirft nie, idempotent

  const items = await billingDb.listOrderItems(orderId);
  for (const it of items) {
    if (it.product_id) {
      await query(`UPDATE products SET stock = GREATEST(COALESCE(stock,0) - $2, 0) WHERE id = $1`,
        [it.product_id, it.qty || 1]);
    }
  }

  // Haendleranteil als Ledger-Gutschrift (Auszahlung erfolgt im Wochen-Batch)
  const byMerchant = {};
  for (const it of items) {
    if (it.merchant_id) byMerchant[it.merchant_id] = (byMerchant[it.merchant_id] || 0) + (Number(it.payout_amount) || 0);
  }
  for (const mid of Object.keys(byMerchant)) {
    await ledgerEntry({
      merchantId: parseInt(mid, 10), orderId, kind: 'sale_credit',
      amount: byMerchant[mid], currency: order.currency || 'USD',
      note: 'Verkauf via pawaPay (Deposit ' + dep.depositId + ')',
    });
  }
  console.log('[pawapay] Bestellung', orderId, 'bezahlt; Ledger gutgeschrieben');
  return { paid: true, orderId, status: dep.status };
}

// --- 1) Zahlung starten -> Payment-Page-URL ---
app.post('/api/checkout/pawapay/init', async (req, res) => {
  try {
    const { order_id, phone } = req.body || {};
    const order = await billingDb.getOrder(order_id);
    if (!order) return res.status(404).json({ error: 'Bestellung nicht gefunden' });
    if (order.status === 'paid') return res.status(400).json({ error: 'Bestellung bereits bezahlt' });

    const items = await billingDb.listOrderItems(order.id);
    if (!items.length) return res.status(400).json({ error: 'Leere Bestellung' });

    const addr = order.address || {};
    const country = String(addr.country || '').toUpperCase();

    const PawaPay = require('./paymentProviders/pawapay');
    if (!PawaPay.isCollectSupported(country)) {
      return res.status(400).json({ error: 'Mobile Money ist fuer dieses Land nicht verfuegbar' });
    }

    const pawapay = payments.getProvider('pawapay');
    const depositId = PawaPay.newId();
    const base = process.env.PUBLIC_BASE_URL || 'https://afcarparts.com';

    // WICHTIG: depositId VOR dem API-Aufruf speichern, damit die Zahlung
    // auch bei Netzwerkabbruch zuordenbar bleibt.
    await billingDb.recordPayment({
      orderId: order.id, provider: 'pawapay', providerPaymentId: depositId,
      amount: order.total, currency: order.currency || 'USD',
      status: 'pending', method: 'mobile_money',
      raw: { country, initiated_at: new Date().toISOString() },
    });

    let page;
    try {
      page = await pawapay.createPaymentPage({
        depositId,
        amountUsd: order.total,
        countryIso2: country,
        returnUrl: base + '/?pawapay_deposit=' + depositId,
        reason: 'AFCARPARTS order ' + order.id,
        phoneNumber: phone || addr.phone || undefined,
        language: (getLang(req) || 'en').toUpperCase() === 'FR' ? 'FR' : 'EN',
        metadata: { orderId: String(order.id) },
      });
    } catch (e) {
      await billingDb.recordPayment({
        orderId: order.id, provider: 'pawapay', providerPaymentId: depositId,
        amount: order.total, currency: order.currency || 'USD',
        status: 'failed', method: 'mobile_money',
        raw: { country, error: e.message, failure_code: e.failureCode || null },
      });
      console.error('[checkout/pawapay/init]', e.message);
      return res.status(400).json({ error: e.message, failure_code: e.failureCode || null });
    }

    // Umgerechneten Betrag mitschreiben (fuer Support & Abgleich)
    await billingDb.recordPayment({
      orderId: order.id, provider: 'pawapay', providerPaymentId: depositId,
      amount: order.total, currency: order.currency || 'USD',
      status: 'pending', method: 'mobile_money',
      raw: {
        country, initiated_at: new Date().toISOString(),
        local_amount: page.amountLocal, local_currency: page.currency, fx_rate: page.rate,
      },
      // zusaetzlich in echte Spalten, damit der Kurs abfragbar ist
      fxRate: page.rate, localAmount: page.amountLocal, localCurrency: page.currency,
    });

    res.json({
      deposit_id: depositId,
      redirect_url: page.redirectUrl,
      local_amount: page.amountLocal,
      local_currency: page.currency,
    });
  } catch (err) {
    console.error('[checkout/pawapay/init]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 2) Callback von pawaPay (Endstatus) ---
// Kein Signaturzwang: die depositId ist von uns vergeben und wird gegen
// die DB geprueft; zusaetzlich wird der Status bei pawaPay nachverifiziert.
//
// Dieselbe URL darf im pawaPay-Dashboard fuer ALLE Callback-Arten
// (Deposits, Checkouts, Refunds, Payouts) eingetragen werden: alles ohne
// depositId wird protokolliert und mit 200 quittiert, damit pawaPay nicht
// endlos erneut zustellt. Payout-Callbacks bekommen in Phase E eine
// echte Verarbeitung.
app.post([
  '/api/pawapay/callback',
  '/api/pawapay/callback/deposits',
  '/api/pawapay/callback/checkouts',
  '/api/pawapay/callback/refunds',
  '/api/pawapay/callback/payouts',
], async (req, res) => {
  try {
    const b = req.body || {};
    const d = b.data || b;
    // Nicht-Deposit-Callbacks (Payout/Refund) freundlich quittieren.
    if (!d.depositId) {
      console.log('[pawapay/callback] Nicht-Deposit-Callback erhalten:',
        JSON.stringify({ payoutId: d.payoutId, refundId: d.refundId, status: d.status }));
      return res.json({ received: true });
    }

    const pawapay = payments.getProvider('pawapay');
    const parsed = pawapay.parseCallback(req.body);

    // Gegen pawaPay verifizieren statt dem Callback-Body blind zu vertrauen.
    let dep = parsed;
    try {
      const check = await pawapay.checkDeposit(parsed.depositId);
      if (check && check.found) dep = check;
    } catch (e) {
      console.warn('[pawapay/callback] Nachpruefung fehlgeschlagen:', e.message);
    }

    const PawaPay = require('./paymentProviders/pawapay');
    if (PawaPay.isFinal(dep.status)) {
      await finalizePawapayDeposit(dep);
    } else {
      console.log('[pawapay/callback] Zwischenstatus', dep.status, 'fuer', dep.depositId);
    }
    // pawaPay erwartet 200, sonst wird erneut zugestellt.
    res.json({ received: true });
  } catch (err) {
    console.error('[pawapay/callback]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- 3) Status abfragen (Frontend nach der Rueckkehr) ---
app.get('/api/checkout/pawapay/status', async (req, res) => {
  try {
    const depositId = req.query.deposit_id;
    if (!depositId) return res.status(400).json({ error: 'deposit_id erforderlich' });

    const pay = await query(
      `SELECT * FROM payments WHERE provider = 'pawapay' AND provider_payment_id = $1`,
      [depositId]
    );
    const row = pay.rows[0];
    if (!row) return res.status(404).json({ error: 'Zahlung nicht gefunden' });

    // Bereits final in unserer DB? Dann direkt antworten.
    if (row.status === 'succeeded') {
      return res.json({ paid: true, pending: false, status: 'COMPLETED', order_id: row.order_id });
    }

    const pawapay = payments.getProvider('pawapay');
    const PawaPay = require('./paymentProviders/pawapay');
    const dep = await pawapay.checkDeposit(depositId);

    // NOT_FOUND heisst: Kunde hat die Zahlseite verlassen, ohne zu zahlen.
    // Erst nach 15 Minuten als endgueltig gescheitert werten.
    if (!dep.found) {
      const ageMin = (Date.now() - new Date(row.created_at).getTime()) / 60000;
      if (ageMin < 15) {
        return res.json({ paid: false, pending: true, status: 'PENDING', order_id: row.order_id });
      }
      await billingDb.recordPayment({
        orderId: row.order_id, provider: 'pawapay', providerPaymentId: depositId,
        amount: row.amount, currency: row.currency, status: 'failed', method: 'mobile_money',
        raw: Object.assign({}, row.raw || {}, { pawapay_status: 'NOT_FOUND', abandoned: true }),
      });
      return res.json({ paid: false, pending: false, status: 'NOT_FOUND', order_id: row.order_id });
    }

    if (PawaPay.isFinal(dep.status)) {
      const r = await finalizePawapayDeposit(dep);
      return res.json({
        paid: !!(r && r.paid), pending: false, status: dep.status,
        order_id: row.order_id,
        failure_code: dep.failureCode || null, failure_message: dep.failureMessage || null,
      });
    }

    res.json({ paid: false, pending: true, status: dep.status, order_id: row.order_id });
  } catch (err) {
    console.error('[checkout/pawapay/status]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* --- 4) Abgleich-Lauf: haengende Zahlungen nachziehen ---
   Faengt verlorene Callbacks ab. Laeuft alle 10 Minuten und prueft
   pawaPay-Zahlungen, die seit ueber 15 Minuten 'pending' sind. */
async function reconcilePawapayDeposits() {
  if (!process.env.PAWAPAY_API_TOKEN) return;
  try {
    const { rows } = await query(
      `SELECT provider_payment_id, order_id, created_at
         FROM payments
        WHERE provider = 'pawapay' AND status = 'pending'
          AND created_at < now() - INTERVAL '15 minutes'
          AND created_at > now() - INTERVAL '7 days'
        ORDER BY created_at ASC LIMIT 50`
    );
    if (!rows.length) return;

    const pawapay = payments.getProvider('pawapay');
    const PawaPay = require('./paymentProviders/pawapay');
    for (const r of rows) {
      try {
        const dep = await pawapay.checkDeposit(r.provider_payment_id);
        if (!dep.found) {
          await query(
            `UPDATE payments SET status = 'failed', updated_at = now()
              WHERE provider = 'pawapay' AND provider_payment_id = $1`,
            [r.provider_payment_id]
          );
        } else if (PawaPay.isFinal(dep.status)) {
          await finalizePawapayDeposit(dep);
        }
        // IN_RECONCILIATION / PROCESSING: naechster Lauf.
      } catch (e) {
        console.error('[pawapay/reconcile]', r.provider_payment_id, e.message);
      }
    }
  } catch (err) {
    console.error('[pawapay/reconcile]', err.message);
  }
}
if (process.env.PAWAPAY_API_TOKEN) {
  setInterval(reconcilePawapayDeposits, 10 * 60 * 1000);
  setTimeout(reconcilePawapayDeposits, 60 * 1000);
}

app.post('/api/checkout/stripe/init', async (req, res) => {
  try {
    const { order_id, email } = req.body || {};
    const order = await billingDb.getOrder(order_id);
    if (!order) return res.status(404).json({ error: 'Bestellung nicht gefunden' });
    if (order.status === 'paid') return res.status(400).json({ error: 'Bestellung bereits bezahlt' });

    const items = await billingDb.listOrderItems(order.id);
    if (!items.length) return res.status(400).json({ error: 'Leere Bestellung' });

    const buyerEmail = email || order.email;
    if (!buyerEmail) return res.status(400).json({ error: 'E-Mail erforderlich' });

    // Ein Haendler pro Stripe-Bestellung (Destination Charge hat genau ein Ziel)
    const merchantIds = Array.from(new Set(items.filter(i => i.merchant_id).map(i => String(i.merchant_id))));
    if (merchantIds.length !== 1) {
      return res.status(400).json({ error: 'Stripe-Checkout unterstuetzt aktuell genau einen Haendler pro Bestellung' });
    }
    const mid = parseInt(merchantIds[0], 10);
    const target = await resolvePayoutTarget(mid);
    if (!target) {
      return res.status(400).json({ error: 'Haendler hat kein hinterlegtes Auszahlungsziel' });
    }

    // Nur bei Connect wird sofort gesplittet. Bei Payoneer/pawaPay kassiert
    // die Plattform den vollen Betrag; der Haendleranteil bleibt im Ledger.
    const destination = target.collectionMode === 'connect' ? target.account.external_id : null;

    const totalCommission = items.reduce((s, i) => s + (Number(i.commission_amount) || 0), 0);
    const amountCents = Math.round(Number(order.total) * 100);
    const feeCents = Math.round(totalCommission * 100);
    const base = process.env.PUBLIC_BASE_URL || 'https://afcarparts.com';
    const stripe = payments.getProvider('stripe');

    const session = await stripe.createOrderCheckout({
      order, email: buyerEmail, amountCents, applicationFeeCents: feeCents,
      destinationAccount: destination, currency: order.currency || 'usd',
      successUrl: base + '/?stripe_session={CHECKOUT_SESSION_ID}',
      cancelUrl: base + '/#cart',
    });

    await billingDb.recordPayment({
      orderId: order.id, provider: 'stripe', providerPaymentId: session.id,
      amount: order.total, currency: order.currency, status: 'pending', method: 'card',
      raw: {
        checkout_url: session.url,
        destination: destination,
        fee_cents: feeCents,
        collection_mode: target.collectionMode,
        payout_method: target.method,
      },
    });

    res.json({ checkout_url: session.url, session_id: session.id });
  } catch (err) {
    console.error('[checkout/stripe/init]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Karten-Zahlung verifizieren (nach Rueckkehr)
app.get('/api/checkout/stripe/verify', async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId) return res.status(400).json({ error: 'session_id erforderlich' });

    const stripe = payments.getProvider('stripe');
    const s = await stripe.retrieveCheckoutSession(sessionId);
    const paid = s.paymentStatus === 'paid';
    const orderId = parseInt((s.metadata && s.metadata.order_id) || '', 10) || null;
    const order = orderId ? await billingDb.getOrder(orderId) : null;

    await billingDb.recordPayment({
      orderId: orderId, provider: 'stripe', providerPaymentId: sessionId,
      amount: (s.amountTotal ? s.amountTotal / 100 : 0), currency: s.currency || 'usd',
      status: paid ? 'succeeded' : 'failed', method: 'card', raw: s,
    });

    if (paid && order && order.status !== 'paid') {
      await billingDb.setOrderStatus(orderId, 'paid');
      await shippingDb.createShipmentsForPaidOrder(orderId).catch((e) => console.error('[shipping]', e.message));
      mailer.notifyOrderPaid(orderId); // wirft nie, idempotent
      const items = await billingDb.listOrderItems(orderId);
      for (const it of items) {
        if (it.product_id) {
          await query(`UPDATE products SET stock = GREATEST(COALESCE(stock,0) - $2, 0) WHERE id = $1`, [it.product_id, it.qty || 1]);
        }
      }
      /* WICHTIG - zwei grundverschiedene Faelle:
         'connect'  -> Stripe hat den Haendleranteil SOFORT transferiert.
                       Der Posten ist wirklich bezahlt.
         'platform' -> Das Geld liegt auf UNSEREM Stripe-Konto. Der Haendler
                       hat noch nichts bekommen. Der Posten MUSS 'pending'
                       bleiben und als Ledger-Gutschrift erfasst werden,
                       sonst verschwindet die Schuld aus der Buchhaltung. */
      const collectionMode = (s.metadata && s.metadata.collection_mode) === 'platform' ? 'platform' : 'connect';

      const byMerchant = {};
      for (const it of items) {
        if (it.merchant_id) byMerchant[it.merchant_id] = (byMerchant[it.merchant_id] || 0) + (Number(it.payout_amount) || 0);
      }

      if (collectionMode === 'platform') {
        for (const mid of Object.keys(byMerchant)) {
          await ledgerEntry({
            merchantId: parseInt(mid, 10), orderId, kind: 'sale_credit',
            amount: byMerchant[mid], currency: order.currency || 'USD',
            note: 'Verkauf via Stripe (Session ' + sessionId + ')',
          });
        }
        // TREUHAND: Geld liegt auf unserem Konto und bleibt dort, bis der
        // Versand nachgewiesen ist (escrow.js gibt es je Sendung frei).
        await query(`UPDATE order_items SET payout_status = 'held' WHERE order_id = $1 AND payout_status = 'pending'`, [orderId]);
        console.log('[stripe] Bestellung', orderId, 'bezahlt; Ledger gutgeschrieben (Plattform-Charge), Haendleranteil gehalten bis Versandnachweis');
        return res.json({ paid: true, order_id: orderId, collection_mode: 'platform' });
      }

      // ACHTUNG - Connect-Modus: Stripe hat den Haendleranteil bereits
      // transferiert. Das Geld ist beim Haendler, BEVOR versendet wurde.
      // Hier greift das Treuhandmodell nicht mehr; der Posten ist echt
      // bezahlt und wird deshalb korrekt als 'paid' gefuehrt.
      // Damit die Auszahlung erst nach Versandnachweis erfolgt, muss der
      // Verkauf im 'platform'-Modus laufen (separate charges and transfers).
      await query(`UPDATE order_items SET payout_status = 'paid' WHERE order_id = $1`, [orderId]);
      console.warn('[escrow] Bestellung', orderId, '- Connect-Modus: Haendleranteil sofort transferiert, keine Treuhand moeglich');

      for (const mid of Object.keys(byMerchant)) {
        await billingDb.recordPayout({
          merchantId: parseInt(mid, 10), orderId, provider: 'stripe',
          providerPayoutId: sessionId + ':' + mid, amount: byMerchant[mid],
          currency: order.currency, status: 'paid', kind: 'auto_split', raw: { via: 'stripe_verify' },
        });
      }
    }

    res.json({ success: paid, paid, order_id: orderId, status: s.paymentStatus });
  } catch (err) {
    console.error('[checkout/stripe/verify]', err.message);
    res.status(500).json({ error: err.message });
  }
});
/* ============================================================
   CATEGORIES
   ============================================================ */
app.get('/api/categories', async (req, res) => {
  try {
    const lang = getLang(req);
    const result = await query(`
      SELECT c.id, c.slug, c.icon_url, c.sort_order,
        COALESCE(t.name, t_en.name, c.slug) AS name, $1::text AS lang
      FROM categories c
      LEFT JOIN category_translations t ON t.category_id = c.id AND t.lang = $1
      LEFT JOIN category_translations t_en ON t_en.category_id = c.id AND t_en.lang = 'en'
      WHERE c.active = TRUE AND (c.parent_id IS NULL)
      ORDER BY c.sort_order ASC, COALESCE(t.name, t_en.name) ASC
    `, [lang]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Subcategories for a given parent
// All categories with parent info for hierarchical select
app.get('/api/categories/all', async (req, res) => {
  const lang = (req.query.lang || 'en').toLowerCase().trim();
  try {
    const result = await query(`
      SELECT c.id, c.slug, c.icon_url, c.sort_order, c.parent_id,
        COALESCE(t.name, t_en.name, c.slug) AS name
      FROM categories c
      LEFT JOIN category_translations t ON t.category_id = c.id AND t.lang = $1
      LEFT JOIN category_translations t_en ON t_en.category_id = c.id AND t_en.lang = 'en'
      WHERE c.active = TRUE
      ORDER BY COALESCE(c.parent_id, c.id), c.sort_order ASC
    `, [lang]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ============================================================
   PHASE A (2026-08) - MIGRATION ZAHLUNGSSYSTEM V2
   Einmal aufrufen: GET /api/migrate-payments-v2?secret=MIGRATION_SECRET
   Idempotent - mehrfach aufrufbar.

   Macht:
   1. Alt-Testdaten bereinigen (Paystack/Flutterwave komplett;
      Stripe-Konten-Referenzen, weil das alte Stripe-Konto verloren
      ist und alle external_ids ungueltig sind)
   2. provider-CHECK auf ('stripe','pawapay','payoneer') umstellen
   3. Internes Ledger anlegen: dealer_balances, ledger_entries,
      payout_batches (+ payouts.batch_id)
   ============================================================ */
app.get('/api/migrate-payments-v2', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];
  try {
    // --- 1) Alt-Testdaten bereinigen -------------------------------
    // Reihenfolge beachten: disputes verweist auf payments.
    const del = async (sql, tag) => {
      const r = await query(sql);
      log.push(tag + ': ' + r.rowCount + ' Zeilen');
    };
    await del(`DELETE FROM disputes WHERE provider IN ('paystack','flutterwave')`, 'disputes alt');
    await del(`DELETE FROM payments WHERE provider IN ('paystack','flutterwave')`, 'payments alt');
    await del(`DELETE FROM payouts  WHERE provider IN ('paystack','flutterwave')`, 'payouts alt');
    await del(`DELETE FROM subscriptions WHERE provider IN ('paystack','flutterwave')`, 'subscriptions alt');
    await del(`DELETE FROM provider_accounts WHERE provider IN ('paystack','flutterwave')`, 'provider_accounts alt');

    // Altes Stripe-Konto verloren -> alle Stripe-Referenzen sind tote IDs.
    // Konten loeschen (Haendler verbinden neu), Abos auf canceled setzen.
    await del(`DELETE FROM provider_accounts WHERE provider = 'stripe'`, 'provider_accounts stripe (alte Konto-IDs)');
    const subs = await query(`UPDATE subscriptions SET status = 'canceled', updated_at = now()
                               WHERE provider = 'stripe' AND status <> 'canceled'`);
    log.push('subscriptions stripe -> canceled: ' + subs.rowCount);

    // --- 2) provider-CHECK neu -------------------------------------
    const allowed = "'stripe','pawapay','payoneer'";
    for (const t of ['provider_accounts', 'subscriptions', 'payments', 'payouts', 'disputes']) {
      await query(`ALTER TABLE ${t} DROP CONSTRAINT IF EXISTS ${t}_provider_check`);
      await query(`ALTER TABLE ${t} ADD CONSTRAINT ${t}_provider_check CHECK (provider IN (${allowed}))`);
      log.push('CHECK neu: ' + t);
    }

    // --- 3) Internes Ledger ----------------------------------------
    const stmts = [
      `CREATE TABLE IF NOT EXISTS dealer_balances (
         id BIGSERIAL PRIMARY KEY,
         merchant_id BIGINT NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
         currency TEXT NOT NULL DEFAULT 'USD',
         balance NUMERIC(14,2) NOT NULL DEFAULT 0,
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (merchant_id, currency)
       )`,
      `CREATE TABLE IF NOT EXISTS payout_batches (
         id BIGSERIAL PRIMARY KEY,
         provider TEXT NOT NULL CHECK (provider IN ('pawapay','payoneer')),
         status TEXT NOT NULL DEFAULT 'draft'
           CHECK (status IN ('draft','processing','paid','failed','partial')),
         currency TEXT NOT NULL DEFAULT 'USD',
         total NUMERIC(14,2) NOT NULL DEFAULT 0,
         note TEXT,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         executed_at TIMESTAMPTZ
       )`,
      `CREATE TABLE IF NOT EXISTS ledger_entries (
         id BIGSERIAL PRIMARY KEY,
         merchant_id BIGINT NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
         order_id BIGINT,
         batch_id BIGINT REFERENCES payout_batches(id),
         kind TEXT NOT NULL
           CHECK (kind IN ('sale_credit','payout_debit','refund_debit','adjustment')),
         amount NUMERIC(14,2) NOT NULL,
         currency TEXT NOT NULL DEFAULT 'USD',
         note TEXT,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
      `ALTER TABLE payouts ADD COLUMN IF NOT EXISTS batch_id BIGINT`,

      /* --- Wechselkurs-Einfrierung ---------------------------------
         fx_rate: Bestellwaehrung -> base_currency, ermittelt beim
         Anlegen der Bestellung und danach unveraenderlich.
         Default 1 macht die Migration rueckwaertskompatibel: bestehende
         USD-Bestellungen behalten damit exakt ihren bisherigen Wert. */
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS base_currency TEXT NOT NULL DEFAULT 'USD'`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS fx_rate NUMERIC(18,8) NOT NULL DEFAULT 1`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS fx_source TEXT DEFAULT 'identity'`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS fx_at TIMESTAMPTZ`,

      // Tatsaechlich beim Inkasso verwendeter Kurs (z. B. USD -> GHS bei pawaPay)
      `ALTER TABLE payments ADD COLUMN IF NOT EXISTS fx_rate NUMERIC(18,8)`,
      `ALTER TABLE payments ADD COLUMN IF NOT EXISTS local_amount NUMERIC(18,4)`,
      `ALTER TABLE payments ADD COLUMN IF NOT EXISTS local_currency TEXT`,

      // Kursprotokoll: ein Eintrag je Waehrungspaar und Tag, fuer Nachweise.
      `CREATE TABLE IF NOT EXISTS fx_rates (
         id BIGSERIAL PRIMARY KEY,
         from_currency TEXT NOT NULL,
         to_currency   TEXT NOT NULL,
         rate NUMERIC(18,8) NOT NULL,
         source TEXT,
         day DATE NOT NULL DEFAULT CURRENT_DATE,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         UNIQUE (from_currency, to_currency, day)
       )`,
      `CREATE INDEX IF NOT EXISTS idx_orders_fx ON orders (base_currency, fx_source)`,
      `CREATE INDEX IF NOT EXISTS idx_ledger_merchant ON ledger_entries (merchant_id, created_at)`,
      `CREATE INDEX IF NOT EXISTS idx_payouts_batch ON payouts (batch_id)`,
    ];
    for (const s of stmts) { await query(s); }
    log.push('Ledger-Tabellen ok (dealer_balances, ledger_entries, payout_batches, payouts.batch_id)');
    log.push('FX ok (orders.fx_rate/base_currency/fx_source/fx_at, payments.fx_rate, Tabelle fx_rates)');

    // Bestandsbestellungen: Kurs 1 ist bereits per DEFAULT gesetzt. Nur die
    // Herkunft nachtragen, damit im Bericht klar ist, dass es Altdaten sind.
    const back = await query(
      `UPDATE orders SET fx_source = 'legacy', fx_at = created_at
        WHERE fx_at IS NULL`
    );
    log.push('Altbestellungen mit fx_source=legacy markiert: ' + back.rowCount);

    res.json({ ok: true, message: 'Zahlungssystem V2 migriert (Paystack raus, Ledger da)', log });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, log });
  }
});

/* ------------------------------------------------------------
   LEDGER-Helfer (ab Phase C fuer Verkaufs-Gutschriften genutzt,
   ab Phase E/F fuer Auszahlungs-Belastungen).
   amount: positiv = Gutschrift, negativ = Belastung.
   ------------------------------------------------------------ */
async function ledgerEntry({ merchantId, orderId = null, batchId = null, kind, amount, currency = 'USD', note = null }) {
  const amt = Number(amount) || 0;
  await query(
    `INSERT INTO ledger_entries (merchant_id, order_id, batch_id, kind, amount, currency, note)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [merchantId, orderId, batchId, kind, amt, currency, note]
  );
  await query(
    `INSERT INTO dealer_balances (merchant_id, currency, balance)
     VALUES ($1, $2, $3)
     ON CONFLICT (merchant_id, currency)
     DO UPDATE SET balance = dealer_balances.balance + EXCLUDED.balance, updated_at = now()`,
    [merchantId, currency, amt]
  );
}

app.get('/api/categories/:id/subs', async (req, res) => {
  const lang = (req.query.lang || 'en').toLowerCase().trim();
  try {
    const result = await query(`
      SELECT c.id, c.slug, c.icon_url, c.sort_order, c.parent_id,
        COALESCE(t.name, t_en.name, c.slug) AS name
      FROM categories c
      LEFT JOIN category_translations t ON t.category_id = c.id AND t.lang = $1
      LEFT JOIN category_translations t_en ON t_en.category_id = c.id AND t_en.lang = 'en'
      WHERE c.active = TRUE AND c.parent_id = $2
      ORDER BY c.sort_order ASC
    `, [lang, req.params.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/admin/categories', requireAdmin, async (req, res) => {
  try {
    const cats = await query(`SELECT * FROM categories ORDER BY sort_order ASC, slug ASC`);
    const trans = await query(`SELECT category_id, lang, name FROM category_translations`);
    const transByCat = {};
    for (const t of trans.rows) {
      if (!transByCat[t.category_id]) transByCat[t.category_id] = {};
      transByCat[t.category_id][t.lang] = t.name;
    }
    const data = cats.rows.map(c => ({ ...c, translations: transByCat[c.id] || {} }));
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/categories', requireAdmin, async (req, res) => {
  const { slug, icon_url, sort_order, translations, parent_id } = req.body || {};
  if (!slug || !slug.trim()) return res.status(400).json({ error: 'Missing slug' });
  try {
    const newCat = await db.insert('categories', {
      slug: makeSlug(slug), icon_url: icon_url || null,
      sort_order: parseInt(sort_order, 10) || 0,
      active: true,
      parent_id: parent_id ? parseInt(parent_id, 10) : null
    });
    if (translations && typeof translations === 'object') {
      for (const lang of SUPPORTED_LANGS) {
        const name = translations[lang];
        if (name && name.trim()) {
          await db.insert('category_translations', { category_id: newCat.id, lang, name: name.trim() });
        }
      }
    }
    res.json({ success: true, category: newCat });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/categories/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { slug, icon_url, sort_order, active, translations, parent_id } = req.body || {};
  try {
    const updates = {};
    if (slug !== undefined) updates.slug = makeSlug(slug);
    if (icon_url !== undefined) updates.icon_url = icon_url || null;
    if (sort_order !== undefined) updates.sort_order = parseInt(sort_order, 10) || 0;
    if (active !== undefined) updates.active = !!active;
    if (parent_id !== undefined) updates.parent_id = parent_id ? parseInt(parent_id, 10) : null;
    if (Object.keys(updates).length > 0) await db.update('categories', id, updates);
    if (translations && typeof translations === 'object') {
      for (const lang of SUPPORTED_LANGS) {
        const name = translations[lang];
        if (name === undefined) continue;
        if (name === null || name === '') {
          await query('DELETE FROM category_translations WHERE category_id = $1 AND lang = $2', [id, lang]);
        } else {
          await query(`
            INSERT INTO category_translations (category_id, lang, name)
            VALUES ($1, $2, $3)
            ON CONFLICT (category_id, lang) DO UPDATE SET name = EXCLUDED.name
          `, [id, lang, name.trim()]);
        }
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/categories/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await db.remove('categories', req.params.id);
    res.json({ success: true, deleted: ok ? 1 : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   TAGS
   ============================================================ */
app.get('/api/tags', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 100;
    const result = await query(
      'SELECT id, slug, usage_count FROM tags WHERE usage_count > 0 ORDER BY usage_count DESC, slug ASC LIMIT $1',
      [Math.min(limit, 500)]
    );
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tags/search', async (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase().trim();
    if (!q) return res.json({ data: [] });
    const result = await query(
      `SELECT id, slug, usage_count FROM tags WHERE slug ILIKE $1
       ORDER BY usage_count DESC, slug ASC LIMIT 20`,
      [q + '%']
    );
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   SHOPS
   ============================================================ */
app.get('/api/shops', async (req, res) => {
  try {
    const lang = getLang(req);
    const { country, china_only, near, page = 1, limit = 24 } = req.query;
    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
    const offset = (pg - 1) * lim;

    // Geo-Erkennung: nur wenn near=1 und kein explizites country gesetzt
    let detectedCountry = null;
    if (near === '1' && !country) {
      detectedCountry = await detectCountry(req);
    }

    // Führt die Shops-Abfrage aus; effectiveCountry = optionaler Länderfilter
    async function runShopsQuery(effectiveCountry) {
      // COUNT-Abfrage: eigene Platzhalter ab $1 (kein lang-Parameter nötig)
      const countConds = ['s.active = TRUE'];
      const countParams = [];
      let ci = 1;
      if (effectiveCountry) { countConds.push(`s.country = $${ci}`); countParams.push(effectiveCountry.toUpperCase()); ci++; }
      if (china_only === '1') countConds.push(`s.is_china = TRUE`);
      const countWhere = 'WHERE ' + countConds.join(' AND ');
      const countRes = await query(`SELECT COUNT(*) AS c FROM shops s ${countWhere}`, countParams);
      const total = parseInt(countRes.rows[0].c, 10);

      // SELECT-Abfrage: $1 = lang (für JOINs), danach Filter
      const conditions = ['s.active = TRUE'];
      const params = [lang];
      let paramIdx = 2;
      if (effectiveCountry) { conditions.push(`s.country = $${paramIdx}`); params.push(effectiveCountry.toUpperCase()); paramIdx++; }
      if (china_only === '1') conditions.push(`s.is_china = TRUE`);
      const where = 'WHERE ' + conditions.join(' AND ');
      params.push(lim, offset);
      const result = await query(`
        SELECT s.id, s.slug, s.name, s.country, s.city, s.email, s.phone,
          s.is_china, s.logo_url, s.created_at,
          COALESCE(t.description, t_en.description, '') AS description
        FROM shops s
        LEFT JOIN shop_translations t ON t.shop_id = s.id AND t.lang = $1
        LEFT JOIN shop_translations t_en ON t_en.shop_id = s.id AND t_en.lang = 'en'
        ${where} ORDER BY s.created_at DESC
        LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
      `, params);
      return { rows: result.rows, total };
    }

    // Explizites country aus der Query gewinnt; sonst ggf. erkanntes Land
    const explicitCountry = country ? country.toUpperCase() : null;
    let countryMatch = false;
    let out = await runShopsQuery(explicitCountry || detectedCountry);

    // Wenn per Geo gefiltert wurde, aber im Land keine Shops existieren:
    // sauber auf die allgemeine Liste zurückfallen (Sektion bleibt gefüllt)
    if (!explicitCountry && detectedCountry) {
      if (out.total > 0) {
        countryMatch = true;
      } else {
        out = await runShopsQuery(null); // Fallback ohne Länderfilter
      }
    } else if (explicitCountry) {
      countryMatch = out.total > 0;
    }

    res.json({
      data: out.rows,
      detected_country: detectedCountry,   // null wenn nicht erkannt
      country_match: countryMatch,         // true = Shops im erkannten/gewählten Land
      pagination: { total: out.total, pages: Math.max(1, Math.ceil(out.total / lim)), page: pg, limit: lim }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/shops/:id', async (req, res) => {
  try {
    const lang = getLang(req);
    const idOrSlug = req.params.id;
    const isNumeric = /^\d+$/.test(idOrSlug);
    const shopRes = await query(`
      SELECT s.*, COALESCE(t.description, t_en.description, '') AS description
      FROM shops s
      LEFT JOIN shop_translations t ON t.shop_id = s.id AND t.lang = $1
      LEFT JOIN shop_translations t_en ON t_en.shop_id = s.id AND t_en.lang = 'en'
      WHERE ${isNumeric ? 's.id = $2' : 's.slug = $2'} LIMIT 1
    `, [lang, isNumeric ? parseInt(idOrSlug, 10) : idOrSlug]);
    if (shopRes.rows.length === 0) return res.status(404).json({ error: 'Shop not found' });
    const shop = shopRes.rows[0];
    const productsRes = await query(`
      SELECT p.id, p.price_usd, p.brand, p.model, p.condition, p.images, p.created_at,
        COALESCE(t.title, t_def.title, '') AS title
      FROM products p
      LEFT JOIN product_translations t ON t.product_id = p.id AND t.lang = $1
      LEFT JOIN product_translations t_def ON t_def.product_id = p.id AND t_def.lang = p.default_lang
      WHERE p.shop_id = $2 AND p.active = TRUE AND COALESCE(p.review_status, 'approved') = 'approved'
      ORDER BY p.created_at DESC LIMIT 50
    `, [lang, shop.id]);
    res.json({ shop, products: productsRes.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/shops', requireAdmin, async (req, res) => {
  try {
    const shops = await query(`
      SELECT s.*,
             m.kyc_status,
             (SELECT COUNT(*) FROM products p WHERE p.seller_id = s.owner_id) AS product_count,
             (SELECT COALESCE(SUM(oi.line_total),0)
                FROM order_items oi JOIN orders o ON o.id = oi.order_id
                WHERE oi.merchant_id = m.id AND o.status IN ('paid','fulfilled')) AS revenue_usd,
             sub.plan AS sub_plan, sub.status AS sub_status, sub.current_period_end AS sub_until
        FROM shops s
        LEFT JOIN merchants m ON m.user_id = s.owner_id
        LEFT JOIN LATERAL (
              SELECT plan, status, current_period_end FROM subscriptions su
               WHERE su.merchant_id = m.id
               ORDER BY (status = 'active') DESC, created_at DESC LIMIT 1
            ) sub ON true
       ORDER BY s.created_at DESC
    `);
    const trans = await query(`SELECT shop_id, lang, description FROM shop_translations`);
    const transByShop = {};
    for (const t of trans.rows) {
      if (!transByShop[t.shop_id]) transByShop[t.shop_id] = {};
      transByShop[t.shop_id][t.lang] = t.description;
    }
    const data = shops.rows.map(s => ({ ...s, translations: transByShop[s.id] || {} }));
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/shops', requireAdmin, async (req, res) => {
  const { name, slug, owner_id, country, city, email, phone, is_china, logo_url, tax_number, translations } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: 'Missing shop name' });
  try {
    const finalSlug = slug ? makeSlug(slug) : makeSlug(name);
    const newShop = await db.insert('shops', {
      owner_id: owner_id ? parseInt(owner_id, 10) : null,
      slug: finalSlug, name: name.trim(),
      country: country ? country.toUpperCase() : null,
      city: city ? city.trim() : null,
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      is_china: !!is_china, logo_url: logo_url || null, tax_number: tax_number ? tax_number.trim() : null, active: true
    });
    if (translations && typeof translations === 'object') {
      for (const lang of SUPPORTED_LANGS) {
        const desc = translations[lang];
        if (desc && desc.trim()) {
          await db.insert('shop_translations', { shop_id: newShop.id, lang, description: desc.trim() });
        }
      }
    }
    res.json({ success: true, shop: newShop });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/shops/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { name, slug, owner_id, country, city, email, phone, is_china, logo_url, active, tax_number, translations } = req.body || {};
  try {
    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (slug !== undefined) updates.slug = makeSlug(slug);
    if (owner_id !== undefined) updates.owner_id = owner_id ? parseInt(owner_id, 10) : null;
    if (country !== undefined) updates.country = country ? country.toUpperCase() : null;
    if (city !== undefined) updates.city = city ? city.trim() : null;
    if (email !== undefined) updates.email = email ? email.trim() : null;
    if (phone !== undefined) updates.phone = phone ? phone.trim() : null;
    if (is_china !== undefined) updates.is_china = !!is_china;
    if (logo_url !== undefined) updates.logo_url = logo_url || null;
    if (tax_number !== undefined) updates.tax_number = tax_number ? tax_number.trim() : null;
    if (active !== undefined) updates.active = !!active;
    // Vorher-Zustand merken: Freigabe-Mail nur beim Wechsel inaktiv -> aktiv
    let wasActive = null;
    if (updates.active === true) {
      const prev = await query('SELECT active FROM shops WHERE id = $1', [id]).catch(() => ({ rows: [] }));
      wasActive = prev.rows[0] ? !!prev.rows[0].active : null;
    }
    if (Object.keys(updates).length > 0) await db.update('shops', id, updates);
    if (updates.active === true && wasActive === false) mailer.notifyShopApproved(id); // wirft nie
    if (translations && typeof translations === 'object') {
      for (const lang of SUPPORTED_LANGS) {
        const desc = translations[lang];
        if (desc === undefined) continue;
        if (desc === null || desc === '') {
          await query('DELETE FROM shop_translations WHERE shop_id = $1 AND lang = $2', [id, lang]);
        } else {
          await query(`
            INSERT INTO shop_translations (shop_id, lang, description)
            VALUES ($1, $2, $3)
            ON CONFLICT (shop_id, lang) DO UPDATE SET description = EXCLUDED.description
          `, [id, lang, desc.trim()]);
        }
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/shops/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await db.remove('shops', req.params.id);
    res.json({ success: true, deleted: ok ? 1 : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   PRODUCTS (public + admin)
   ============================================================ */
app.get('/api/products', async (req, res) => {
  try {
    const lang = getLang(req);
    const { q, category_id, condition, brand, model, oem, min_price, max_price,
      china_only, tags, shop_id, car_brand, car_model, sort = 'newest', page = 1, limit = 24 } = req.query;
    const conditions = ['p.active = TRUE', "COALESCE(p.review_status, 'approved') = 'approved'"];
    const params = [lang];
    let i = 2;
    if (category_id) {
      // Include products from this category OR any of its subcategories
      conditions.push(`(p.category_id = $${i} OR p.category_id IN (SELECT id FROM categories WHERE parent_id = $${i}))`);
      params.push(parseInt(category_id, 10)); i++;
    }
    if (shop_id) { conditions.push(`p.shop_id = $${i++}`); params.push(parseInt(shop_id, 10)); }
    if (condition) { conditions.push(`p.condition = $${i++}`); params.push(condition); }
    if (brand) { conditions.push(`p.brand ILIKE $${i++}`); params.push('%' + brand + '%'); }
    if (model) { conditions.push(`p.model ILIKE $${i++}`); params.push('%' + model + '%'); }
    if (oem) { conditions.push(`p.oem = $${i++}`); params.push(oem.trim()); }
    if (min_price) { conditions.push(`p.price_usd >= $${i++}`); params.push(parseFloat(min_price)); }
    if (max_price) { conditions.push(`p.price_usd <= $${i++}`); params.push(parseFloat(max_price)); }
    if (china_only === '1') conditions.push(`p.is_china_seller = TRUE`);
    if (req.query.wholesale === '1') conditions.push(`p.sale_mode IN ('wholesale','both')`);
    // Fahrzeug-Filter (Variante A): matcht gegen fits_vehicles ODER Titel/Beschreibung/Marke/Modell
    if (car_brand && String(car_brand).trim()) {
      conditions.push(`(
        p.fits_vehicles ILIKE $${i} OR p.brand ILIKE $${i} OR p.model ILIKE $${i} OR
        p.id IN (SELECT pt.product_id FROM product_translations pt WHERE pt.title ILIKE $${i} OR pt.description ILIKE $${i})
      )`);
      params.push('%' + String(car_brand).trim() + '%'); i++;
    }
    if (car_model && String(car_model).trim()) {
      conditions.push(`(
        p.fits_vehicles ILIKE $${i} OR p.model ILIKE $${i} OR
        p.id IN (SELECT pt.product_id FROM product_translations pt WHERE pt.title ILIKE $${i} OR pt.description ILIKE $${i})
      )`);
      params.push('%' + String(car_model).trim() + '%'); i++;
    }
    if (tags) {
      const tagSlugs = String(tags).split(',').map(t => makeSlug(t)).filter(Boolean);
      if (tagSlugs.length > 0) {
        conditions.push(`p.id IN (
          SELECT pt.product_id FROM product_tags pt
          JOIN tags t ON t.id = pt.tag_id
          WHERE t.slug = ANY($${i}::text[])
          GROUP BY pt.product_id HAVING COUNT(DISTINCT t.slug) = $${i + 1}
        )`);
        params.push(tagSlugs, tagSlugs.length);
        i += 2;
      }
    }
    if (q && q.trim()) {
      conditions.push(`(
        p.brand ILIKE $${i} OR
        p.model ILIKE $${i} OR
        p.oem   ILIKE $${i} OR
        p.id IN (
          SELECT pt.product_id FROM product_translations pt
          WHERE pt.title ILIKE $${i} OR pt.description ILIKE $${i}
        )
      )`);
      params.push('%' + q.trim() + '%');
      i++;
    }
    const where = 'WHERE ' + conditions.join(' AND ');
    let orderBy = 'p.created_at DESC';
    if (sort === 'price_asc') orderBy = 'p.price_usd ASC';
    else if (sort === 'price_desc') orderBy = 'p.price_usd DESC';
    else if (sort === 'popular') orderBy = 'p.view_count DESC, p.created_at DESC';
    else if (sort === 'boost') {
      // Bestseller-Boost-Score = Verkäufe (stark) + Klicks + Recency-Bonus für neue Teile.
      // Gewichte frei justierbar:
      const W_SALES = 10;       // Punkte pro verkaufter Einheit
      const W_VIEWS = 1;        // Punkte pro Produktaufruf (view_count)
      const RECENCY_DAYS = 14;  // so viele Tage bekommen neue Produkte einen Bonus
      const W_RECENCY = 3;      // Bonus-Stärke pro verbleibendem Tag (Start: 14*3 = 42 Punkte ≈ 4 Verkäufe)
      orderBy = `(
        COALESCE((SELECT SUM(oi.qty) FROM order_items oi
                  JOIN orders o ON o.id = oi.order_id
                  WHERE oi.product_id = p.id
                    AND o.status IN ('paid','fulfilled')), 0) * ${W_SALES}
        + COALESCE(p.view_count, 0) * ${W_VIEWS}
        + GREATEST(0, ${RECENCY_DAYS} - EXTRACT(EPOCH FROM (now() - p.created_at)) / 86400.0) * ${W_RECENCY}
      ) DESC, p.created_at DESC`;
    }
    // COUNT-Query nutzt params.slice(1) (ohne lang) — daher Platzhalter $2→$1, $3→$2 etc. umnummerieren
    const countWhere = where.replace(/\$(\d+)/g, (_, n) => '$' + (parseInt(n, 10) - 1));
    const countRes = await query(`SELECT COUNT(*) AS c FROM products p ${countWhere}`, params.slice(1));
    const total = parseInt(countRes.rows[0].c, 10);
    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
    const offset = (pg - 1) * lim;
    params.push(lim, offset);
    const result = await query(`
      SELECT p.id, p.price_usd, p.brand, p.model, p.oem, p.sku, p.ean, p.condition,
        p.category_id, p.shop_id, p.images, p.stock, p.is_china_seller,
        p.sale_mode, p.price_tiers,
        p.default_lang, p.created_at,
        COALESCE(t.title, t_def.title, '') AS title,
        COALESCE(t.description, t_def.description, '') AS description,
        s.name AS shop_name, s.slug AS shop_slug
      FROM products p
      LEFT JOIN product_translations t ON t.product_id = p.id AND t.lang = $1
      LEFT JOIN product_translations t_def ON t_def.product_id = p.id AND t_def.lang = p.default_lang
      LEFT JOIN shops s ON s.id = p.shop_id
      ${where} ORDER BY ${orderBy}
      LIMIT $${i} OFFSET $${i + 1}
    `, params);
    res.json({
      data: result.rows,
      pagination: { total, pages: Math.max(1, Math.ceil(total / lim)), page: pg, limit: lim }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   PARTA — KI-Kundenassistent (v1: Produktfinder, mehrsprachig)
   Public Endpoint. Ablauf: Katalog-Suche (Postgres) -> 1x Anthropic-Call.
   Guenstig: nur Haiku, ein Call pro Nachricht, Verlauf + Tokens gedeckelt.
   ENV: ANTHROPIC_API_KEY (Pflicht), PARTA_MODEL (optional)
   ============================================================ */
const PARTA_MODEL = process.env.PARTA_MODEL || 'claude-haiku-4-5-20251001';
const PARTA_LANG_NAMES = {
  en: 'English', de: 'German', fr: 'French', pt: 'Portuguese',
  sw: 'Swahili', es: 'Spanish', ar: 'Arabic', tr: 'Turkish', ln: 'Lingala',
};

// Passende Produkte aus dem Katalog holen (mehrsprachig, nach Wort-Treffern).
async function partaFindProducts(message, lang) {
  const words = String(message || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .slice(0, 8);
  if (!words.length) return [];

  const params = [lang];
  const ors = words.map((w) => {
    params.push('%' + w + '%');
    const i = params.length;
    return `(t.title ILIKE $${i} OR t.description ILIKE $${i} OR p.brand ILIKE $${i} OR p.model ILIKE $${i} OR p.oem ILIKE $${i})`;
  });

  const r = await query(
    `SELECT p.id, p.price_usd, p.brand, p.model, p.condition,
            COALESCE(t.title, t_def.title, '') AS title
       FROM products p
       LEFT JOIN product_translations t     ON t.product_id = p.id AND t.lang = $1
       LEFT JOIN product_translations t_def ON t_def.product_id = p.id AND t_def.lang = p.default_lang
      WHERE p.active = TRUE AND COALESCE(p.review_status, 'approved') = 'approved' AND (${ors.join(' OR ')})
      ORDER BY p.created_at DESC
      LIMIT 6`,
    params
  );
  return r.rows;
}

app.post('/api/parta', async (req, res) => {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({ error: 'parta_not_configured' });
    }
    const lang = getLang(req);
    const message = String((req.body && req.body.message) || '').trim().slice(0, 1000);
    if (!message) return res.status(400).json({ error: 'empty_message' });

    // Verlauf begrenzen (Kosten + Kontext klein halten)
    let history = Array.isArray(req.body && req.body.history) ? req.body.history : [];
    history = history
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-6)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1500) }));

    // 1) Kandidaten aus dem Katalog
    const found = await partaFindProducts(message, lang);
    const catalog = found.map((p) => ({
      id: p.id,
      title: p.title || ((p.brand || '') + ' ' + (p.model || '')).trim() || ('#' + p.id),
      price_usd: Number(p.price_usd) || 0,
      brand: p.brand || null,
      model: p.model || null,
      condition: p.condition || null,
    }));

    // 2) Ein Anthropic-Call (Haiku)
    const langName = PARTA_LANG_NAMES[lang] || 'English';
    const system =
      'You are Parta, the friendly shopping assistant for AFCARPARTS, an auto spare parts marketplace for Africa. ' +
      'Your job is to help the customer find the right part. ' +
      'You are given a JSON list of products found in the catalog. Recommend ONLY from this list. ' +
      'Never invent products, prices, part numbers or availability. ' +
      'If the list is empty or nothing fits, say so briefly and ask ONE short clarifying question ' +
      '(for example the car make, model, year, or the exact part). ' +
      'Be concise, warm and helpful. Do NOT output JSON, code, or product IDs. ' +
      'Always reply in ' + langName + '.\n\n' +
      'PRODUCTS (JSON):\n' + JSON.stringify(catalog);

    const messages = history.concat([{ role: 'user', content: message }]);

    const ar = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: PARTA_MODEL, max_tokens: 400, system, messages }),
    });
    const data = await ar.json().catch(() => ({}));
    if (!ar.ok) {
      console.error('[parta] anthropic', ar.status, JSON.stringify(data).slice(0, 300));
      return res.status(502).json({ error: 'parta_upstream_error' });
    }
    const reply = (data.content || [])
      .filter((b) => b && b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    res.json({ reply: reply || '…', products: catalog });
  } catch (err) {
    console.error('[parta]', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const lang = getLang(req);
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: 'Invalid product id' });
    const result = await query(`
      SELECT p.*,
        COALESCE(t.title, t_def.title, '') AS title,
        COALESCE(t.description, t_def.description, '') AS description,
        s.name AS shop_name, s.slug AS shop_slug, s.country AS shop_country,
        c.slug AS category_slug,
        COALESCE(ct.name, ct_en.name, c.slug) AS category_name
      FROM products p
      LEFT JOIN product_translations t ON t.product_id = p.id AND t.lang = $1
      LEFT JOIN product_translations t_def ON t_def.product_id = p.id AND t_def.lang = p.default_lang
      LEFT JOIN shops s ON s.id = p.shop_id
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN category_translations ct ON ct.category_id = c.id AND ct.lang = $1
      LEFT JOIN category_translations ct_en ON ct_en.category_id = c.id AND ct_en.lang = 'en'
      WHERE p.id = $2 AND p.active = TRUE AND COALESCE(p.review_status, 'approved') = 'approved'
    `, [lang, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    const product = result.rows[0];
    const tagsRes = await query(`
      SELECT t.id, t.slug FROM tags t
      JOIN product_tags pt ON pt.tag_id = t.id
      WHERE pt.product_id = $1 ORDER BY t.slug
    `, [id]);
    product.tags = tagsRes.rows;
    query('UPDATE products SET view_count = view_count + 1 WHERE id = $1', [id]).catch(() => {});
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/products', requireAdmin, async (req, res) => {
  try {
    const products = await query(`
      SELECT p.*,
             u.email AS seller_email, u.name AS seller_name, u.role AS seller_role,
             s.name AS shop_name, s.active AS shop_active, s.country AS shop_country,
             m.kyc_status AS seller_kyc
        FROM products p
        LEFT JOIN users u     ON u.id = p.seller_id
        LEFT JOIN shops s     ON s.id = COALESCE(p.shop_id, (SELECT id FROM shops WHERE owner_id = p.seller_id ORDER BY created_at LIMIT 1))
        LEFT JOIN merchants m ON m.user_id = p.seller_id
       ORDER BY (COALESCE(p.review_status,'approved') = 'pending') DESC, p.created_at DESC`);
    const trans = await query(`SELECT product_id, lang, title, description FROM product_translations`);
    const transByProd = {};
    for (const t of trans.rows) {
      if (!transByProd[t.product_id]) transByProd[t.product_id] = {};
      transByProd[t.product_id][t.lang] = { title: t.title, description: t.description };
    }
    const data = products.rows.map(p => ({ ...p, translations: transByProd[p.id] || {} }));
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const { default_lang, translations, price_usd, brand, model, oem,
    category_id, shop_id, seller_id, condition, stock, is_china_seller, images, tags, weight_kg, sku, ean, fits_vehicles } = req.body || {};
  if (!default_lang || !SUPPORTED_LANGS.includes(default_lang)) return res.status(400).json({ error: 'default_lang must be one of: ' + SUPPORTED_LANGS.join(', ') });
  if (!translations || typeof translations !== 'object') return res.status(400).json({ error: 'Missing translations object' });
  if (!translations[default_lang] || !translations[default_lang].title || !translations[default_lang].title.trim()) return res.status(400).json({ error: `Title in default language (${default_lang}) is required` });
  if (price_usd === undefined || price_usd === null || isNaN(parseFloat(price_usd))) return res.status(400).json({ error: 'Valid price_usd is required' });
  try {
    const newProd = await db.insert('products', {
      default_lang, price_usd: parseFloat(price_usd),
      brand: brand ? brand.trim() : null, model: model ? model.trim() : null,
      oem: oem ? oem.trim() : null, condition: condition || 'new',
      sku: sku ? sku.trim() : null, ean: ean ? ean.trim() : null,
      fits_vehicles: fits_vehicles ? String(fits_vehicles).trim() : null,
      category_id: category_id ? parseInt(category_id, 10) : null,
      shop_id: shop_id ? parseInt(shop_id, 10) : null,
      seller_id: seller_id ? parseInt(seller_id, 10) : null,
      stock: stock ? parseInt(stock, 10) : 0,
      is_china_seller: !!is_china_seller,
      weight_kg: (weight_kg !== undefined && weight_kg !== null && weight_kg !== '' && !isNaN(parseFloat(weight_kg))) ? parseFloat(weight_kg) : null,
      images: JSON.stringify(Array.isArray(images) ? images : []), active: true
    });
    for (const lang of SUPPORTED_LANGS) {
      const tr = translations[lang];
      if (tr && tr.title && tr.title.trim()) {
        await db.insert('product_translations', {
          product_id: newProd.id, lang,
          title: tr.title.trim(),
          description: tr.description ? tr.description.trim() : null
        });
      }
    }
    if (Array.isArray(tags) && tags.length > 0) {
      const tagIds = await resolveTags(tags);
      for (const tagId of tagIds) {
        await query('INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [newProd.id, tagId]);
      }
    }
    res.json({ success: true, product: newProd });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/products/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid product id' });
  const { default_lang, translations, price_usd, brand, model, oem,
    category_id, shop_id, seller_id, condition, stock, is_china_seller, images, active, tags, weight_kg, sku, ean, fits_vehicles } = req.body || {};
  try {
    const updates = {};
    if (default_lang !== undefined && SUPPORTED_LANGS.includes(default_lang)) updates.default_lang = default_lang;
    if (price_usd !== undefined) updates.price_usd = parseFloat(price_usd);
    if (brand !== undefined) updates.brand = brand ? brand.trim() : null;
    if (model !== undefined) updates.model = model ? model.trim() : null;
    if (oem !== undefined) updates.oem = oem ? oem.trim() : null;
    if (sku !== undefined) updates.sku = sku ? sku.trim() : null;
    if (ean !== undefined) updates.ean = ean ? ean.trim() : null;
    if (fits_vehicles !== undefined) updates.fits_vehicles = fits_vehicles ? String(fits_vehicles).trim() : null;
    if (condition !== undefined) updates.condition = condition;
    if (category_id !== undefined) updates.category_id = category_id ? parseInt(category_id, 10) : null;
    if (shop_id !== undefined) updates.shop_id = shop_id ? parseInt(shop_id, 10) : null;
    if (seller_id !== undefined) updates.seller_id = seller_id ? parseInt(seller_id, 10) : null;
    if (stock !== undefined) updates.stock = parseInt(stock, 10) || 0;
    if (is_china_seller !== undefined) updates.is_china_seller = !!is_china_seller;
    if (weight_kg !== undefined) updates.weight_kg = (weight_kg !== null && weight_kg !== '' && !isNaN(parseFloat(weight_kg))) ? parseFloat(weight_kg) : null;
    if (images !== undefined) updates.images = JSON.stringify(Array.isArray(images) ? images : []);
    if (active !== undefined) updates.active = !!active;
    if (Object.keys(updates).length > 0) await db.update('products', id, updates);
    if (translations && typeof translations === 'object') {
      for (const lang of SUPPORTED_LANGS) {
        const tr = translations[lang];
        if (tr === undefined) continue;
        if (tr === null || (!tr.title && !tr.description)) {
          await query('DELETE FROM product_translations WHERE product_id = $1 AND lang = $2', [id, lang]);
        } else if (tr.title && tr.title.trim()) {
          await query(`
            INSERT INTO product_translations (product_id, lang, title, description)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (product_id, lang) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
          `, [id, lang, tr.title.trim(), tr.description ? tr.description.trim() : null]);
        }
      }
    }
    if (Array.isArray(tags)) {
      await query('DELETE FROM product_tags WHERE product_id = $1', [id]);
      if (tags.length > 0) {
        const tagIds = await resolveTags(tags);
        for (const tagId of tagIds) {
          await query('INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [id, tagId]);
        }
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await db.remove('products', req.params.id);
    res.json({ success: true, deleted: ok ? 1 : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   SELLER ROUTES (Postgres, Etappe 4.2)
   Image-Upload + CRUD mit Ownership-Check
   ============================================================ */
app.post('/api/upload/images', requireAuth, (req, res) => {
  imageUpload.array('images', 5)(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE')      return res.status(413).json({ error: 'A file is larger than 5 MB' });
      if (err.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ error: 'Maximum 5 images allowed' });
      return res.status(400).json({ error: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No file received' });
    }
    // Phase R2: upload buffers to Cloudflare R2, return public URLs
    const folder = (req.body.folder || 'products').toString();
    try {
      const urls = await Promise.all(
        req.files.map(f => uploadToR2(f.buffer, f.originalname, f.mimetype, folder))
      );
      res.json({ urls });
    } catch (uploadErr) {
      console.error('[upload/images] R2 upload failed:', uploadErr);
      res.status(500).json({ error: 'Upload failed: ' + uploadErr.message });
    }
  });
});

// Banner-Media-Upload (Bild oder Video, 20 MB) -> R2
app.post('/api/upload/banner-media', requireAuth, (req, res) => {
  bannerUpload.single('file')(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'Datei groesser als 20 MB' });
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) return res.status(400).json({ error: 'Keine Datei empfangen' });
    try {
      const url = await uploadToR2(req.file.buffer, req.file.originalname, req.file.mimetype, 'banners');
      const media_type = /^video\//.test(req.file.mimetype) ? 'video' : 'image';
      res.json({ url, media_type });
    } catch (uploadErr) {
      console.error('[upload/banner-media] R2 upload failed:', uploadErr);
      res.status(500).json({ error: 'Upload fehlgeschlagen: ' + uploadErr.message });
    }
  });
});

/* ------------------------------------------------------------
   SELLER SHOP: eigener Shop des eingeloggten Händlers
   GET  /api/seller/shop  → Shop des Händlers (oder null)
   POST /api/seller/shop  → anlegen ODER aktualisieren (1 Shop je Händler)
   ------------------------------------------------------------ */
app.get('/api/seller/shop', requireAuth, async (req, res) => {
  try {
    const scope = resolveSellerScope(req);
    const result = await query(`
      SELECT s.id, s.slug, s.name, s.country, s.city, s.email, s.phone,
        s.street, s.postal_code, s.region, s.vat_id, s.company_name, s.reg_number,
        s.is_china, s.logo_url, s.active, s.created_at
      FROM shops s
      WHERE s.owner_id = $1
      ORDER BY s.created_at ASC LIMIT 1
    `, [scope.id]);
    if (!result.rows.length) return res.json({ shop: null });
    const shop = result.rows[0];
    const tr = await query('SELECT lang, description FROM shop_translations WHERE shop_id = $1', [shop.id]);
    const translations = {};
    tr.rows.forEach(r => { translations[r.lang] = r.description; });
    res.json({ shop: { ...shop, translations } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/seller/shop', requireAuth, async (req, res) => {
  const { name, country, city, email, phone, logo_url, description,
          street, postal_code, region, vat_id, company_name, reg_number } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: 'Missing shop name' });
  try {
    const scope = resolveSellerScope(req);
    const txt = (v) => (v === undefined || v === null || String(v).trim() === '') ? null : String(v).trim();
    const fields = {
      name: name.trim(),
      country: country ? country.toUpperCase() : null,
      city: city ? city.trim() : null,
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      logo_url: logo_url || null,
      // Ladungsfaehige Anschrift - wird fuer Rechnungen und das Impressum
      // des Haendlershops gebraucht, nicht nur zur Anzeige.
      street: txt(street),
      postal_code: txt(postal_code),
      region: txt(region),
      vat_id: txt(vat_id),
      company_name: txt(company_name),
      reg_number: txt(reg_number)
    };

    // Hat dieser Händler schon einen Shop?
    const existing = await query('SELECT id FROM shops WHERE owner_id = $1 ORDER BY created_at ASC LIMIT 1', [scope.id]);

    let shopId;
    if (existing.rows.length) {
      shopId = existing.rows[0].id;
      await db.update('shops', shopId, fields);
    } else {
      if (!fields.email) fields.email = req.user.email || null;
      // Eindeutigen Slug erzeugen
      let finalSlug = makeSlug(name) || ('shop-' + scope.id);
      const clash = await query('SELECT 1 FROM shops WHERE slug = $1', [finalSlug]);
      if (clash.rows.length) finalSlug = finalSlug + '-' + scope.id;
      const newShop = await db.insert('shops', {
        owner_id: scope.id,
        slug: finalSlug,
        ...fields,
        is_china: false,
        // Neue Shops muessen vom Admin freigegeben werden (Admin selbst: sofort aktiv)
        active: req.user.role === 'admin' && !scope.isAdminView
      });
      shopId = newShop.id;
    }

    // Beschreibung in der aktuellen Sprache speichern (optional)
    if (description !== undefined) {
      const lang = getLang(req);
      if (description && description.trim()) {
        await query(`
          INSERT INTO shop_translations (shop_id, lang, description)
          VALUES ($1, $2, $3)
          ON CONFLICT (shop_id, lang) DO UPDATE SET description = EXCLUDED.description
        `, [shopId, lang, description.trim()]);
      } else {
        await query('DELETE FROM shop_translations WHERE shop_id = $1 AND lang = $2', [shopId, lang]);
      }
    }

    // Bestehende Produkte dieses Händlers mit dem Shop verknüpfen
    await query('UPDATE products SET shop_id = $1 WHERE seller_id = $2 AND (shop_id IS DISTINCT FROM $1)', [shopId, scope.id]);

    res.json({ success: true, shop_id: shopId, created: existing.rows.length === 0 });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/seller/products', requireAuth, async (req, res) => {
  try {
    const scope = resolveSellerScope(req);
    const isAdminAll = req.user.role === 'admin' && !scope.isAdminView;
    const params = isAdminAll ? [] : [scope.id];
    const where = isAdminAll ? '' : 'WHERE p.seller_id = $1';
    const result = await query(`
      SELECT p.id, p.price_usd, p.brand, p.model, p.oem, p.sku, p.ean, p.condition,
             p.review_status, p.review_note,
        p.category_id, p.shop_id, p.seller_id, p.images, p.stock,
        p.is_china_seller, p.sale_mode, p.price_tiers, p.default_lang, p.active, p.created_at, p.view_count,
        (SELECT title FROM product_translations 
         WHERE product_id = p.id AND lang = p.default_lang LIMIT 1) AS title,
        c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      ${where}
      ORDER BY p.created_at DESC
    `, params);
    res.json({ data: result.rows });
  } catch (err) {
    console.error('GET /api/seller/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   SELLER ANALYTICS — Performance & KPIs
   GET /api/seller/analytics?bucket=day|week|quarter
   Liefert KPIs, Umsatz-Zeitreihe, Produkt-Ranking, Versandstatus.
   Datenquelle: order_items (Umsatz/Stück) + orders.status (Storno),
   products (Aufrufe/Lager) und shipments (Versand) — pro Händler.
   ============================================================ */
app.get('/api/seller/analytics', requireSeller, async (req, res) => {
  try {
    const scope = resolveSellerScope(req);
    const sellerId = scope.id;

    // Bucket (Granularität) für die Zeitreihe absichern
    const bucketMap = {
      day:     { unit: 'day',     since: "now() - interval '45 days'" },
      week:    { unit: 'week',    since: "now() - interval '26 weeks'" },
      quarter: { unit: 'quarter', since: "now() - interval '24 months'" },
    };
    const b = bucketMap[String(req.query.bucket || 'day')] || bucketMap.day;

    // (1) KPI-Aggregate über alle Order-Items dieses Händlers
    const kpiSql = `
      WITH si AS (
        SELECT oi.order_id, oi.qty, oi.line_total, oi.payout_amount,
               o.status AS ostatus, o.created_at AS ocreated
        FROM order_items oi
        JOIN orders o   ON o.id = oi.order_id
        JOIN products p ON p.id = oi.product_id
        WHERE p.seller_id = $1
      )
      SELECT
        COALESCE(SUM(line_total)    FILTER (WHERE ostatus IN ('paid','fulfilled')),0) AS revenue_total,
        COALESCE(SUM(payout_amount) FILTER (WHERE ostatus IN ('paid','fulfilled')),0) AS net_payout_total,
        COALESCE(SUM(qty)           FILTER (WHERE ostatus IN ('paid','fulfilled')),0) AS units_total,
        COUNT(DISTINCT order_id)    FILTER (WHERE ostatus IN ('paid','fulfilled'))    AS orders_total,
        COALESCE(SUM(line_total)    FILTER (WHERE ostatus IN ('paid','fulfilled') AND ocreated >= date_trunc('year', now())),0)                                        AS revenue_ytd,
        COALESCE(SUM(line_total)    FILTER (WHERE ostatus IN ('paid','fulfilled') AND ocreated >= now() - interval '30 days'),0)                                       AS revenue_30d,
        COALESCE(SUM(line_total)    FILTER (WHERE ostatus IN ('paid','fulfilled') AND ocreated >= now() - interval '60 days' AND ocreated < now() - interval '30 days'),0) AS revenue_prev_30d,
        COALESCE(SUM(line_total)    FILTER (WHERE ostatus IN ('cancelled','refunded')),0) AS revenue_lost,
        COUNT(DISTINCT order_id)    FILTER (WHERE ostatus IN ('cancelled','refunded'))    AS orders_lost
      FROM si
    `;

    // (2) Produkt-Bestand/Aufrufe
    const prodSql = `
      SELECT COUNT(*)                                  AS product_count,
             COUNT(*) FILTER (WHERE active)            AS active_count,
             COALESCE(SUM(view_count),0)               AS views_total,
             COALESCE(SUM(stock),0)                    AS stock_total
      FROM products WHERE seller_id = $1
    `;

    // (3) Zeitreihe (Flächendiagramm)
    const seriesSql = `
      SELECT to_char(date_trunc('${b.unit}', o.created_at), 'YYYY-MM-DD') AS bucket,
             COALESCE(SUM(oi.line_total),0) AS revenue,
             COALESCE(SUM(oi.qty),0)        AS units,
             COUNT(DISTINCT oi.order_id)    AS orders
      FROM order_items oi
      JOIN orders o   ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      WHERE p.seller_id = $1
        AND o.status IN ('paid','fulfilled')
        AND o.created_at >= ${b.since}
      GROUP BY 1 ORDER BY 1
    `;

    // (4) Produkt-Ranking — ALLE Produkte des Händlers, Frontend sortiert
    const rankSql = `
      SELECT p.id,
             COALESCE((SELECT title FROM product_translations
                       WHERE product_id = p.id AND lang = p.default_lang LIMIT 1), '—') AS title,
             COALESCE(p.view_count,0) AS views,
             COALESCE(p.stock,0)      AS stock,
             p.active,
             COALESCE(s.units,0)      AS units,
             COALESCE(s.revenue,0)    AS revenue
      FROM products p
      LEFT JOIN (
        SELECT oi.product_id, SUM(oi.qty) AS units, SUM(oi.line_total) AS revenue
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        WHERE o.status IN ('paid','fulfilled')
        GROUP BY oi.product_id
      ) s ON s.product_id = p.id
      WHERE p.seller_id = $1
      ORDER BY revenue DESC NULLS LAST, views DESC
      LIMIT 50
    `;

    // (5) Versandstatus
    const shipSql = `
      SELECT COUNT(*) AS total,
             COUNT(*) FILTER (WHERE status IN ('pending','label_created')) AS pending,
             COUNT(*) FILTER (WHERE status IN ('shipped','in_transit'))    AS shipped,
             COUNT(*) FILTER (WHERE status = 'delivered')                  AS delivered
      FROM shipments WHERE seller_user_id = $1
    `;

    const [kpiR, prodR, seriesR, rankR, shipR] = await Promise.all([
      query(kpiSql,    [sellerId]),
      query(prodSql,   [sellerId]),
      query(seriesSql, [sellerId]),
      query(rankSql,   [sellerId]),
      query(shipSql,   [sellerId]),
    ]);

    const k  = kpiR.rows[0]  || {};
    const pr = prodR.rows[0] || {};
    const sh = shipR.rows[0] || {};

    const num = (v) => Number(v || 0);
    const revTotal   = num(k.revenue_total);
    const rev30      = num(k.revenue_30d);
    const revPrev30  = num(k.revenue_prev_30d);
    const ordersTot  = num(k.orders_total);
    const revLost    = num(k.revenue_lost);
    const ordersLost = num(k.orders_lost);

    const growth30   = revPrev30 > 0 ? ((rev30 - revPrev30) / revPrev30) * 100 : (rev30 > 0 ? 100 : 0);
    const aov        = ordersTot > 0 ? revTotal / ordersTot : 0;
    const returnRate = (revTotal + revLost) > 0 ? (revLost / (revTotal + revLost)) * 100 : 0;

    const payload = {
      currency: 'USD',
      admin_view: scope.isAdminView,
      bucket: b.unit,
      kpis: {
        revenue_total:    revTotal,
        revenue_ytd:      num(k.revenue_ytd),
        revenue_30d:      rev30,
        revenue_prev_30d: revPrev30,
        growth_30d_pct:   Math.round(growth30 * 10) / 10,
        net_payout_total: num(k.net_payout_total),
        units_total:      num(k.units_total),
        orders_total:     ordersTot,
        aov:              Math.round(aov * 100) / 100,
        return_rate_pct:  Math.round(returnRate * 10) / 10,
        orders_lost:      ordersLost,
        product_count:    num(pr.product_count),
        active_count:     num(pr.active_count),
        views_total:      num(pr.views_total),
        stock_total:      num(pr.stock_total),
      },
      shipping: {
        total:     num(sh.total),
        pending:   num(sh.pending),
        shipped:   num(sh.shipped),
        delivered: num(sh.delivered),
      },
      series: seriesR.rows.map((r) => ({
        bucket:  r.bucket,
        revenue: num(r.revenue),
        units:   num(r.units),
        orders:  num(r.orders),
      })),
      ranking: rankR.rows.map((r) => ({
        id:      r.id,
        title:   r.title,
        revenue: num(r.revenue),
        units:   num(r.units),
        views:   num(r.views),
        stock:   num(r.stock),
        active:  r.active,
      })),
    };

    // Support-Ansicht: Finanzdaten maskieren (Geldbetraege -> null),
    // Stueck/Aufrufe/Lager/Bestellungen/Versand bleiben fuer die Diagnose sichtbar.
    if (scope.isAdminView) {
      payload.kpis.revenue_total = null;
      payload.kpis.revenue_ytd = null;
      payload.kpis.revenue_30d = null;
      payload.kpis.revenue_prev_30d = null;
      payload.kpis.net_payout_total = null;
      payload.kpis.aov = null;
      payload.series = payload.series.map((r) => ({ bucket: r.bucket, revenue: null, units: r.units, orders: r.orders }));
      payload.ranking = payload.ranking.map((r) => ({ id: r.id, title: r.title, revenue: null, units: r.units, views: r.views, stock: r.stock, active: r.active }));
    }

    res.json(payload);
  } catch (err) {
    console.error('GET /api/seller/analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/seller/products/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const productRes = await query(`SELECT * FROM products WHERE id = $1`, [id]);
    if (productRes.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const product = productRes.rows[0];
    if (req.user.role !== 'admin' && product.seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const transRes = await query(
      `SELECT lang, title, description FROM product_translations WHERE product_id = $1`, [id]
    );
    const translations = {};
    for (const t of transRes.rows) {
      translations[t.lang] = { title: t.title, description: t.description };
    }
    const tagsRes = await query(`
      SELECT t.slug FROM tags t
      JOIN product_tags pt ON pt.tag_id = t.id
      WHERE pt.product_id = $1
    `, [id]);
    res.json({ ...product, translations, tags: tagsRes.rows.map(r => r.slug) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------------------------------------
   HAENDLER-STARTKLAR-PRUEFUNG
   Ein Produkt wird erst sichtbar (active = true), wenn der Haendler
   mindestens einen Versandtarif UND ein Auszahlungskonto hinterlegt
   hat. Sonst wuerde die Bestellung erst im Checkout scheitern.
   Admins, die eigene Produkte anlegen, sind ausgenommen.
   ------------------------------------------------------------ */
async function sellerReadiness(sellerUserId) {
  const missing = [];
  // 1) Shop mit Pflichtangaben (Firma/Name, Strasse, Stadt, Land, Telefon)
  // 2) Shop vom Admin freigegeben (shops.active)
  try {
    const sh = await query(
      `SELECT name, company_name, street, city, country, phone, active
         FROM shops WHERE owner_id = $1 ORDER BY created_at ASC LIMIT 1`, [sellerUserId]);
    const shop = sh.rows[0];
    const filled = (v) => v != null && String(v).trim() !== '';
    if (!shop || !(filled(shop.company_name || shop.name) && filled(shop.street) && filled(shop.city) && filled(shop.country) && filled(shop.phone))) {
      missing.push('shop_profile');
    }
    if (!shop || !shop.active) missing.push('shop_approval');
  } catch (e) { missing.push('shop_profile'); }
  // 3) Optional: aktives Abo Pflicht (Render-ENV REQUIRE_SUBSCRIPTION=1)
  if (process.env.REQUIRE_SUBSCRIPTION === '1') {
    try {
      const sub = await query(
        `SELECT 1 FROM subscriptions su JOIN merchants m ON m.id = su.merchant_id
          WHERE m.user_id = $1 AND su.status IN ('active','trialing')
            AND (su.current_period_end IS NULL OR su.current_period_end > now())
          LIMIT 1`, [sellerUserId]);
      if (!sub.rows.length) missing.push('subscription');
    } catch (e) { missing.push('subscription'); }
  }
  try {
    const rates = await shippingRates.listRates(sellerUserId);
    if (!Array.isArray(rates) || !rates.length) missing.push('shipping_rates');
  } catch (e) { missing.push('shipping_rates'); }
  try {
    const m = await billingDb.getMerchantByUserId(sellerUserId);
    const target = m ? await resolvePayoutTarget(m.id) : null;
    if (!target) missing.push('payout_account');
  } catch (e) { missing.push('payout_account'); }
  return { ok: missing.length === 0, missing };
}
// Produkte verifizierter Haendler (KYC = verified) gehen ohne Pruefung online,
// alle anderen landen zuerst in der Admin-Freigabe.
async function sellerTrusted(sellerUserId) {
  try {
    const r = await query(`SELECT kyc_status FROM merchants WHERE user_id = $1`, [sellerUserId]);
    return !!(r.rows[0] && r.rows[0].kyc_status === 'verified');
  } catch (e) { return false; }
}

function readinessApplies(req, scope) {
  // Admin, der NICHT in einer Haendler-Ansicht arbeitet -> keine Pruefung
  return !(req.user && req.user.role === 'admin' && String(scope.id) === String(req.user.id));
}

app.get('/api/seller/readiness', requireAuth, async (req, res) => {
  try {
    const scope = resolveSellerScope(req);
    const r = await sellerReadiness(scope.id);
    const cnt = await query(
      `SELECT count(*) FILTER (WHERE active = false)::int AS hidden, count(*)::int AS total
         FROM products WHERE seller_id = $1`, [scope.id]);
    res.json({ ...r, products: cnt.rows[0] || { hidden: 0, total: 0 } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Nach dem Einrichten von Tarif + Auszahlung: alle eigenen, bisher
// zurueckgehaltenen Produkte in einem Schritt veroeffentlichen.
app.post('/api/seller/products/publish-all', requireAuth, async (req, res) => {
  try {
    const scope = resolveSellerScope(req);
    const r = await sellerReadiness(scope.id);
    if (!r.ok) return res.status(409).json({ error: 'seller_not_ready', missing: r.missing });
    const u = await query(`UPDATE products SET active = true WHERE seller_id = $1 AND active = false`, [scope.id]);
    res.json({ ok: true, published: u.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/seller/products', requireAuth, async (req, res) => {
  const { default_lang, translations, price_usd, brand, model, oem,
    category_id, condition, stock, images, tags, weight_kg, sale_mode, price_tiers, sku, ean, fits_vehicles } = req.body || {};
  if (!default_lang || !SUPPORTED_LANGS.includes(default_lang)) {
    return res.status(400).json({ error: 'default_lang fehlt oder ungültig' });
  }
  if (!translations || !translations[default_lang] || !translations[default_lang].title?.trim()) {
    return res.status(400).json({ error: `Titel in ${default_lang} ist Pflicht` });
  }
  if (price_usd === undefined || isNaN(parseFloat(price_usd))) {
    return res.status(400).json({ error: 'Gültiger Preis ist Pflicht' });
  }
  try {
    const scope = resolveSellerScope(req);
    // 🌍 Auto-Übersetzung: aus Quellsprache in alle anderen unterstützten Sprachen
    const sourceTr = translations[default_lang];
    const autoTranslations = await autoFillTranslations({
      defaultLang: default_lang,
      title: sourceTr.title,
      description: sourceTr.description,
    });
    // Manuell vom User übergebene Übersetzungen überschreiben die Auto-Übersetzungen
    const finalTranslations = { ...autoTranslations, ...translations };

    // Shop des Händlers ermitteln, um das Produkt damit zu verknüpfen
    let myShopId = null;
    try {
      const sh = await query('SELECT id FROM shops WHERE owner_id = $1 ORDER BY created_at ASC LIMIT 1', [scope.id]);
      if (sh.rows.length) myShopId = sh.rows[0].id;
    } catch (e) {}

    // Startklar? Sonst wird das Produkt gespeichert, aber noch nicht veroeffentlicht.
    const readiness = readinessApplies(req, scope) ? await sellerReadiness(scope.id) : { ok: true, missing: [] };
    // Freigabe: Admin-eigene Produkte und verifizierte Haendler direkt, sonst Pruefung
    const reviewStatus = (!readinessApplies(req, scope) || await sellerTrusted(scope.id)) ? 'approved' : 'pending';

    const newProd = await db.insert('products', {
      review_status: reviewStatus,
      default_lang, price_usd: parseFloat(price_usd),
      brand: brand?.trim() || null, model: model?.trim() || null,
      oem: oem?.trim() || null, condition: condition || 'new',
      sku: sku?.trim() || null, ean: ean?.trim() || null,
      fits_vehicles: (fits_vehicles && String(fits_vehicles).trim()) || null,
      category_id: category_id ? parseInt(category_id, 10) : null,
      seller_id: scope.id,
      shop_id: myShopId,
      stock: stock ? parseInt(stock, 10) : 0,
      is_china_seller: false,
      weight_kg: (weight_kg !== undefined && weight_kg !== null && weight_kg !== '' && !isNaN(parseFloat(weight_kg))) ? parseFloat(weight_kg) : null,
      sale_mode: ['retail', 'wholesale', 'both'].includes(sale_mode) ? sale_mode : 'retail',
      price_tiers: JSON.stringify(parseTiers(price_tiers)),
      images: JSON.stringify(Array.isArray(images) ? images.slice(0, 5) : []),
      active: readiness.ok
    });
    for (const lang of SUPPORTED_LANGS) {
      const tr = finalTranslations[lang];
      if (tr && tr.title && tr.title.trim()) {
        await db.insert('product_translations', {
          product_id: newProd.id, lang,
          title: tr.title.trim(),
          description: tr.description?.trim() || null
        });
      }
    }
    if (Array.isArray(tags) && tags.length > 0) {
      const tagIds = await resolveTags(tags);
      for (const tagId of tagIds) {
        await query('INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [newProd.id, tagId]);
      }
    }
    if (reviewStatus === 'pending') mailer.notifyAdminProductReview(newProd.id); // wirft nie
    res.json({ success: true, product: newProd, published: readiness.ok && reviewStatus === 'approved',
               review_status: reviewStatus, missing: readiness.missing });
  } catch (err) {
    console.error('POST /api/seller/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/seller/products/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const scope = resolveSellerScope(req);
  const owner = await query('SELECT seller_id FROM products WHERE id = $1', [id]);
  if (owner.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && owner.rows[0].seller_id !== scope.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { default_lang, translations, price_usd, brand, model, oem,
    category_id, condition, stock, images, active, tags, weight_kg, sale_mode, price_tiers, sku, ean, fits_vehicles } = req.body || {};
  try {
    const updates = {};
    if (default_lang && SUPPORTED_LANGS.includes(default_lang)) updates.default_lang = default_lang;
    if (price_usd !== undefined) updates.price_usd = parseFloat(price_usd);
    if (brand !== undefined) updates.brand = brand?.trim() || null;
    if (model !== undefined) updates.model = model?.trim() || null;
    if (oem !== undefined) updates.oem = oem?.trim() || null;
    if (sku !== undefined) updates.sku = sku?.trim() || null;
    if (ean !== undefined) updates.ean = ean?.trim() || null;
    if (fits_vehicles !== undefined) updates.fits_vehicles = (fits_vehicles && String(fits_vehicles).trim()) || null;
    if (condition !== undefined) updates.condition = condition;
    if (category_id !== undefined) updates.category_id = category_id ? parseInt(category_id, 10) : null;
    if (stock !== undefined) updates.stock = parseInt(stock, 10) || 0;
    if (weight_kg !== undefined) updates.weight_kg = (weight_kg !== null && weight_kg !== '' && !isNaN(parseFloat(weight_kg))) ? parseFloat(weight_kg) : null;
    if (sale_mode !== undefined) updates.sale_mode = ['retail', 'wholesale', 'both'].includes(sale_mode) ? sale_mode : 'retail';
    if (price_tiers !== undefined) updates.price_tiers = JSON.stringify(parseTiers(price_tiers));
    if (images !== undefined) updates.images = JSON.stringify(Array.isArray(images) ? images.slice(0, 5) : []);
    if (active !== undefined) updates.active = !!active;
    // Veroeffentlichen nur, wenn der Haendler startklar ist. Bereits aktive
    // (Alt-)Produkte bleiben unangetastet, damit Bearbeiten weiter geht.
    let readiness = { ok: true, missing: [] };
    if (updates.active === true && readinessApplies(req, scope)) {
      const cur = await query('SELECT active FROM products WHERE id = $1', [id]);
      if (cur.rows[0] && !cur.rows[0].active) {
        readiness = await sellerReadiness(scope.id);
        if (!readiness.ok) updates.active = false;
      }
    }
    // Preis, Titel, Bilder oder Staffeln geaendert? Bei nicht verifizierten
    // Haendlern geht das Produkt zurueck in die Admin-Freigabe.
    let reviewStatus = null;
    if (readinessApplies(req, scope) && !(await sellerTrusted(scope.id))) {
      const cur = await query('SELECT price_usd, images, price_tiers, review_status FROM products WHERE id = $1', [id]);
      const c = cur.rows[0] || {};
      const norm = (v) => (typeof v === 'string' ? v : JSON.stringify(v == null ? null : v));
      const changed =
        (updates.price_usd !== undefined && Math.abs(Number(c.price_usd) - updates.price_usd) > 0.009) ||
        (updates.images !== undefined && norm(c.images) !== updates.images) ||
        (updates.price_tiers !== undefined && norm(c.price_tiers) !== updates.price_tiers) ||
        !!(translations && typeof translations === 'object');
      if (changed && c.review_status !== 'pending') { updates.review_status = 'pending'; reviewStatus = 'pending'; }
      else reviewStatus = c.review_status || 'approved';
    }
    if (Object.keys(updates).length > 0) await db.update('products', id, updates);
    if (updates.review_status === 'pending') mailer.notifyAdminProductReview(id); // wirft nie
    if (translations && typeof translations === 'object') {
      // 🌍 Auto-Übersetzung: wenn default_lang + Quelltext im Body, fülle andere Sprachen auf
      let finalTranslations = translations;
      const effectiveLang = default_lang && SUPPORTED_LANGS.includes(default_lang) ? default_lang : null;
      if (effectiveLang && translations[effectiveLang]?.title?.trim()) {
        const sourceTr = translations[effectiveLang];
        const autoTranslations = await autoFillTranslations({
          defaultLang: effectiveLang,
          title: sourceTr.title,
          description: sourceTr.description,
        });
        // Manuell übergebene Übersetzungen überschreiben Auto-Übersetzungen
        finalTranslations = { ...autoTranslations, ...translations };
      }
      for (const lang of SUPPORTED_LANGS) {
        const tr = finalTranslations[lang];
        if (tr === undefined) continue;
        if (tr === null || (!tr.title && !tr.description)) {
          await query('DELETE FROM product_translations WHERE product_id = $1 AND lang = $2', [id, lang]);
        } else if (tr.title && tr.title.trim()) {
          await query(`
            INSERT INTO product_translations (product_id, lang, title, description)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (product_id, lang) DO UPDATE
            SET title = EXCLUDED.title, description = EXCLUDED.description
          `, [id, lang, tr.title.trim(), tr.description?.trim() || null]);
        }
      }
    }
    if (Array.isArray(tags)) {
      await query('DELETE FROM product_tags WHERE product_id = $1', [id]);
      if (tags.length > 0) {
        const tagIds = await resolveTags(tags);
        for (const tagId of tagIds) {
          await query('INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [id, tagId]);
        }
      }
    }
    res.json({ success: true, published: readiness.ok && reviewStatus !== 'pending' && reviewStatus !== 'rejected',
               review_status: reviewStatus, missing: readiness.missing });
  } catch (err) {
    console.error('PUT /api/seller/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/seller/products/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const scope = resolveSellerScope(req);
  const owner = await query('SELECT seller_id FROM products WHERE id = $1', [id]);
  if (owner.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && owner.rows[0].seller_id !== scope.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await db.remove('products', id);
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/seller/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

// CSV-Import: einfaches Format, ein Produkt pro Zeile
// Pflicht: title, price_usd
// Optional: description, brand, model, oem, condition, stock, category_slug, tags, lang
function parseCsvRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i+1] === '"') { current += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else current += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',' || c === ';' || c === '\t') { result.push(current); current = ''; }
      else current += c;
    }
  }
  result.push(current);
  return result.map(s => s.trim());
}

app.post('/api/seller/csv-import', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Keine Datei hochgeladen' });
  const csvScope = resolveSellerScope(req);

  let content;
  try {
    content = fs.readFileSync(req.file.path, 'utf8');
  } catch (err) {
    return res.status(500).json({ error: 'Datei konnte nicht gelesen werden' });
  } finally {
    try { fs.unlinkSync(req.file.path); } catch {}
  }

  // BOM entfernen falls vorhanden
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

  const lines = content.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return res.status(400).json({ error: 'CSV ist leer oder enthält nur Header' });

  const headers = parseCsvRow(lines[0]).map(h => h.toLowerCase());

  if (!headers.includes('title')) return res.status(400).json({ error: 'Spalte "title" fehlt im Header' });
  if (!headers.includes('price_usd')) return res.status(400).json({ error: 'Spalte "price_usd" fehlt im Header' });

  // Kategorien einmal laden für Slug→ID-Lookup
  const catRes = await query('SELECT id, slug FROM categories');
  const categoryBySlug = {};
  for (const c of catRes.rows) categoryBySlug[c.slug] = c.id;

  let imported = 0, skipped = 0;
  const errors = [];

  for (let i = 1; i < lines.length; i++) {
    try {
      const row = parseCsvRow(lines[i]);
      const data = {};
      for (let j = 0; j < headers.length; j++) data[headers[j]] = row[j] || '';

      if (!data.title || !data.price_usd) {
        skipped++;
        errors.push(`Zeile ${i+1}: Titel oder Preis fehlt`);
        continue;
      }

      const price = parseFloat(data.price_usd);
      if (isNaN(price) || price < 0) {
        skipped++;
        errors.push(`Zeile ${i+1}: Preis ungültig (${data.price_usd})`);
        continue;
      }

      const default_lang = SUPPORTED_LANGS.includes(data.lang) ? data.lang : 'de';
      const condition = ['new', 'used', 'refurbished'].includes(data.condition) ? data.condition : 'new';
      const category_id = data.category_slug ? (categoryBySlug[data.category_slug] || null) : null;

      const newProd = await db.insert('products', {
        default_lang,
        price_usd: price,
        brand: data.brand || null,
        model: data.model || null,
        oem: data.oem || null,
        condition,
        category_id,
        seller_id: csvScope.id,
        stock: parseInt(data.stock, 10) || 0,
        is_china_seller: false,
        images: '[]',
        active: true
      });

      await db.insert('product_translations', {
        product_id: newProd.id,
        lang: default_lang,
        title: data.title,
        description: data.description || null
      });

      if (data.tags) {
        const tagSlugs = data.tags.split(/[,;]/).map(t => makeSlug(t)).filter(Boolean);
        if (tagSlugs.length > 0) {
          const tagIds = await resolveTags(tagSlugs);
          for (const tid of tagIds) {
            await query('INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [newProd.id, tid]);
          }
        }
      }

      imported++;
    } catch (err) {
      skipped++;
      errors.push(`Zeile ${i+1}: ${err.message}`);
    }
  }

  res.json({
    ok: true,
    total: lines.length - 1,
    imported,
    skipped,
    errors: errors.slice(0, 20)
  });
});
/* ============================================================
   BANNERS — Helfer
   ============================================================ */

// Normalisiert ein Banner-Objekt (mit Defaults für alte Banner)
function normalizeBanner(b) {
  // Valid placements
  const VALID_PL = ['hero', 'partner', 'side_left', 'side_right'];
  const placement = VALID_PL.indexOf(b.placement) !== -1 ? b.placement : 'hero';
  return {
    id:         b.id,
    title:      b.title || '',
    image_url:  b.image_url || '',
    media_type: b.media_type || (/\.(mp4|webm|mov)(\?|$)/i.test(b.image_url || '') ? 'video' : 'image'),
    link_url:   b.link_url || '',
    alt_text:   b.alt_text || '',
    placement:  placement,
    position:   Number.isFinite(+b.position) ? +b.position : 0,
    active:     b.active !== false,
    start_date: b.start_date || null,
    end_date:   b.end_date   || null,
    created_at: b.created_at || null,
    updated_at: b.updated_at || null,
  };
}

function isWithinSchedule(b, now = Date.now()) {
  if (b.start_date && new Date(b.start_date).getTime() > now) return false;
  if (b.end_date   && new Date(b.end_date).getTime()   < now) return false;
  return true;
}

// R2-Cleanup-Helper: löscht Bild auf R2 wenn URL aus unserem Bucket kommt (best-effort, blockiert nichts)
function tryDeleteR2Image(url) {
  if (!url) return;
  const publicBase = process.env.R2_PUBLIC_URL;
  if (!publicBase || !url.startsWith(publicBase)) return; // externe URL → ignorieren
  deleteFromR2(url)
    .then(() => console.log('[R2] Bild gelöscht:', url))
    .catch(e => console.warn('[R2] Löschung fehlgeschlagen:', url, '-', e.message));
}

/* ---------- BANNERS + ORDERS (noch JSON) ---------- */
app.get('/api/banners', (req, res) => {
  const placement = req.query.placement || null; // filter optional
  const all = (load('banners') || []).map(normalizeBanner);
  let active = all
    .filter(b => b.active && isWithinSchedule(b));
  if (placement) {
    active = active.filter(b => b.placement === placement);
  }
  active = active
    .sort((a, b) => a.position - b.position)
    .map(({ id, title, image_url, media_type, link_url, alt_text, position, placement }) =>
         ({ id, title, image_url, media_type, link_url, alt_text, position, placement }));
  res.json({ data: active });
});

// ============================================================
//  PHASE 2.0 - BESTELLUNGEN -> POSTGRES (provider-neutral)
//  ERSETZT deine bisherigen JSON-Order-Endpoints:
//    - GET  /api/orders            (war: load('orders'))
//    - POST /api/orders            (war: save in JSON)
//    - GET  /api/admin/orders      (war: load('orders'))
//
//  WICHTIG: Preis kommt jetzt SERVERSEITIG aus products.price_usd,
//  nicht mehr vom Client. Pro Position werden 16 % Provision berechnet.
// ============================================================

// Provision (Basissatz 16 %). Bei Bedarf via Render-ENV COMMISSION_RATE ueberschreibbar.
const COMMISSION_RATE = (() => {
  const v = parseFloat(process.env.COMMISSION_RATE);
  return Number.isFinite(v) && v >= 0 && v < 1 ? v : 0.16;
})();
const SALE_CURRENCY = process.env.SALE_CURRENCY || 'USD';

function money(n) { return Math.round((Number(n) || 0) * 100) / 100; }

/* ============================================================
   DEGRESSIVE PROVISION (Marginal-/Staffelmodell, wie Einkommensteuer)
   ------------------------------------------------------------
   Je groesser der HAENDLER-Umsatz IN EINER Bestellung, desto kleiner
   der Provisionssatz auf den oberen Betragsabschnitten. Marginal =
   jeder Abschnitt mit eigenem Satz -> keine Klippe, immer monoton.

   Default-Staffel (USD, pro Haendler je Bestellung):
       0 - 500    16 %
     500 - 2000   12 %
    2000 - 5000    9 %
    ab 5000        7 %

   Per Render-ENV COMMISSION_TIERS als JSON ueberschreibbar, z. B.:
     [[500,0.16],[2000,0.12],[5000,0.09],[null,0.07]]
   Jeder Eintrag = [obere_Grenze_oder_null, satz]. Aufsteigend sortiert,
   letzter Eintrag MUSS Grenze null (= "alles darueber") haben.
   Faellt COMMISSION_TIERS weg/ist ungueltig -> flacher COMMISSION_RATE.
   ============================================================ */
const COMMISSION_TIERS = (() => {
  const DEFAULT = [[500, 0.16], [2000, 0.12], [5000, 0.09], [null, 0.07]];
  const raw = process.env.COMMISSION_TIERS;
  if (!raw) return DEFAULT;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return DEFAULT;
    const ok = parsed.every((t, idx) =>
      Array.isArray(t) && t.length === 2 &&
      (t[0] === null ? idx === parsed.length - 1 : (typeof t[0] === 'number' && t[0] > 0)) &&
      typeof t[1] === 'number' && t[1] >= 0 && t[1] < 1
    );
    if (!ok || parsed[parsed.length - 1][0] !== null) return DEFAULT;
    return parsed;
  } catch (e) { return DEFAULT; }
})();

// Gesamtprovision fuer einen Haendler-Umsatz (USD) ueber die Marginal-Staffel.
function commissionForAmount(amount) {
  const a = Number(amount) || 0;
  if (a <= 0) return 0;
  let prev = 0, total = 0;
  for (const [cap, rate] of COMMISSION_TIERS) {
    const upper = (cap === null) ? a : Math.min(a, cap);
    if (upper > prev) total += (upper - prev) * rate;
    prev = (cap === null) ? a : cap;
    if (a <= prev) break;
  }
  return money(total);
}

/* ============================================================
   GROSSHANDEL-STUECKPREIS (Alibaba-Mengenstaffel)
   price_tiers = [{min, price}] -> Stueckpreis = Preis der HOECHSTEN
   Stufe, deren min <= qty ist; sonst der normale Einzelpreis price_usd.
   Greift nur, wenn sale_mode Grosshandel zulaesst ('wholesale'|'both').
   Robust gegen JSON-String, Objektarray, krumme/teilweise Eintraege.
   ============================================================ */
function parseTiers(price_tiers) {
  let arr = price_tiers;
  if (typeof arr === 'string') { try { arr = JSON.parse(arr); } catch (e) { arr = []; } }
  if (!Array.isArray(arr)) return [];
  return arr
    .map((t) => ({ min: parseInt(t && (t.min != null ? t.min : t.min_qty), 10), price: parseFloat(t && t.price) }))
    .filter((t) => Number.isFinite(t.min) && t.min > 1 && Number.isFinite(t.price) && t.price >= 0)
    .sort((a, b) => a.min - b.min);
}

function wholesaleUnitPrice(product, qty) {
  const base = money(product.price_usd);
  const mode = product.sale_mode || 'retail';
  if (mode !== 'wholesale' && mode !== 'both') return base;
  const tiers = parseTiers(product.price_tiers);
  let price = base;
  for (const tr of tiers) { if (qty >= tr.min) price = tr.price; }
  return money(price);
}

/* ============================================================
   VERSANDKOSTEN serverseitig berechnen (autoritativ).
   Gleiche Funktion fuer Anzeige (POST /api/shipping/quote) und
   echte Bestellung (POST /api/orders) -> Anzeige == Berechnung.
   Der Preis kommt aus dem TARIF DES HAENDLERS (shipping_rates),
   nicht aus einer Plattform-Schaetzung. Damit entspricht das, was
   der Kunde zahlt, exakt dem, was der Haendler erstattet bekommt.
   Gruppiert pro Haendler (1 Haendler = 1 Sendung), summiert Gewicht
   und Warenwert je Gruppe. Wirft NIE -> Checkout bleibt stabil.
   wanted: [{ pid, qty }]   destination: { country, city, pickup_station_id }
   ============================================================ */
async function computeShippingForItems(wanted, destination) {
  const defW = shippingProviders.defaultWeightKg();
  // Gewicht UND Warenwert je Haendler summieren (Warenwert wird fuer
  // die Gratis-ab-Schwelle des Haendlertarifs gebraucht).
  const bySeller = new Map();
  for (const w of wanted) {
    const pr = await query(
      `SELECT id, seller_id, weight_kg, price_usd, sale_mode, price_tiers
         FROM products WHERE id = $1 AND active = true AND COALESCE(review_status, 'approved') = 'approved'`,
      [w.pid]
    );
    const p = pr.rows[0];
    if (!p) continue;
    const unitW = (p.weight_kg != null && Number(p.weight_kg) > 0) ? Number(p.weight_kg) : defW;
    const key = p.seller_id != null ? String(p.seller_id) : 'platform';
    if (!bySeller.has(key)) {
      bySeller.set(key, {
        seller_user_id: p.seller_id != null ? p.seller_id : null,
        weight_kg: 0,
        goods_usd: 0,
      });
    }
    const g = bySeller.get(key);
    g.weight_kg += unitW * w.qty;
    g.goods_usd += wholesaleUnitPrice(p, w.qty) * w.qty;
  }
  if (!bySeller.size) return { shipping_usd: 0, breakdown: [] };

  return await shippingRates.quoteGroups(
    [...bySeller.values()],
    destination && destination.country
  );
}

// Oeffentlich: Versandkosten fuer den aktuellen Warenkorb schaetzen (Checkout-Anzeige).
// Body: { items:[{id|product_id, qty}], country, city, pickup_station_id }
app.post('/api/shipping/quote', async (req, res) => {
  try {
    const { items, country, city, pickup_station_id } = req.body || {};
    const wanted = [];
    for (const it of (Array.isArray(items) ? items : [])) {
      const pid = parseInt(it && (it.id != null ? it.id : it.product_id), 10);
      const qty = Math.max(1, parseInt(it && it.qty, 10) || 1);
      if (pid) wanted.push({ pid, qty });
    }
    if (!wanted.length) return res.json({ shipping_usd: 0, breakdown: [], currency: SALE_CURRENCY });
    const out = await computeShippingForItems(wanted, { country, city, pickup_station_id });
    res.json({ shipping_usd: out.shipping_usd, breakdown: out.breakdown, currency: SALE_CURRENCY });
  } catch (err) {
    // Schaetzung darf den Checkout nie blockieren
    res.json({ shipping_usd: 0, breakdown: [], currency: SALE_CURRENCY, error: err.message });
  }
});

// ---- POST /api/orders : Bestellung anlegen (Status 'pending') ----
app.post('/api/orders', async (req, res) => {
  try {
    const { items, shipping, address, user } = req.body || {};
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'No items' });

    // Nur id + qty vom Client uebernehmen; alles andere kommt aus der DB.
    const wanted = [];
    for (const it of items) {
      const pid = parseInt(it && (it.id != null ? it.id : it.product_id), 10);
      const qty = Math.max(1, parseInt(it && it.qty, 10) || 1);
      if (pid) wanted.push({ pid, qty });
    }
    if (!wanted.length) return res.status(400).json({ error: 'No valid items' });

    // Positionen serverseitig aufbauen (Stueckpreis tier-/mengenabhaengig)
    const lines = [];
    let subtotal = 0;
    const sellerSubtotal = new Map(); // sellerKey -> summierter Haendler-Umsatz dieser Bestellung
    for (const w of wanted) {
      const pr = await query(
        `SELECT p.id, p.price_usd, p.sale_mode, p.price_tiers, p.seller_id, p.shop_id, p.stock, p.is_china_seller, p.default_lang,
                (SELECT title FROM product_translations
                   WHERE product_id = p.id ORDER BY (lang = p.default_lang) DESC LIMIT 1) AS title
           FROM products p
          WHERE p.id = $1 AND p.active = true AND COALESCE(p.review_status, 'approved') = 'approved'`,
        [w.pid]
      );
      const p = pr.rows[0];
      if (!p) continue; // unbekanntes/inaktives Produkt -> ueberspringen

      // Mengenstaffel: Stueckpreis sinkt ab erreichter Mindestmenge (nur Grosshandel)
      const unitPrice = wholesaleUnitPrice(p, w.qty);
      const lineTotal = money(unitPrice * w.qty);

      // Haendler ermitteln (falls Produkt einem Verkaeufer gehoert)
      let merchantId = null;
      if (p.seller_id) {
        const m = await billingDb.ensureMerchant(p.seller_id);
        merchantId = m ? m.id : null;
      }

      const sellerKey = p.seller_id != null ? String(p.seller_id) : 'platform';
      sellerSubtotal.set(sellerKey, money((sellerSubtotal.get(sellerKey) || 0) + lineTotal));

      subtotal = money(subtotal + lineTotal);
      lines.push({
        productId: p.id, shopId: p.shop_id || null, merchantId, sellerKey,
        title: p.title || ('#' + p.id), qty: w.qty,
        unitPrice, lineTotal,
      });
    }
    if (!lines.length) return res.status(400).json({ error: 'No purchasable items' });

    // Degressive Provision PRO HAENDLER (Marginal-Staffel auf den Haendler-Umsatz),
    // dann als effektiver Mischsatz auf die Positionen des Haendlers verteilt, damit
    // order_items.commission_amount in Summe exakt der Staffel-Provision entspricht.
    const sellerEffRate = new Map();
    for (const [key, sub] of sellerSubtotal.entries()) {
      const comm = commissionForAmount(sub);
      sellerEffRate.set(key, sub > 0 ? comm / sub : COMMISSION_RATE);
    }
    for (const ln of lines) {
      const rate = sellerEffRate.has(ln.sellerKey) ? sellerEffRate.get(ln.sellerKey) : COMMISSION_RATE;
      ln.commissionRate = Math.round(rate * 10000) / 10000; // NUMERIC(5,4)
      ln.commission = money(ln.lineTotal * rate);
      ln.payout = money(ln.lineTotal - ln.commission);
    }

    // Versand serverseitig berechnen (autoritativ; Client-Wert wird NICHT vertraut).
    // 'shipping' vom Client ist nur die Methode (local/courier/dhl), kein Betrag.
    let shipCost = 0;
    try {
      const shipOut = await computeShippingForItems(wanted, {
        country: address && address.country,
        city: address && address.city,
        pickup_station_id: address && address.pickup_station_id,
      });
      shipCost = money(shipOut.shipping_usd);
    } catch (e) {
      console.error('[orders:shipping]', e.message);
      shipCost = 0;
    }
    const total = money(subtotal + shipCost);

    // Kaeufer NUR aus dem Login-Token, nie aus dem Request-Body. Sonst koennte
    // jeder eine Bestellung einem fremden Konto zuordnen. Kein oder ungueltiger
    // Token -> Gastbestellung (buyer_user_id = NULL), Checkout bleibt moeglich.
    let buyerUserId = null;
    let tokenEmail = null;
    {
      const hdr = (req.headers.authorization || '').trim();
      const tok = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
      const payload = tok ? verifyAccessToken(tok) : null;
      if (payload && payload.sub != null && !isNaN(parseInt(payload.sub, 10))) {
        buyerUserId = parseInt(payload.sub, 10);
        tokenEmail = payload.email || null;
      }
    }
    void user; // Body-Feld 'user' wird bewusst ignoriert (Altclients senden es noch)
    const email = tokenEmail || (address && address.email) || null;

    // Header anlegen
    // Wechselkurs EINFRIEREN. Ab hier steht fest, was diese Bestellung in
    // der Berichtswaehrung wert ist - auch wenn der Kurs sich bis zur
    // Auszahlung bewegt. Ohne das waeren Guthaben und Nachweise
    // rueckwirkend veraenderlich.
    const frozenFx = await fx.freezeForOrder(SALE_CURRENCY);

    const order = await billingDb.createOrder({
      buyerUserId, email, currency: SALE_CURRENCY,
      subtotal, shipping: shipCost, total, status: 'pending',
      address: address || {},
      fx: frozenFx,
    });

    // Positionen anlegen
    for (const ln of lines) {
      await billingDb.addOrderItem({
        orderId: order.id, productId: ln.productId, shopId: ln.shopId, merchantId: ln.merchantId,
        title: ln.title, qty: ln.qty, unitPrice: ln.unitPrice, lineTotal: ln.lineTotal,
        commissionRate: ln.commissionRate, commissionAmount: ln.commission, payoutAmount: ln.payout,
      });
    }

    res.json({
      success: true,
      order: {
        id: order.id, currency: order.currency,
        subtotal, shipping: shipCost, total, status: order.status,
        items: lines.map(l => ({ product_id: l.productId, title: l.title, qty: l.qty, unit_price: l.unitPrice, line_total: l.lineTotal })),
      },
    });
  } catch (err) {
    console.error('[orders:create]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ---- GET /api/orders : eigene Bestellungen (nur eingeloggt) ----
app.get('/api/orders', requireAuth, async (req, res) => {
  try {
    const r = await query(
      `SELECT id, currency, subtotal, shipping, total, status, created_at
         FROM orders
        WHERE buyer_user_id = $1
        ORDER BY created_at DESC
        LIMIT 100`,
      [req.user.id]
    );
    res.json({ data: r.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- GET /api/my/shipments : Sendungen des eingeloggten Kaeufers (Phase 2 Kaeufer-Sicht) ----
app.get('/api/my/shipments', requireAuth, async (req, res) => {
  try {
    const shipments = await shippingDb.listShipments({ buyerUserId: req.user.id, perPage: 200 });
    res.json({ shipments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- GET /api/admin/orders : alle Bestellungen + Positionen ----
app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    const r = await query(
      `SELECT o.id, o.email, o.currency, o.subtotal, o.shipping, o.total, o.status,
              o.address, o.created_at,
              COALESCE(json_agg(
                json_build_object(
                  'id', oi.id, 'title', oi.title, 'qty', oi.qty,
                  'unit_price', oi.unit_price, 'line_total', oi.line_total,
                  'merchant_id', oi.merchant_id, 'shop_id', oi.shop_id,
                  'commission_amount', oi.commission_amount, 'payout_amount', oi.payout_amount,
                  'payout_status', oi.payout_status
                ) ORDER BY oi.id
              ) FILTER (WHERE oi.id IS NOT NULL), '[]') AS items
         FROM orders o
         LEFT JOIN order_items oi ON oi.order_id = o.id
        GROUP BY o.id
        ORDER BY o.created_at DESC
        LIMIT 200`
    );
    res.json({ data: r.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   ADMIN ROUTES (Rest)
   ============================================================ */
app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const result = await query(`
      SELECT id, email, name, role, phone, country, email_verified,
             last_login_at, created_at
      FROM users ORDER BY created_at DESC
    `);
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/banners', requireAdmin, (req, res) => {
  res.json({ data: load('banners') || [] });
});

app.post('/api/admin/banners', requireAdmin, (req, res) => {
  const body = req.body || {};
  if (!body.image_url) return res.status(400).json({ error: 'Missing image_url' });
  const banners = load('banners') || [];
  const VALID_PL = ['hero', 'partner', 'side_left', 'side_right'];
  const placement = VALID_PL.indexOf(body.placement) !== -1 ? body.placement : 'hero';
  const banner = {
    id:         Date.now().toString(),
    title:      body.title || '',
    image_url:  body.image_url,
    media_type: body.media_type || (/\.(mp4|webm|mov)(\?|$)/i.test(body.image_url||'') ? 'video' : 'image'),
    link_url:   body.link_url || '',
    alt_text:   body.alt_text || '',
    placement:  placement,
    position:   Number.isFinite(+body.position) ? +body.position : 0,
    start_date: body.start_date || null,
    end_date:   body.end_date || null,
    active:     body.active !== undefined ? !!body.active : true,
    created_at: new Date().toISOString()
  };
  banners.push(banner);
  save('banners', banners);
  res.json({ success: true, banner: normalizeBanner(banner) });
});
// ADMIN: Banner aktualisieren (Toggle aktiv/inaktiv, Position ändern, Felder bearbeiten)
app.put('/api/admin/banners/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const banners = load('banners') || [];
  const idx = banners.findIndex(b => String(b.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Banner not found' });

  // Altes Bild merken (für R2-Cleanup falls ersetzt)
  const oldImageUrl = banners[idx].image_url;

  const allowed = ['title','image_url','media_type','link_url','alt_text',
                   'placement','position','active','start_date','end_date'];
  const VALID_PL = ['hero', 'partner', 'side_left', 'side_right'];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      banners[idx][key] =
        key === 'position'  ? (Number.isFinite(+req.body[key]) ? +req.body[key] : 0) :
        key === 'active'    ? !!req.body[key] :
        key === 'placement' ? (VALID_PL.indexOf(req.body[key]) !== -1 ? req.body[key] : 'hero') :
        req.body[key];
    }
  }
  banners[idx].updated_at = new Date().toISOString();
  save('banners', banners);

  // R2-Cleanup: wenn Bild geändert wurde, altes auf R2 löschen (fire-and-forget)
  const newImageUrl = banners[idx].image_url;
  if (oldImageUrl && newImageUrl && oldImageUrl !== newImageUrl) {
    tryDeleteR2Image(oldImageUrl);
  }

  res.json({ success: true, banner: normalizeBanner(banners[idx]) });
});
app.delete('/api/admin/banners/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let banners = load('banners') || [];

  // Banner finden bevor wir löschen (für R2-Cleanup)
  const banner = banners.find(b => String(b.id) === String(id));

  const before = banners.length;
  banners = banners.filter(b => String(b.id) !== String(id));
  save('banners', banners);

  // R2-Cleanup: Bild mitlöschen falls auf R2 (fire-and-forget)
  if (banner && banner.image_url) {
    tryDeleteR2Image(banner.image_url);
  }

  res.json({ success: true, deleted: before - banners.length });
});




/* ════════════════════════════════════════════════════════════════════
   SEO TEXTS — multilingual content blocks managed by admin
   Storage: JSON file (consistent with banners)
   Placement values: home_top, home_bottom, partner_section, custom
   Schema: { id, slug, placement, sort_order, active, translations:{en:{title,body},...}, created_at, updated_at }
   ════════════════════════════════════════════════════════════════════ */

function normalizeSeoText(s) {
  const VALID_PL = ['home_top', 'home_bottom', 'partner_section', 'custom'];
  const placement = VALID_PL.indexOf(s.placement) !== -1 ? s.placement : 'home_bottom';
  return {
    id:         s.id,
    slug:       s.slug || '',
    placement:  placement,
    sort_order: Number.isFinite(+s.sort_order) ? +s.sort_order : 0,
    active:     s.active !== false,
    translations: s.translations || {},
    created_at: s.created_at || null,
    updated_at: s.updated_at || null,
  };
}

// PUBLIC: get SEO texts by placement and language
app.get('/api/seo-texts', (req, res) => {
  const placement = req.query.placement || null;
  const lang = (req.query.lang || 'en').toLowerCase().slice(0, 5);
  let all = (load('seo_texts') || []).map(normalizeSeoText).filter(s => s.active);
  if (placement) all = all.filter(s => s.placement === placement);
  all.sort((a, b) => a.sort_order - b.sort_order);
  // Return single-language slim view for public
  const out = all.map(s => {
    const tr = s.translations[lang] || s.translations.en || { title: '', body: '' };
    return {
      id: s.id,
      slug: s.slug,
      placement: s.placement,
      sort_order: s.sort_order,
      title: tr.title || '',
      body:  tr.body  || ''
    };
  }).filter(x => x.title || x.body);
  res.json({ data: out });
});

// ADMIN: full list with all translations
app.get('/api/admin/seo-texts', requireAdmin, (req, res) => {
  const all = (load('seo_texts') || []).map(normalizeSeoText);
  all.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ data: all });
});

// ADMIN: create
app.post('/api/admin/seo-texts', requireAdmin, (req, res) => {
  const body = req.body || {};
  const VALID_PL = ['home_top', 'home_bottom', 'partner_section', 'custom'];
  const placement = VALID_PL.indexOf(body.placement) !== -1 ? body.placement : 'home_bottom';
  const item = {
    id:         'st_' + Date.now().toString(),
    slug:       String(body.slug || '').toLowerCase().replace(/[^a-z0-9-]+/g,'-').substring(0,80),
    placement:  placement,
    sort_order: Number.isFinite(+body.sort_order) ? +body.sort_order : 0,
    active:     body.active !== undefined ? !!body.active : true,
    translations: (body.translations && typeof body.translations === 'object') ? body.translations : {},
    created_at: new Date().toISOString()
  };
  const list = load('seo_texts') || [];
  list.push(item);
  save('seo_texts', list);
  res.json({ success: true, item: normalizeSeoText(item) });
});

// ADMIN: update
app.put('/api/admin/seo-texts/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const list = load('seo_texts') || [];
  const idx = list.findIndex(s => String(s.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'SEO text not found' });
  const VALID_PL = ['home_top', 'home_bottom', 'partner_section', 'custom'];
  const allowed = ['slug', 'placement', 'sort_order', 'active', 'translations'];
  for (const k of allowed) {
    if (req.body[k] === undefined) continue;
    if (k === 'placement') {
      list[idx][k] = VALID_PL.indexOf(req.body[k]) !== -1 ? req.body[k] : list[idx][k];
    } else if (k === 'sort_order') {
      list[idx][k] = Number.isFinite(+req.body[k]) ? +req.body[k] : 0;
    } else if (k === 'active') {
      list[idx][k] = !!req.body[k];
    } else if (k === 'translations') {
      // merge translations
      list[idx][k] = Object.assign({}, list[idx][k] || {}, req.body[k] || {});
    } else if (k === 'slug') {
      list[idx][k] = String(req.body[k] || '').toLowerCase().replace(/[^a-z0-9-]+/g,'-').substring(0,80);
    } else {
      list[idx][k] = req.body[k];
    }
  }
  list[idx].updated_at = new Date().toISOString();
  save('seo_texts', list);
  res.json({ success: true, item: normalizeSeoText(list[idx]) });
});

// ADMIN: delete
app.delete('/api/admin/seo-texts/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let list = load('seo_texts') || [];
  const before = list.length;
  list = list.filter(s => String(s.id) !== String(id));
  save('seo_texts', list);
  res.json({ success: true, deleted: before - list.length });
});



/* ════════════════════════════════════════════════════════════════════
   SEO TEXTS — KI-Generator (Admin)
   Erzeugt Titel + Body fuer mehrere Sprachen in EINEM Anthropic-Call.
   Nutzt denselben ANTHROPIC_API_KEY wie Parta. Modell via SEO_MODEL.
   POST /api/admin/seo-texts/generate   Body: { topic, placement, langs:[...] }
   Antwort: { success:true, translations: { en:{title,body}, de:{...}, ... } }
   ════════════════════════════════════════════════════════════════════ */
const SEO_MODEL = process.env.SEO_MODEL || 'claude-sonnet-4-6';
const SEO_LANG_NAMES = {
  en: 'English', de: 'German', fr: 'French', pt: 'Portuguese',
  sw: 'Swahili', es: 'Spanish', ar: 'Arabic', tr: 'Turkish', ln: 'Lingala',
};
const SEO_PLACEMENT_HINT = {
  home_top:        'a short, punchy hero/intro block at the very top of the homepage',
  home_bottom:     'a longer, keyword-rich SEO text block at the bottom of the homepage',
  partner_section: 'a trust-building block aimed at sellers/partners who want to list parts',
  custom:          'a general marketing/SEO content block',
};

app.post('/api/admin/seo-texts/generate', requireAdmin, async (req, res) => {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({ error: 'KI ist nicht konfiguriert (ANTHROPIC_API_KEY fehlt in Render).' });
    }
    const body = req.body || {};
    const topic = String(body.topic || '').trim().slice(0, 600);
    if (!topic) return res.status(400).json({ error: 'Bitte ein Thema / Stichworte eingeben.' });

    const VALID_PL = ['home_top', 'home_bottom', 'partner_section', 'custom'];
    const placement = VALID_PL.indexOf(body.placement) !== -1 ? body.placement : 'home_bottom';

    // Sprachen validieren + begrenzen
    const VALID = Object.keys(SEO_LANG_NAMES);
    let langs = Array.isArray(body.langs) ? body.langs : VALID;
    langs = langs.filter((l) => VALID.indexOf(l) !== -1);
    if (!langs.length) langs = VALID.slice();
    langs = langs.slice(0, 9);

    const langList = langs.map((l) => '"' + l + '" (' + SEO_LANG_NAMES[l] + ')').join(', ');
    const placementHint = SEO_PLACEMENT_HINT[placement] || SEO_PLACEMENT_HINT.custom;

    const system =
      'You are an SEO copywriter for AFCARPARTS, an online marketplace for new, used and wholesale ' +
      'auto spare parts serving customers across Africa. ' +
      'Write a content block that is ' + placementHint + '. ' +
      'For EACH requested language produce: a concise, keyword-rich "title" (about 50-70 characters) ' +
      'and a "body" of roughly 2-4 sentences (plain text, NO HTML, natural and trustworthy, not spammy). ' +
      'Write genuinely in each language — translate the meaning idiomatically, do not just copy the English wording. ' +
      'Respond with STRICT JSON only: no markdown, no code fences, no commentary before or after. ' +
      'Exact shape: {"<lang>":{"title":"...","body":"..."}, ...} ' +
      'Use exactly these language keys: ' + langList + '.';

    const userMsg = 'Topic / keywords for the SEO block:\n' + topic + '\n\nReturn the JSON object now.';

    const ar = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: SEO_MODEL,
        max_tokens: 2500,
        system,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });
    const data = await ar.json().catch(() => ({}));
    if (!ar.ok) {
      console.error('[seo-ai] anthropic', ar.status, JSON.stringify(data).slice(0, 300));
      return res.status(502).json({ error: 'KI-Dienst nicht erreichbar (Guthaben/Limit in der Anthropic-Konsole prüfen).' });
    }

    let raw = (data.content || [])
      .filter((b) => b && b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    // Etwaige Code-Fences entfernen
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) { try { parsed = JSON.parse(m[0]); } catch (e2) { parsed = null; } }
    }
    if (!parsed || typeof parsed !== 'object') {
      console.error('[seo-ai] parse failed:', raw.slice(0, 300));
      return res.status(502).json({ error: 'KI-Antwort konnte nicht verarbeitet werden. Bitte erneut versuchen.' });
    }

    // Nur erlaubte Sprachen + saubere Strings durchlassen
    const translations = {};
    for (const l of langs) {
      const v = parsed[l];
      if (v && typeof v === 'object') {
        const title = String(v.title || '').trim().slice(0, 200);
        const bodyTxt = String(v.body || '').trim().slice(0, 2000);
        if (title || bodyTxt) translations[l] = { title: title, body: bodyTxt };
      }
    }
    if (!Object.keys(translations).length) {
      return res.status(502).json({ error: 'KI-Antwort war leer. Bitte erneut versuchen.' });
    }

    res.json({ success: true, translations: translations });
  } catch (err) {
    console.error('[seo-ai]', err.message);
    res.status(500).json({ error: err.message });
  }
});



/* ============================================================
   FOOTER-CMS  (site_pages + site_settings)
   - Statische Seiten (About, Blog, FAQ, Terms, Privacy, Cookies)
     mehrsprachig als JSONB:  { "en": {"title","body"}, "de": {...} }
   - Kontakt-E-Mail in site_settings (key = 'contact_email')
   - Migration einmal aufrufen:
     GET /api/migrate-footer?secret=MIGRATION_SECRET
   ============================================================ */

const FOOTER_PAGE_SLUGS = ['about', 'blog', 'faq', 'terms', 'privacy', 'cookies', 'dealer-terms', 'imprint', 'shipping', 'returns'];

const FOOTER_PAGE_SEED = {
  about: {
    en: { title: 'About us', body: 'AFRICARPARTS is Africa\'s marketplace for new, used and wholesale auto spare parts.\n\nWe connect buyers across Africa with verified sellers from Africa, Europe and China - with multilingual support, local payment methods and transparent seller shops.\n\nThis page can be edited in the admin panel under "Footer & Pages".' },
    de: { title: 'Über uns', body: 'AFRICARPARTS ist Afrikas Marktplatz für neue, gebrauchte und Großhandels-Autoersatzteile.\n\nWir verbinden Käufer in ganz Afrika mit verifizierten Händlern aus Afrika, Europa und China - mit mehrsprachigem Support, lokalen Zahlungsmethoden und transparenten Händler-Shops.\n\nDiese Seite kann im Admin-Bereich unter "Footer & Seiten" bearbeitet werden.' },
    fr: { title: 'À propos de nous', body: 'AFRICARPARTS est la place de marché africaine pour les pièces auto neuves, d\'occasion et en gros.\n\nNous connectons les acheteurs de toute l\'Afrique avec des vendeurs vérifiés d\'Afrique, d\'Europe et de Chine - avec un support multilingue, des moyens de paiement locaux et des boutiques transparentes.' },
    pt: { title: 'Sobre nós', body: 'A AFRICARPARTS é o marketplace africano de peças auto novas, usadas e por atacado.\n\nLigamos compradores de toda a África a vendedores verificados de África, Europa e China - com suporte multilingue, métodos de pagamento locais e lojas transparentes.' },
    sw: { title: 'Kuhusu sisi', body: 'AFRICARPARTS ni soko la Afrika la vipuri vipya, vilivyotumika na vya jumla.\n\nTunaunganisha wanunuzi kote Afrika na wauzaji waliothibitishwa kutoka Afrika, Ulaya na China - kwa msaada wa lugha nyingi, njia za malipo za ndani na maduka ya wazi.' }
  },
  blog: {
    en: { title: 'Blog', body: 'Our blog is coming soon. Here you will find guides, buying advice and news about the African auto parts market.' },
    de: { title: 'Blog', body: 'Unser Blog startet in Kürze. Hier findest du bald Ratgeber, Kauftipps und Neuigkeiten rund um den afrikanischen Ersatzteilmarkt.' },
    fr: { title: 'Blog', body: 'Notre blog arrive bientôt. Vous y trouverez des guides, des conseils d\'achat et des actualités sur le marché africain des pièces auto.' },
    pt: { title: 'Blog', body: 'O nosso blog chega em breve. Aqui encontrará guias, conselhos de compra e notícias sobre o mercado africano de peças auto.' },
    sw: { title: 'Blogu', body: 'Blogu yetu inakuja hivi karibuni. Hapa utapata miongozo, ushauri wa ununuzi na habari kuhusu soko la vipuri la Afrika.' }
  },
  faq: {
    en: { title: 'FAQ', body: 'How do I order?\nSearch for your part, add it to the cart and check out with your preferred payment method.\n\nHow do I become a seller?\nRegister via "Sell parts" and create your shop. Verified sellers get a shop badge.\n\nWhich payment methods are supported?\nMobile Money, bank transfer and cash on delivery - depending on your country.' },
    de: { title: 'FAQ', body: 'Wie bestelle ich?\nSuche dein Teil, lege es in den Warenkorb und schließe die Bestellung mit deiner bevorzugten Zahlungsmethode ab.\n\nWie werde ich Händler?\nRegistriere dich über "Teile verkaufen" und erstelle deinen Shop. Verifizierte Händler erhalten ein Shop-Badge.\n\nWelche Zahlungsmethoden gibt es?\nMobile Money, Banküberweisung und Nachnahme - je nach Land.' },
    fr: { title: 'FAQ', body: 'Comment commander ?\nRecherchez votre pièce, ajoutez-la au panier et finalisez avec votre moyen de paiement préféré.\n\nComment devenir vendeur ?\nInscrivez-vous via "Vendre des pièces" et créez votre boutique.\n\nQuels moyens de paiement ?\nMobile Money, virement bancaire et paiement à la livraison - selon votre pays.' },
    pt: { title: 'FAQ', body: 'Como encomendar?\nPesquise a sua peça, adicione ao carrinho e finalize com o seu método de pagamento preferido.\n\nComo me torno vendedor?\nRegiste-se através de "Vender peças" e crie a sua loja.\n\nQue métodos de pagamento existem?\nMobile Money, transferência bancária e pagamento na entrega - conforme o país.' },
    sw: { title: 'Maswali', body: 'Ninawezaje kuagiza?\nTafuta kipuri chako, kiweke kwenye kikapu na ukamilishe kwa njia yako ya malipo.\n\nNinawezaje kuwa muuzaji?\nJisajili kupitia "Uza vipuri" na uunde duka lako.\n\nNjia gani za malipo zinakubaliwa?\nMobile Money, uhamisho wa benki na malipo wakati wa kupokea - kulingana na nchi.' }
  },
  terms: {
    en: { title: 'Terms & Conditions', body: 'These terms govern the use of the AFRICARPARTS marketplace.\n\nPlaceholder - please replace with your legal terms in the admin panel under "Footer & Pages".' },
    de: { title: 'AGB', body: 'Diese Bedingungen regeln die Nutzung des AFRICARPARTS-Marktplatzes.\n\nPlatzhalter - bitte im Admin-Bereich unter "Footer & Seiten" durch deine rechtlichen AGB ersetzen.' },
    fr: { title: 'Conditions générales', body: 'Ces conditions régissent l\'utilisation de la place de marché AFRICARPARTS.\n\nTexte provisoire - à remplacer dans le panneau d\'administration.' },
    pt: { title: 'Termos e condições', body: 'Estes termos regem a utilização do marketplace AFRICARPARTS.\n\nTexto provisório - substitua no painel de administração.' },
    sw: { title: 'Sheria na masharti', body: 'Masharti haya yanasimamia matumizi ya soko la AFRICARPARTS.\n\nMaandishi ya muda - tafadhali badilisha kwenye paneli ya usimamizi.' }
  },
  privacy: {
    en: { title: 'Privacy Policy', body: 'We take the protection of your personal data seriously.\n\nPlaceholder - please replace with your privacy policy in the admin panel under "Footer & Pages".' },
    de: { title: 'Datenschutz', body: 'Wir nehmen den Schutz deiner persönlichen Daten ernst.\n\nPlatzhalter - bitte im Admin-Bereich unter "Footer & Seiten" durch deine Datenschutzerklärung ersetzen.' },
    fr: { title: 'Politique de confidentialité', body: 'Nous prenons la protection de vos données personnelles au sérieux.\n\nTexte provisoire - à remplacer dans le panneau d\'administration.' },
    pt: { title: 'Política de privacidade', body: 'Levamos a sério a proteção dos seus dados pessoais.\n\nTexto provisório - substitua no painel de administração.' },
    sw: { title: 'Sera ya faragha', body: 'Tunachukulia kwa uzito ulinzi wa data zako binafsi.\n\nMaandishi ya muda - tafadhali badilisha kwenye paneli ya usimamizi.' }
  },
  cookies: {
    en: { title: 'Cookie Policy', body: 'AFRICARPARTS uses only technically necessary storage (e.g. language, currency, login) in your browser.\n\nPlaceholder - editable in the admin panel under "Footer & Pages".' },
    de: { title: 'Cookie-Richtlinie', body: 'AFRICARPARTS verwendet nur technisch notwendige Speicherung (z. B. Sprache, Währung, Login) in deinem Browser.\n\nPlatzhalter - im Admin-Bereich unter "Footer & Seiten" bearbeitbar.' },
    fr: { title: 'Politique de cookies', body: 'AFRICARPARTS n\'utilise que le stockage techniquement nécessaire (langue, devise, connexion) dans votre navigateur.\n\nTexte provisoire - modifiable dans le panneau d\'administration.' },
    pt: { title: 'Política de cookies', body: 'A AFRICARPARTS utiliza apenas armazenamento tecnicamente necessário (idioma, moeda, login) no seu navegador.\n\nTexto provisório - editável no painel de administração.' },
    sw: { title: 'Sera ya vidakuzi', body: 'AFRICARPARTS hutumia tu hifadhi muhimu kiufundi (lugha, sarafu, kuingia) kwenye kivinjari chako.\n\nMaandishi ya muda - yanaweza kuhaririwa kwenye paneli ya usimamizi.' }
  },
  'dealer-terms': {
    en: { title: 'Seller Terms & Conditions', body: 'These seller terms govern the participation of sellers on the AFRICARPARTS marketplace - including registration, shop approval, subscription, commission per sale and payouts.\n\nPlaceholder - please replace with your legal seller terms in the admin panel under "Footer & Pages".' },
    de: { title: 'H\u00e4ndler-AGB', body: 'Diese H\u00e4ndler-AGB regeln die Teilnahme von H\u00e4ndlern am AFRICARPARTS-Marktplatz - unter anderem Registrierung, Shop-Freischaltung, Abo, Provision je Verkauf und Auszahlungen.\n\nPlatzhalter - bitte im Admin-Bereich unter "Footer & Seiten" durch deine rechtlichen H\u00e4ndler-AGB ersetzen.' },
    fr: { title: 'CGV vendeurs', body: 'Ces conditions r\u00e9gissent la participation des vendeurs \u00e0 la place de march\u00e9 AFRICARPARTS - inscription, validation de la boutique, abonnement, commission par vente et versements.\n\nTexte provisoire - \u00e0 remplacer dans le panneau d\u2019administration.' },
    pt: { title: 'Termos para vendedores', body: 'Estes termos regem a participa\u00e7\u00e3o dos vendedores no marketplace AFRICARPARTS - registo, aprova\u00e7\u00e3o da loja, subscri\u00e7\u00e3o, comiss\u00e3o por venda e pagamentos.\n\nTexto provis\u00f3rio - substitua no painel de administra\u00e7\u00e3o.' },
    es: { title: 'Condiciones para vendedores', body: 'Estas condiciones regulan la participaci\u00f3n de los vendedores en el marketplace AFRICARPARTS - registro, aprobaci\u00f3n de la tienda, suscripci\u00f3n, comisi\u00f3n por venta y pagos.\n\nTexto provisional - sustit\u00fayalo en el panel de administraci\u00f3n.' },
    ar: { title: '\u0634\u0631\u0648\u0637 \u0627\u0644\u0628\u0627\u0626\u0639\u064a\u0646', body: '\u062a\u0646\u0638\u0645 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0628\u0627\u0626\u0639\u064a\u0646 \u0641\u064a \u0633\u0648\u0642 AFRICARPARTS - \u0627\u0644\u062a\u0633\u062c\u064a\u0644\u060c \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0645\u062a\u062c\u0631\u060c \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643\u060c \u0627\u0644\u0639\u0645\u0648\u0644\u0629 \u0644\u0643\u0644 \u0639\u0645\u0644\u064a\u0629 \u0628\u064a\u0639 \u0648\u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a.\n\n\u0646\u0635 \u0645\u0624\u0642\u062a - \u064a\u0631\u062c\u0649 \u0627\u0633\u062a\u0628\u062f\u0627\u0644\u0647 \u0641\u064a \u0644\u0648\u062d\u0629 \u0627\u0644\u0625\u062f\u0627\u0631\u0629.' },
    tr: { title: 'Sat\u0131c\u0131 \u015fartlar\u0131', body: 'Bu \u015fartlar, sat\u0131c\u0131lar\u0131n AFRICARPARTS pazar yerine kat\u0131l\u0131m\u0131n\u0131 d\u00fczenler - kay\u0131t, ma\u011faza onay\u0131, abonelik, sat\u0131\u015f ba\u015f\u0131na komisyon ve \u00f6demeler.\n\nGe\u00e7ici metin - l\u00fctfen y\u00f6netim panelinde de\u011fi\u015ftirin.' },
    sw: { title: 'Masharti ya wauzaji', body: 'Masharti haya yanasimamia ushiriki wa wauzaji kwenye soko la AFRICARPARTS - usajili, uidhinishaji wa duka, usajili wa mpango, kamisheni kwa kila mauzo na malipo.\n\nMaandishi ya muda - tafadhali badilisha kwenye paneli ya usimamizi.' },
    ln: { title: 'Mibeko ya bateki', body: 'Mibeko oyo etali bateki na zando ya AFRICARPARTS - kokomisa nkombo, kondimama ya magazini, abonnement, komisio na boteki moko na moko mpe bofuti mbongo.\n\nMakomi ya tango moke - bongola yango na esika ya administration.' }
  },
  // Neu: Impressum, Versand, Rueckgabe (Platzhalter, per /api/migrate-footer geseedet)
  "imprint": {"en": {"title": "Legal Notice", "body": "Placeholder - please insert the legal notice in the admin panel under \"Footer & Pages\"."}, "de": {"title": "Impressum", "body": "Platzhalter - bitte im Admin-Bereich unter \"Footer & Seiten\" das Impressum eintragen."}},
  "shipping": {"en": {"title": "Shipping Policy", "body": "Placeholder - please insert the shipping policy in the admin panel under \"Footer & Pages\"."}, "de": {"title": "Versandrichtlinie", "body": "Platzhalter - bitte im Admin-Bereich unter \"Footer & Seiten\" die Versandrichtlinie eintragen."}},
  "returns": {"en": {"title": "Returns and Withdrawal Policy", "body": "Placeholder - please insert the returns policy in the admin panel under \"Footer & Pages\"."}, "de": {"title": "Rückgabe- und Widerrufsrichtlinie", "body": "Platzhalter - bitte im Admin-Bereich unter \"Footer & Seiten\" die Rückgaberichtlinie eintragen."}}
};

// Einmal aufrufen: GET /api/migrate-footer?secret=MIGRATION_SECRET
app.get('/api/migrate-footer', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });

  const log = [];
  try {
    await query(`CREATE TABLE IF NOT EXISTS site_pages (
      slug TEXT PRIMARY KEY,
      content JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
    log.push('table site_pages ok');

    await query(`CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
    log.push('table site_settings ok');

    // Seiten seeden - vorhandene Inhalte werden NICHT ueberschrieben (idempotent)
    for (const slug of FOOTER_PAGE_SLUGS) {
      const r = await query(
        `INSERT INTO site_pages (slug, content) VALUES ($1, $2::jsonb)
         ON CONFLICT (slug) DO NOTHING`,
        [slug, JSON.stringify(FOOTER_PAGE_SEED[slug])]
      );
      log.push(`page ${slug}: ${r.rowCount ? 'seeded' : 'exists (kept)'}`);
    }

    // Kontakt-E-Mail seeden (idempotent)
    const e = await query(
      `INSERT INTO site_settings (key, value) VALUES ('contact_email', 'ziko.miguel@live.de')
       ON CONFLICT (key) DO NOTHING`
    );
    log.push(`setting contact_email: ${e.rowCount ? 'seeded' : 'exists (kept)'}`);

    res.json({ ok: true, log });
  } catch (err) {
    console.error('[migrate-footer]', err.message);
    res.status(500).json({ ok: false, log, error: err.message });
  }
});

// Oeffentlich: Seiteninhalt in gewuenschter Sprache (Fallback EN)
app.get('/api/pages/:slug', async (req, res) => {
  try {
    const slug = String(req.params.slug || '').toLowerCase();
    if (!FOOTER_PAGE_SLUGS.includes(slug)) return res.status(404).json({ error: 'Page not found' });

    const r = await query(`SELECT content, updated_at FROM site_pages WHERE slug = $1`, [slug]);
    if (!r.rows.length) return res.status(404).json({ error: 'Page not found (run /api/migrate-footer)' });

    const content = r.rows[0].content || {};
    const lang = String(req.query.lang || (req.headers['accept-language'] || 'en').slice(0, 2)).toLowerCase();
    const entry = content[lang] || content.en || Object.values(content)[0] || { title: slug, body: '' };

    res.json({ slug, lang: content[lang] ? lang : 'en', title: entry.title || slug, body: entry.body || '', updated_at: r.rows[0].updated_at });
  } catch (err) {
    console.error('[pages]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Oeffentlich: Kontakt-E-Mail (fuer mailto auf der Kontaktseite)
app.get('/api/site-settings/contact-email', async (req, res) => {
  try {
    const r = await query(`SELECT value FROM site_settings WHERE key = 'contact_email'`);
    res.json({ email: (r.rows[0] && r.rows[0].value) || 'ziko.miguel@live.de' });
  } catch (err) {
    res.json({ email: 'ziko.miguel@live.de' });
  }
});

// Admin: alle Seiten inkl. aller Sprachen
app.get('/api/admin/pages', requireAdmin, async (req, res) => {
  try {
    const r = await query(`SELECT slug, content, updated_at FROM site_pages ORDER BY slug`);
    res.json({ pages: r.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: eine Sprache einer Seite speichern  { lang, title, body }
app.put('/api/admin/pages/:slug', requireAdmin, async (req, res) => {
  try {
    const slug = String(req.params.slug || '').toLowerCase();
    if (!FOOTER_PAGE_SLUGS.includes(slug)) return res.status(404).json({ error: 'Page not found' });

    const lang = String(req.body.lang || '').toLowerCase();
    if (!lang || lang.length > 5) return res.status(400).json({ error: 'lang required' });

    const entry = { title: String(req.body.title || ''), body: String(req.body.body || '') };
    const r = await query(
      `UPDATE site_pages
          SET content = jsonb_set(COALESCE(content, '{}'::jsonb), ARRAY[$2], $3::jsonb, true),
              updated_at = now()
        WHERE slug = $1
        RETURNING slug`,
      [slug, lang, JSON.stringify(entry)]
    );
    if (!r.rows.length) return res.status(404).json({ error: 'Page not found (run /api/migrate-footer)' });
    res.json({ ok: true, slug, lang });
  } catch (err) {
    console.error('[admin pages put]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Kontakt-E-Mail speichern  { email }
app.put('/api/admin/site-settings/contact-email', requireAdmin, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });
    await query(
      `INSERT INTO site_settings (key, value) VALUES ('contact_email', $1)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [email]
    );
    res.json({ ok: true, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Versand & Treuhand (Tarife, Tracking-Pruefung, Freigaben, Admin-Board)

/* ============================================================
   PRODUKT-FREIGABE + HAENDLER-UEBERSICHT + WECHSELKURSE
   - products.review_status: pending | approved | rejected
     Oeffentlich sichtbar ist nur active = true UND approved.
   - Spalten werden beim Start automatisch angelegt (idempotent),
     /api/migrate-product-review markiert zusaetzlich Altprodukte
     nicht freigegebener Haendler als "pending".
   ============================================================ */
async function ensureProductReviewSchema() {
  await query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS review_status TEXT NOT NULL DEFAULT 'approved'`);
  await query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS review_note TEXT`);
  await query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ`);
  await query(`CREATE INDEX IF NOT EXISTS idx_products_review ON products (review_status)`);
}
ensureProductReviewSchema()
  .then(() => console.log('[review] Produkt-Freigabe bereit'))
  .catch((e) => console.error('[review] Schema:', e.message));

app.get('/api/migrate-product-review', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });
  try {
    await ensureProductReviewSchema();
    // Produkte von Haendlern ohne freigegebenen Shop -> zur Pruefung
    const r = await query(`
      UPDATE products p SET review_status = 'pending'
       WHERE p.seller_id IS NOT NULL
         AND COALESCE(p.review_status, 'approved') = 'approved'
         AND EXISTS (SELECT 1 FROM users u WHERE u.id = p.seller_id AND u.role <> 'admin')
         AND NOT EXISTS (SELECT 1 FROM shops s WHERE s.owner_id = p.seller_id AND s.active = true)`);
    res.json({ ok: true, message: 'Produkt-Freigabe bereit', set_pending: r.rowCount });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Haendler verifizieren (KYC) - Auswahl in der Haendler-Verwaltung.
// Status liegt in merchants.kyc_status; fehlt der Merchant-Eintrag, wird er angelegt.
// Verifizierte Haendler sind "vertrauenswuerdig": ihre Produkte gehen ohne Pruefung online.
app.put('/api/admin/shops/:id/kyc', requireAdmin, async (req, res) => {
  const status = String((req.body && req.body.status) || '');
  if (!['none', 'pending', 'verified', 'rejected'].includes(status)) return res.status(400).json({ error: 'status ungueltig' });
  try {
    const sh = await query('SELECT id, owner_id, name FROM shops WHERE id = $1', [req.params.id]);
    const shop = sh.rows[0];
    if (!shop) return res.status(404).json({ error: 'Shop nicht gefunden' });
    if (!shop.owner_id) return res.status(400).json({ error: 'Shop hat keinen Besitzer (owner_id fehlt)' });
    await query(
      `INSERT INTO merchants (user_id, kyc_status) VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE SET kyc_status = EXCLUDED.kyc_status, updated_at = now()`,
      [shop.owner_id, status]);
    // Optional: offene Produkte dieses Haendlers direkt mit freigeben
    let approved = 0;
    if (status === 'verified' && req.body.approve_pending) {
      const u = await query(`UPDATE products SET review_status = 'approved', review_note = NULL, reviewed_at = now()
                              WHERE seller_id = $1 AND review_status = 'pending'`, [shop.owner_id]);
      approved = u.rowCount;
    }
    const pend = await query(`SELECT count(*)::int AS n FROM products WHERE seller_id = $1 AND review_status = 'pending'`, [shop.owner_id])
      .catch(() => ({ rows: [{ n: 0 }] }));
    res.json({ ok: true, shop_id: shop.id, kyc_status: status, approved, pending_products: pend.rows[0].n });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Anzahl offener Pruefungen (fuer das Admin-Dashboard)
app.get('/api/admin/products/review-count', requireAdmin, async (req, res) => {
  try {
    const r = await query(`SELECT count(*)::int AS n FROM products WHERE review_status = 'pending'`);
    res.json({ pending: r.rows[0].n });
  } catch (err) { res.json({ pending: 0 }); }
});

// Freigeben / Ablehnen / zurueck in Pruefung
app.post('/api/admin/products/:id/review', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const status = String((req.body && req.body.status) || '');
  const note = (req.body && req.body.note) ? String(req.body.note).slice(0, 500) : null;
  if (!id || !['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ error: 'id/status ungueltig' });
  try {
    const r = await query(
      `UPDATE products SET review_status = $2, review_note = $3, reviewed_at = now() WHERE id = $1 RETURNING id`,
      [id, status, status === 'approved' ? null : note]);
    if (!r.rows.length) return res.status(404).json({ error: 'Produkt nicht gefunden' });
    if (status !== 'pending') mailer.notifyProductReviewed(id, status, note); // wirft nie
    res.json({ ok: true, id, status });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Mehrere Produkte eines Haendlers auf einmal freigeben/ablehnen
app.post('/api/admin/products/review-bulk', requireAdmin, async (req, res) => {
  const ids = Array.isArray(req.body && req.body.ids) ? req.body.ids.map((x) => parseInt(x, 10)).filter(Boolean).slice(0, 500) : [];
  const status = String((req.body && req.body.status) || '');
  if (!ids.length || !['approved', 'rejected'].includes(status)) return res.status(400).json({ error: 'ids/status ungueltig' });
  try {
    const r = await query(`UPDATE products SET review_status = $2, review_note = NULL, reviewed_at = now() WHERE id = ANY($1::int[]) RETURNING id`, [ids, status]);
    res.json({ ok: true, updated: r.rowCount });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Wechselkurse fuer die Shop-Anzeige (oeffentlich, 1 h im Speicher)
const FX_DISPLAY = ['EUR','GBP','AED','ZAR','NGN','GHS','KES','TZS','UGX','RWF','XOF','XAF','CDF','AOA','MZN','ZMW','EGP','MAD','ETB','CNY'];
let _fxCache = { at: 0, data: null };
app.get('/api/fx/rates', async (req, res) => {
  try {
    if (!_fxCache.data || Date.now() - _fxCache.at > 3600 * 1000) {
      const rates = { USD: 1 };
      await Promise.all(FX_DISPLAY.map(async (c) => {
        try { const r = await fx.getRate('USD', c); if (r && r.rate > 0) rates[c] = Number(r.rate); } catch (e) {}
      }));
      if (Object.keys(rates).length > 1) _fxCache = { at: Date.now(), data: { base: 'USD', rates, updated: new Date().toISOString() } };
    }
    if (!_fxCache.data) return res.status(503).json({ error: 'Kurse nicht verfuegbar' });
    res.set('Cache-Control', 'public, max-age=1800');
    res.json(_fxCache.data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

mailer.register(app, { requireAdmin });
require('./shippingV2Routes')(app, {
  requireAuth, requireSeller, requireAdmin,
  resolveSellerScope, blockFinancialInAdminView,
});
/* ============================================================
   ERROR HANDLING
   ============================================================ */
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl });
});

app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.status(404).json({ error: 'index.html not found in ' + publicDir });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, HOST, () => {
  console.log(`AFRICARPARTS API running on port ${PORT}`);
});
