// file: server.js
// AFRICARPARTS - Backend API + Frontend
// Status: categories, shops, products laufen auf Postgres (mehrsprachig)
// Auth: bcrypt + JWT (Etappe 3.4)

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { load, save } = require('./store');
const { query } = require('./db');
const db = require('./storeDb');

// === PATCH 1: Auth-Imports ===
const cookieParser = require('cookie-parser');
const userDb = require('./userDb');
const { signAccessToken, verifyAccessToken } = require('./auth');

const app = express();

/* ---------- PORT + HOST ---------- */
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

/* ---------- CORS ---------- */
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

// === PATCH 1: Cookie-Parser ===
app.use(cookieParser());

/* ---------- BODY PARSER ---------- */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ---------- UPLOADS ---------- */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));
const upload = multer({ dest: uploadsDir });

/* ---------- STATIC FRONTEND ---------- */
const publicDir = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : __dirname;
app.use(express.static(publicDir, {
  index: 'index.html',
  extensions: ['html'],
  maxAge: 0
}));
console.log('Frontend wird ausgeliefert aus:', publicDir);

/* ---------- AUTH MIDDLEWARE (JWT-basiert, Etappe 3.4) ---------- */
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

/* ---------- LANG HELPER ---------- */
const SUPPORTED_LANGS = ['en', 'de', 'fr', 'pt', 'ar'];
function getLang(req) {
  const fromQuery = (req.query.lang || '').toLowerCase().trim();
  if (SUPPORTED_LANGS.includes(fromQuery)) return fromQuery;

  const acceptLang = (req.headers['accept-language'] || '').toLowerCase();
  for (const l of SUPPORTED_LANGS) {
    if (acceptLang.includes(l)) return l;
  }
  return 'en';
}

