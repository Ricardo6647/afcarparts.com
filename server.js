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
    }

    await payments.markWebhookDone('stripe', evt.eventId);
    res.json({ received: true });
  } catch (err) {
    console.error('[stripe webhook]', err.message);
    // 400 -> Stripe weiss, dass es nicht erfolgreich war
    res.status(400).json({ error: err.message });
  }
});

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
      'stripe', d.providerSubscriptionId, d.status, d.currentPeriodEnd
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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language', 'x-migration-secret']
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
const publicDir = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : __dirname;
app.use(express.static(publicDir, { index: 'index.html', extensions: ['html'], maxAge: 0 }));
console.log('Frontend wird ausgeliefert aus:', publicDir);

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
  const xff = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return xff || req.ip || '';
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

app.get('/api/db-test', async (req, res) => {
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
         provider TEXT NOT NULL CHECK (provider IN ('stripe','flutterwave','payoneer')),
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
         provider TEXT NOT NULL CHECK (provider IN ('stripe','flutterwave','payoneer')),
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
         provider TEXT NOT NULL CHECK (provider IN ('stripe','flutterwave','payoneer')),
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
         provider TEXT NOT NULL CHECK (provider IN ('stripe','flutterwave','payoneer')),
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
         provider TEXT NOT NULL CHECK (provider IN ('stripe','flutterwave','payoneer')),
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

const PLAN_LIMITS = { basic: 10, pro: 100 };
const APP_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://afcarparts.com';

// Abo starten -> liefert gehostete Stripe-Checkout-URL zurueck
app.post('/api/billing/subscribe', requireSeller, async (req, res) => {
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
      successUrl: `${APP_BASE_URL}/seller-dashboard.html?abo=success`,
      cancelUrl: `${APP_BASE_URL}/seller-dashboard.html?abo=cancel`,
    });
    res.json({ url });
  } catch (err) {
    console.error('[billing/subscribe]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Stripe-Kundenportal (verwalten / kuendigen)
app.post('/api/billing/portal', requireSeller, async (req, res) => {
  try {
    const merchant = await billingDb.getMerchantByUserId(req.user.id);
    if (!merchant) return res.status(404).json({ error: 'Kein Haendlerkonto' });
    const acct = await billingDb.getProviderAccount(merchant.id, 'stripe', 'customer');
    if (!acct || !acct.external_id) return res.status(400).json({ error: 'Kein Stripe-Kunde vorhanden' });

    const stripe = payments.getProvider('stripe');
    const url = await stripe.createBillingPortal({
      customerId: acct.external_id,
      returnUrl: `${APP_BASE_URL}/seller-dashboard.html`,
    });
    res.json({ url });
  } catch (err) {
    console.error('[billing/portal]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Abo-Status (fuer Dashboard-Anzeige und Zugangslogik)
app.get('/api/billing/status', requireSeller, async (req, res) => {
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
             (SELECT COUNT(*)::int FROM products p WHERE p.category_id = c.id) AS product_count
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

app.post('/api/auth/register', async (req, res) => {
  try {
    const user = await userDb.registerUser(req.body || {});
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

app.post('/api/auth/login', async (req, res) => {
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

app.post('/api/auth/request-password-reset', async (req, res) => {
  const token = await userDb.requestPasswordReset(req.body?.email);
  if (token) console.log('[PASSWORD_RESET]', req.body?.email, '→', token);
  res.json({ ok: true });
});

app.post('/api/auth/reset-password', async (req, res) => {
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
      WHERE p.shop_id = $2 AND p.active = TRUE
      ORDER BY p.created_at DESC LIMIT 50
    `, [lang, shop.id]);
    res.json({ shop, products: productsRes.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/shops', requireAdmin, async (req, res) => {
  try {
    const shops = await query(`SELECT * FROM shops ORDER BY created_at DESC`);
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
  const { name, slug, owner_id, country, city, email, phone, is_china, logo_url, translations } = req.body || {};
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
      is_china: !!is_china, logo_url: logo_url || null, active: true
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
  const { name, slug, owner_id, country, city, email, phone, is_china, logo_url, active, translations } = req.body || {};
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
    if (active !== undefined) updates.active = !!active;
    if (Object.keys(updates).length > 0) await db.update('shops', id, updates);
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
      china_only, tags, shop_id, sort = 'newest', page = 1, limit = 24 } = req.query;
    const conditions = ['p.active = TRUE'];
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
    // COUNT-Query nutzt params.slice(1) (ohne lang) — daher Platzhalter $2→$1, $3→$2 etc. umnummerieren
    const countWhere = where.replace(/\$(\d+)/g, (_, n) => '$' + (parseInt(n, 10) - 1));
    const countRes = await query(`SELECT COUNT(*) AS c FROM products p ${countWhere}`, params.slice(1));
    const total = parseInt(countRes.rows[0].c, 10);
    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
    const offset = (pg - 1) * lim;
    params.push(lim, offset);
    const result = await query(`
      SELECT p.id, p.price_usd, p.brand, p.model, p.oem, p.condition,
        p.category_id, p.shop_id, p.images, p.stock, p.is_china_seller,
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
      WHERE p.id = $2 AND p.active = TRUE
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
    const products = await query(`SELECT * FROM products ORDER BY created_at DESC`);
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
    category_id, shop_id, seller_id, condition, stock, is_china_seller, images, tags } = req.body || {};
  if (!default_lang || !SUPPORTED_LANGS.includes(default_lang)) return res.status(400).json({ error: 'default_lang must be one of: ' + SUPPORTED_LANGS.join(', ') });
  if (!translations || typeof translations !== 'object') return res.status(400).json({ error: 'Missing translations object' });
  if (!translations[default_lang] || !translations[default_lang].title || !translations[default_lang].title.trim()) return res.status(400).json({ error: `Title in default language (${default_lang}) is required` });
  if (price_usd === undefined || price_usd === null || isNaN(parseFloat(price_usd))) return res.status(400).json({ error: 'Valid price_usd is required' });
  try {
    const newProd = await db.insert('products', {
      default_lang, price_usd: parseFloat(price_usd),
      brand: brand ? brand.trim() : null, model: model ? model.trim() : null,
      oem: oem ? oem.trim() : null, condition: condition || 'new',
      category_id: category_id ? parseInt(category_id, 10) : null,
      shop_id: shop_id ? parseInt(shop_id, 10) : null,
      seller_id: seller_id ? parseInt(seller_id, 10) : null,
      stock: stock ? parseInt(stock, 10) : 0,
      is_china_seller: !!is_china_seller,
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
    category_id, shop_id, seller_id, condition, stock, is_china_seller, images, active, tags } = req.body || {};
  try {
    const updates = {};
    if (default_lang !== undefined && SUPPORTED_LANGS.includes(default_lang)) updates.default_lang = default_lang;
    if (price_usd !== undefined) updates.price_usd = parseFloat(price_usd);
    if (brand !== undefined) updates.brand = brand ? brand.trim() : null;
    if (model !== undefined) updates.model = model ? model.trim() : null;
    if (oem !== undefined) updates.oem = oem ? oem.trim() : null;
    if (condition !== undefined) updates.condition = condition;
    if (category_id !== undefined) updates.category_id = category_id ? parseInt(category_id, 10) : null;
    if (shop_id !== undefined) updates.shop_id = shop_id ? parseInt(shop_id, 10) : null;
    if (seller_id !== undefined) updates.seller_id = seller_id ? parseInt(seller_id, 10) : null;
    if (stock !== undefined) updates.stock = parseInt(stock, 10) || 0;
    if (is_china_seller !== undefined) updates.is_china_seller = !!is_china_seller;
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

/* ------------------------------------------------------------
   SELLER SHOP: eigener Shop des eingeloggten Händlers
   GET  /api/seller/shop  → Shop des Händlers (oder null)
   POST /api/seller/shop  → anlegen ODER aktualisieren (1 Shop je Händler)
   ------------------------------------------------------------ */
app.get('/api/seller/shop', requireAuth, async (req, res) => {
  try {
    const result = await query(`
      SELECT s.id, s.slug, s.name, s.country, s.city, s.email, s.phone,
        s.is_china, s.logo_url, s.active, s.created_at
      FROM shops s
      WHERE s.owner_id = $1
      ORDER BY s.created_at ASC LIMIT 1
    `, [req.user.id]);
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
  const { name, country, city, email, phone, logo_url, description } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: 'Missing shop name' });
  try {
    const fields = {
      name: name.trim(),
      country: country ? country.toUpperCase() : null,
      city: city ? city.trim() : null,
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      logo_url: logo_url || null
    };

    // Hat dieser Händler schon einen Shop?
    const existing = await query('SELECT id FROM shops WHERE owner_id = $1 ORDER BY created_at ASC LIMIT 1', [req.user.id]);

    let shopId;
    if (existing.rows.length) {
      shopId = existing.rows[0].id;
      await db.update('shops', shopId, fields);
    } else {
      if (!fields.email) fields.email = req.user.email || null;
      // Eindeutigen Slug erzeugen
      let finalSlug = makeSlug(name) || ('shop-' + req.user.id);
      const clash = await query('SELECT 1 FROM shops WHERE slug = $1', [finalSlug]);
      if (clash.rows.length) finalSlug = finalSlug + '-' + req.user.id;
      const newShop = await db.insert('shops', {
        owner_id: req.user.id,
        slug: finalSlug,
        ...fields,
        is_china: false,
        active: true
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
    await query('UPDATE products SET shop_id = $1 WHERE seller_id = $2 AND (shop_id IS DISTINCT FROM $1)', [shopId, req.user.id]);

    res.json({ success: true, shop_id: shopId, created: existing.rows.length === 0 });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Slug already exists' });
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/seller/products', requireAuth, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const params = isAdmin ? [] : [req.user.id];
    const where = isAdmin ? '' : 'WHERE p.seller_id = $1';
    const result = await query(`
      SELECT p.id, p.price_usd, p.brand, p.model, p.oem, p.condition,
        p.category_id, p.shop_id, p.seller_id, p.images, p.stock,
        p.is_china_seller, p.default_lang, p.active, p.created_at, p.view_count,
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

app.post('/api/seller/products', requireAuth, async (req, res) => {
  const { default_lang, translations, price_usd, brand, model, oem,
    category_id, condition, stock, images, tags } = req.body || {};
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
      const sh = await query('SELECT id FROM shops WHERE owner_id = $1 ORDER BY created_at ASC LIMIT 1', [req.user.id]);
      if (sh.rows.length) myShopId = sh.rows[0].id;
    } catch (e) {}

    const newProd = await db.insert('products', {
      default_lang, price_usd: parseFloat(price_usd),
      brand: brand?.trim() || null, model: model?.trim() || null,
      oem: oem?.trim() || null, condition: condition || 'new',
      category_id: category_id ? parseInt(category_id, 10) : null,
      seller_id: req.user.id,
      shop_id: myShopId,
      stock: stock ? parseInt(stock, 10) : 0,
      is_china_seller: false,
      images: JSON.stringify(Array.isArray(images) ? images.slice(0, 5) : []),
      active: true
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
    res.json({ success: true, product: newProd });
  } catch (err) {
    console.error('POST /api/seller/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/seller/products/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const owner = await query('SELECT seller_id FROM products WHERE id = $1', [id]);
  if (owner.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && owner.rows[0].seller_id !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { default_lang, translations, price_usd, brand, model, oem,
    category_id, condition, stock, images, active, tags } = req.body || {};
  try {
    const updates = {};
    if (default_lang && SUPPORTED_LANGS.includes(default_lang)) updates.default_lang = default_lang;
    if (price_usd !== undefined) updates.price_usd = parseFloat(price_usd);
    if (brand !== undefined) updates.brand = brand?.trim() || null;
    if (model !== undefined) updates.model = model?.trim() || null;
    if (oem !== undefined) updates.oem = oem?.trim() || null;
    if (condition !== undefined) updates.condition = condition;
    if (category_id !== undefined) updates.category_id = category_id ? parseInt(category_id, 10) : null;
    if (stock !== undefined) updates.stock = parseInt(stock, 10) || 0;
    if (images !== undefined) updates.images = JSON.stringify(Array.isArray(images) ? images.slice(0, 5) : []);
    if (active !== undefined) updates.active = !!active;
    if (Object.keys(updates).length > 0) await db.update('products', id, updates);
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
    res.json({ success: true });
  } catch (err) {
    console.error('PUT /api/seller/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/seller/products/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const owner = await query('SELECT seller_id FROM products WHERE id = $1', [id]);
  if (owner.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && owner.rows[0].seller_id !== req.user.id) {
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
        seller_id: req.user.id,
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
    .map(({ id, title, image_url, link_url, alt_text, position, placement }) =>
         ({ id, title, image_url, link_url, alt_text, position, placement }));
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

// Provision (16 %). Bei Bedarf via Render-ENV COMMISSION_RATE ueberschreibbar.
const COMMISSION_RATE = (() => {
  const v = parseFloat(process.env.COMMISSION_RATE);
  return Number.isFinite(v) && v >= 0 && v < 1 ? v : 0.16;
})();
const SALE_CURRENCY = process.env.SALE_CURRENCY || 'USD';

function money(n) { return Math.round((Number(n) || 0) * 100) / 100; }

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

    // Positionen serverseitig aufbauen
    const lines = [];
    let subtotal = 0;
    for (const w of wanted) {
      const pr = await query(
        `SELECT p.id, p.price_usd, p.seller_id, p.shop_id, p.stock, p.is_china_seller, p.default_lang,
                (SELECT title FROM product_translations
                   WHERE product_id = p.id ORDER BY (lang = p.default_lang) DESC LIMIT 1) AS title
           FROM products p
          WHERE p.id = $1 AND p.active = true`,
        [w.pid]
      );
      const p = pr.rows[0];
      if (!p) continue; // unbekanntes/inaktives Produkt -> ueberspringen

      const unitPrice = money(p.price_usd);
      const lineTotal = money(unitPrice * w.qty);
      const commission = money(lineTotal * COMMISSION_RATE);
      const payout = money(lineTotal - commission);

      // Haendler ermitteln (falls Produkt einem Verkaeufer gehoert)
      let merchantId = null;
      if (p.seller_id) {
        const m = await billingDb.ensureMerchant(p.seller_id);
        merchantId = m ? m.id : null;
      }

      subtotal = money(subtotal + lineTotal);
      lines.push({
        productId: p.id, shopId: p.shop_id || null, merchantId,
        title: p.title || ('#' + p.id), qty: w.qty,
        unitPrice, lineTotal, commission, payout,
      });
    }
    if (!lines.length) return res.status(400).json({ error: 'No purchasable items' });

    const shipCost = money((shipping && !isNaN(parseFloat(shipping))) ? parseFloat(shipping) : 0);
    const total = money(subtotal + shipCost);

    const buyerUserId = (user && user.id && !isNaN(parseInt(user.id, 10))) ? parseInt(user.id, 10) : null;
    const email = (user && user.email) || (address && address.email) || null;

    // Header anlegen
    const order = await billingDb.createOrder({
      buyerUserId, email, currency: SALE_CURRENCY,
      subtotal, shipping: shipCost, total, status: 'pending',
      address: address || {},
    });

    // Positionen anlegen
    for (const ln of lines) {
      await billingDb.addOrderItem({
        orderId: order.id, productId: ln.productId, shopId: ln.shopId, merchantId: ln.merchantId,
        title: ln.title, qty: ln.qty, unitPrice: ln.unitPrice, lineTotal: ln.lineTotal,
        commissionRate: COMMISSION_RATE, commissionAmount: ln.commission, payoutAmount: ln.payout,
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

  const allowed = ['title','image_url','link_url','alt_text',
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