/* ---------- SLUG HELPER ---------- */
function makeSlug(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

/* ---------- TAG HELPER ----------
   Wandelt eine Liste von Tag-Strings in tag_ids um.
   Erstellt neue Tags falls noetig, gibt ids zurueck.
*/
async function resolveTags(tagSlugs) {
  if (!Array.isArray(tagSlugs) || tagSlugs.length === 0) return [];

  const cleaned = tagSlugs
    .map(t => makeSlug(t))
    .filter(t => t.length >= 2 && t.length <= 50);

  if (cleaned.length === 0) return [];

  // Upsert Tags und IDs zurueckholen
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

/* ---------- API STATUS + HEALTH ---------- */
app.get('/api', (req, res) => {
  res.json({ name: 'AFRICARPARTS API', status: 'running', docs: '/health' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ---------- DB TEST ---------- */
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await query('SELECT NOW() as time, version() as version');
    res.json({ ok: true, time: result.rows[0].time, version: result.rows[0].version });
  } catch (err) {
    console.error('DB test error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ---------- DB MIGRATIONS ---------- */
app.post('/api/admin/run-migration', async (req, res) => {
  const provided = req.headers['x-migration-secret'];
  if (!process.env.MIGRATION_SECRET) {
    return res.status(503).json({ error: 'MIGRATION_SECRET not set on server' });
  }
  if (provided !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Invalid migration secret' });
  }

  const filename = (req.body && req.body.file) || '001_initial_schema.sql';

  if (!/^\d+_[a-z0-9_]+\.sql$/i.test(filename)) {
    return res.status(400).json({ error: 'Invalid filename format' });
  }

  const migrationPath = path.join(__dirname, 'migrations', filename);
  if (!fs.existsSync(migrationPath)) {
    return res.status(404).json({ error: 'Migration file not found', file: filename });
  }

  try {
    const sql = fs.readFileSync(migrationPath, 'utf8');
    await query(sql);
    res.json({ ok: true, file: filename, message: 'Migration completed successfully' });
  } catch (err) {
    console.error('Migration error:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});
/* ---------- TEMPORÄRER ENDPOINT: Tabellen-Spalten ---------- */
/* Nach Debugging wieder entfernen */
app.get('/api/admin/table-columns', async (req, res) => {
  if (req.query.secret !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }
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
/* ---------- DB INFO ---------- */
app.get('/api/admin/db-info', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) {
    return res.status(503).json({ error: 'MIGRATION_SECRET not set on server' });
  }
  if (req.query.secret !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  try {
    const tables = await query(`
      SELECT table_name,
             (SELECT COUNT(*) FROM information_schema.columns
              WHERE table_schema='public' AND table_name=t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    const tableStats = await Promise.all(
      tables.rows.map(async (t) => {
        try {
          const c = await query(`SELECT COUNT(*) as c FROM "${t.table_name}"`);
          return {
            table_name: t.table_name,
            columns: parseInt(t.column_count, 10),
            rows: parseInt(c.rows[0].c, 10)
          };
        } catch {
          return { table_name: t.table_name, columns: parseInt(t.column_count, 10), rows: null };
        }
      })
    );

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
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: '.afcarparts.com',
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
    const map = { email_password_required: 400, password_too_short: 400,
                  invalid_role: 400, email_already_exists: 409 };
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

/* ---------- TEMPORÄRER ENDPOINT für JSON→Postgres-Migration ---------- */
/* WICHTIG: Nach erfolgreicher Migration diesen Block wieder entfernen! */
app.post('/api/admin/migrate-users', async (req, res) => {
  if (!process.env.MIGRATION_SECRET) {
    return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  }
  if (req.headers['x-migration-secret'] !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }
  try {
    const { migrateUsers } = require('./scripts/migrate_users_to_postgres');
    const result = await migrateUsers();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   CATEGORIES (mehrsprachig auf Postgres)
   ============================================================ */

app.get('/api/categories', async (req, res) => {
  try {
    const lang = getLang(req);
    const result = await query(`
      SELECT
        c.id, c.slug, c.icon_url, c.sort_order,
        COALESCE(t.name, t_en.name, c.slug) AS name,
        $1::text AS lang
      FROM categories c
      LEFT JOIN category_translations t ON t.category_id = c.id AND t.lang = $1
      LEFT JOIN category_translations t_en ON t_en.category_id = c.id AND t_en.lang = 'en'
      WHERE c.active = TRUE
      ORDER BY c.sort_order ASC, COALESCE(t.name, t_en.name) ASC
    `, [lang]);
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/categories error:', err);
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
    console.error('GET /api/admin/categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/categories', requireAdmin, async (req, res) => {
  const { slug, icon_url, sort_order, translations } = req.body || {};

  if (!slug || !slug.trim()) return res.status(400).json({ error: 'Missing slug' });
  if (!translations || typeof translations !== 'object') {
    return res.status(400).json({ error: 'Missing translations object' });
  }
  if (!translations.en || !translations.en.trim()) {
    return res.status(400).json({ error: 'English (en) translation is required' });
  }

  try {
    const newCat = await db.insert('categories', {
      slug: makeSlug(slug),
      icon_url: icon_url || null,
      sort_order: parseInt(sort_order, 10) || 0,
      active: true
    });

    for (const lang of SUPPORTED_LANGS) {
      const name = translations[lang];
      if (name && name.trim()) {
        await db.insert('category_translations', {
          category_id: newCat.id, lang, name: name.trim()
        });
      }
    }

    res.json({ success: true, category: newCat });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Slug already exists' });
    console.error('POST /api/admin/categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/categories/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { slug, icon_url, sort_order, active, translations } = req.body || {};

  try {
    const updates = {};
    if (slug !== undefined) updates.slug = makeSlug(slug);
    if (icon_url !== undefined) updates.icon_url = icon_url || null;
    if (sort_order !== undefined) updates.sort_order = parseInt(sort_order, 10) || 0;
    if (active !== undefined) updates.active = !!active;

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
    console.error('PUT /api/admin/categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/categories/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await db.remove('categories', req.params.id);
    res.json({ success: true, deleted: ok ? 1 : 0 });
  } catch (err) {
    console.error('DELETE /api/admin/categories error:', err);
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
    console.error('GET /api/tags error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tags/search', async (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase().trim();
    if (!q) return res.json({ data: [] });

    const result = await query(
      `SELECT id, slug, usage_count FROM tags
       WHERE slug ILIKE $1
       ORDER BY usage_count DESC, slug ASC LIMIT 20`,
      [q + '%']
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error('GET /api/tags/search error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   SHOPS (mehrsprachig auf Postgres)
   ============================================================ */

app.get('/api/shops', async (req, res) => {
  try {
    const lang = getLang(req);
    const { country, china_only, page = 1, limit = 24 } = req.query;

    const conditions = ['s.active = TRUE'];
    const params = [lang];
    let paramIdx = 2;

    if (country) {
      conditions.push(`s.country = $${paramIdx}`);
      params.push(country.toUpperCase());
      paramIdx++;
    }
    if (china_only === '1') conditions.push(`s.is_china = TRUE`);

    const where = 'WHERE ' + conditions.join(' AND ');

    const countRes = await query(`SELECT COUNT(*) AS c FROM shops s ${where}`, params.slice(1));
    const total = parseInt(countRes.rows[0].c, 10);

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
    const offset = (pg - 1) * lim;

    params.push(lim, offset);

    const result = await query(`
      SELECT
        s.id, s.slug, s.name, s.country, s.city, s.email, s.phone,
        s.is_china, s.logo_url, s.created_at,
        COALESCE(t.description, t_en.description, '') AS description
      FROM shops s
      LEFT JOIN shop_translations t ON t.shop_id = s.id AND t.lang = $1
      LEFT JOIN shop_translations t_en ON t_en.shop_id = s.id AND t_en.lang = 'en'
      ${where}
      ORDER BY s.created_at DESC
      LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
    `, params);

    res.json({
      data: result.rows,
      pagination: { total, pages: Math.max(1, Math.ceil(total / lim)), page: pg, limit: lim }
    });
  } catch (err) {
    console.error('GET /api/shops error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/shops/:id', async (req, res) => {
  try {
    const lang = getLang(req);
    const idOrSlug = req.params.id;
    const isNumeric = /^\d+$/.test(idOrSlug);

    const shopRes = await query(`
      SELECT s.*,
        COALESCE(t.description, t_en.description, '') AS description
      FROM shops s
      LEFT JOIN shop_translations t ON t.shop_id = s.id AND t.lang = $1
      LEFT JOIN shop_translations t_en ON t_en.shop_id = s.id AND t_en.lang = 'en'
      WHERE ${isNumeric ? 's.id = $2' : 's.slug = $2'}
      LIMIT 1
    `, [lang, isNumeric ? parseInt(idOrSlug, 10) : idOrSlug]);

    if (shopRes.rows.length === 0) return res.status(404).json({ error: 'Shop not found' });

    const shop = shopRes.rows[0];

    // Produkte des Shops in der gewuenschten Sprache
    const productsRes = await query(`
      SELECT p.id, p.price_usd, p.brand, p.model, p.condition, p.images, p.created_at,
        COALESCE(t.title, t_def.title, '') AS title
      FROM products p
      LEFT JOIN product_translations t ON t.product_id = p.id AND t.lang = $1
      LEFT JOIN product_translations t_def ON t_def.product_id = p.id AND t_def.lang = p.default_lang
      WHERE p.shop_id = $2 AND p.active = TRUE
      ORDER BY p.created_at DESC
      LIMIT 50
    `, [lang, shop.id]);

    res.json({ shop, products: productsRes.rows });
  } catch (err) {
    console.error('GET /api/shops/:id error:', err);
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
    console.error('GET /api/admin/shops error:', err);
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
      slug: finalSlug,
      name: name.trim(),
      country: country ? country.toUpperCase() : null,
      city: city ? city.trim() : null,
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      is_china: !!is_china,
      logo_url: logo_url || null,
      active: true
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
    console.error('POST /api/admin/shops error:', err);
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
    console.error('PUT /api/admin/shops error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/shops/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await db.remove('shops', req.params.id);
    res.json({ success: true, deleted: ok ? 1 : 0 });
  } catch (err) {
    console.error('DELETE /api/admin/shops error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ============================================================
   PRODUCTS (mehrsprachig + Tags + Suche auf Postgres)
   ============================================================ */

/**
 * Public: Produkte suchen/filtern in der gewuenschten Sprache.
 */
app.get('/api/products', async (req, res) => {
  try {
    const lang = getLang(req);
    const {
      q, category_id, condition, brand, model, oem,
      min_price, max_price, china_only, tags,
      shop_id, sort = 'newest',
      page = 1, limit = 24
    } = req.query;

    const conditions = ['p.active = TRUE'];
    const params = [lang];
    let i = 2;

    if (category_id) { conditions.push(`p.category_id = $${i++}`); params.push(parseInt(category_id, 10)); }
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
          GROUP BY pt.product_id
          HAVING COUNT(DISTINCT t.slug) = $${i + 1}
        )`);
        params.push(tagSlugs, tagSlugs.length);
        i += 2;
      }
    }

    if (q && q.trim()) {
      conditions.push(`p.id IN (
        SELECT pt.product_id FROM product_translations pt
        WHERE (pt.title ILIKE $${i} OR pt.description ILIKE $${i})
      )`);
      params.push('%' + q.trim() + '%');
      i++;
    }

    const where = 'WHERE ' + conditions.join(' AND ');

    let orderBy = 'p.created_at DESC';
    if (sort === 'price_asc') orderBy = 'p.price_usd ASC';
    else if (sort === 'price_desc') orderBy = 'p.price_usd DESC';
    else if (sort === 'popular') orderBy = 'p.view_count DESC, p.created_at DESC';

    const countRes = await query(`SELECT COUNT(*) AS c FROM products p ${where}`, params.slice(1));
    const total = parseInt(countRes.rows[0].c, 10);

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
    const offset = (pg - 1) * lim;

    params.push(lim, offset);

    const result = await query(`
      SELECT
        p.id, p.price_usd, p.brand, p.model, p.oem, p.condition,
        p.category_id, p.shop_id, p.images, p.stock, p.is_china_seller,
        p.default_lang, p.created_at,
        COALESCE(t.title, t_def.title, '') AS title,
        COALESCE(t.description, t_def.description, '') AS description,
        s.name AS shop_name, s.slug AS shop_slug
      FROM products p
      LEFT JOIN product_translations t ON t.product_id = p.id AND t.lang = $1
      LEFT JOIN product_translations t_def ON t_def.product_id = p.id AND t_def.lang = p.default_lang
      LEFT JOIN shops s ON s.id = p.shop_id
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${i} OFFSET $${i + 1}
    `, params);

    res.json({
      data: result.rows,
      pagination: { total, pages: Math.max(1, Math.ceil(total / lim)), page: pg, limit: lim }
    });
  } catch (err) {
    console.error('GET /api/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const lang = getLang(req);
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: 'Invalid product id' });

    const result = await query(`
      SELECT
        p.*,
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
      WHERE pt.product_id = $1
      ORDER BY t.slug
    `, [id]);
    product.tags = tagsRes.rows;

    query('UPDATE products SET view_count = view_count + 1 WHERE id = $1', [id]).catch(() => {});

    res.json(product);
  } catch (err) {
    console.error('GET /api/products/:id error:', err);
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
    console.error('GET /api/admin/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const {
    default_lang, translations, price_usd, brand, model, oem,
    category_id, shop_id, seller_id, condition, stock, is_china_seller,
    images, tags
  } = req.body || {};

  if (!default_lang || !SUPPORTED_LANGS.includes(default_lang)) {
    return res.status(400).json({ error: 'default_lang must be one of: ' + SUPPORTED_LANGS.join(', ') });
  }
  if (!translations || typeof translations !== 'object') {
    return res.status(400).json({ error: 'Missing translations object' });
  }
  if (!translations[default_lang] || !translations[default_lang].title || !translations[default_lang].title.trim()) {
    return res.status(400).json({ error: `Title in default language (${default_lang}) is required` });
  }
  if (price_usd === undefined || price_usd === null || isNaN(parseFloat(price_usd))) {
    return res.status(400).json({ error: 'Valid price_usd is required' });
  }

  try {
    const newProd = await db.insert('products', {
      default_lang,
      price_usd: parseFloat(price_usd),
      brand: brand ? brand.trim() : null,
      model: model ? model.trim() : null,
      oem: oem ? oem.trim() : null,
      condition: condition || 'new',
      category_id: category_id ? parseInt(category_id, 10) : null,
      shop_id: shop_id ? parseInt(shop_id, 10) : null,
      seller_id: seller_id ? parseInt(seller_id, 10) : null,
      stock: stock ? parseInt(stock, 10) : 0,
      is_china_seller: !!is_china_seller,
      images: JSON.stringify(Array.isArray(images) ? images : []),
      active: true
    });

    for (const lang of SUPPORTED_LANGS) {
      const tr = translations[lang];
      if (tr && tr.title && tr.title.trim()) {
        await db.insert('product_translations', {
          product_id: newProd.id,
          lang,
          title: tr.title.trim(),
          description: tr.description ? tr.description.trim() : null
        });
      }
    }

    if (Array.isArray(tags) && tags.length > 0) {
      const tagIds = await resolveTags(tags);
      for (const tagId of tagIds) {
        await query(
          'INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [newProd.id, tagId]
        );
      }
    }

    res.json({ success: true, product: newProd });
  } catch (err) {
    console.error('POST /api/admin/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/products/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid product id' });

  const {
    default_lang, translations, price_usd, brand, model, oem,
    category_id, shop_id, seller_id, condition, stock, is_china_seller,
    images, active, tags
  } = req.body || {};

  try {
    const updates = {};
    if (default_lang !== undefined && SUPPORTED_LANGS.includes(default_lang)) {
      updates.default_lang = default_lang;
    }
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
            ON CONFLICT (product_id, lang) DO UPDATE
            SET title = EXCLUDED.title, description = EXCLUDED.description
          `, [id, lang, tr.title.trim(), tr.description ? tr.description.trim() : null]);
        }
      }
    }

    if (Array.isArray(tags)) {
      await query('DELETE FROM product_tags WHERE product_id = $1', [id]);
      if (tags.length > 0) {
        const tagIds = await resolveTags(tags);
        for (const tagId of tagIds) {
          await query(
            'INSERT INTO product_tags (product_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [id, tagId]
          );
        }
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('PUT /api/admin/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  try {
    const ok = await db.remove('products', req.params.id);
    res.json({ success: true, deleted: ok ? 1 : 0 });
  } catch (err) {
    console.error('DELETE /api/admin/products error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ---------- SELLER (selbst Produkte verwalten - noch alte JSON-Variante) ---------- */
app.post('/api/seller/products', (req, res) => {
  res.status(501).json({ error: 'Seller-Endpoint noch nicht auf neue DB-Struktur angepasst. Nutze /api/admin/products.' });
});

app.post('/api/seller/csv-import', upload.single('file'), (req, res) => {
  res.json({ success: true, message: 'CSV received (parsing not implemented in demo).' });
});

/* ---------- PUBLIC: BANNERS (noch JSON) ---------- */
app.get('/api/banners', (req, res) => {
  const banners = load('banners') || [];
  res.json({ data: banners.filter(b => b.active !== false) });
});

/* ---------- ORDERS (noch JSON) ---------- */
app.get('/api/orders', (req, res) => {
  res.json({ data: load('orders') });
});

app.post('/api/orders', (req, res) => {
  const { items, shipping, payment, address, user } = req.body || {};
  if (!items || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'No items' });
  }
  const orders = load('orders');
  const order = {
    id: Date.now().toString(),
    items, shipping, payment, address, user,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  orders.push(order);
  save('orders', orders);
  res.json({ success: true, order });
});

/* ============================================================
   ADMIN ROUTES (Rest)
   ============================================================ */

// === PATCH 4: Users aus Postgres lesen ===
app.get('/api/admin/users', requireAdmin, async (req, res) => {
  try {
    const result = await query(`
      SELECT id, email, name, role, whatsapp, email_verified,
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
  const { image_url, link_url } = req.body || {};
  if (!image_url) return res.status(400).json({ error: 'Missing image_url' });
  const banners = load('banners') || [];
  const banner = {
    id: Date.now().toString(),
    image_url,
    link_url: link_url || '',
    active: true,
    created_at: new Date().toISOString()
  };
  banners.push(banner);
  save('banners', banners);
  res.json({ success: true, banner });
});

app.delete('/api/admin/banners/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let banners = load('banners') || [];
  const before = banners.length;
  banners = banners.filter(b => String(b.id) !== String(id));
  save('banners', banners);
  res.json({ success: true, deleted: before - banners.length });
});

app.get('/api/admin/orders', requireAdmin, (req, res) => res.json({ data: load('orders') }));

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

/* ---------- START ---------- */
app.listen(PORT, HOST, () => {
  console.log(`AFRICARPARTS API running on port ${PORT}`);
});
