// file: server.js
// AFRICARPARTS - Backend API + Frontend
// Status: categories (multilang) und tags laufen auf Postgres

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { load, save } = require('./store');
const { query } = require('./db');
const db = require('./storeDb');

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

/* ---------- ADMIN MIDDLEWARE ---------- */
function requireAdmin(req, res, next) {
  const tokenHeader = (req.headers.authorization || "").trim();
  if (!tokenHeader || !tokenHeader.startsWith("token-")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = tokenHeader.replace("token-", "").trim();
  const users = load("users") || [];
  const user = users.find(u => String(u.id) === String(userId));
  if (!user) return res.status(401).json({ error: "Invalid token" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  req.user = user;
  next();
}

/* ---------- LANG HELPER ----------
   Holt die Sprache aus ?lang= oder Accept-Language Header.
   Faellt zurueck auf 'en' wenn nichts passt.
*/
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

/* ---------- AUTH (noch JSON) ---------- */
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, phone, country } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  const users = load('users');
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const user = {
    id: Date.now().toString(),
    name, email, password,
    role: role || 'buyer',
    phone, country,
    created_at: new Date().toISOString()
  };
  users.push(user);
  save('users', users);
  const { password: _, ...safeUser } = user;
  return res.json({ user: safeUser, token: 'token-' + user.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  const users = load('users');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  return res.json({ user: safeUser, token: 'token-' + user.id });
});

/* ============================================================
   CATEGORIES (mehrsprachig auf Postgres)
   ============================================================ */

/**
 * Public: alle aktiven Kategorien in der gewuenschten Sprache.
 * Aufruf: GET /api/categories?lang=de
 * Faellt zurueck auf englischen Namen wenn Uebersetzung fehlt.
 */
app.get('/api/categories', async (req, res) => {
  try {
    const lang = getLang(req);
    const result = await query(`
      SELECT
        c.id,
        c.slug,
        c.icon_url,
        c.sort_order,
        COALESCE(t.name, t_en.name, c.slug) AS name,
        $1::text AS lang
      FROM categories c
      LEFT JOIN category_translations t
        ON t.category_id = c.id AND t.lang = $1
      LEFT JOIN category_translations t_en
        ON t_en.category_id = c.id AND t_en.lang = 'en'
      WHERE c.active = TRUE
      ORDER BY c.sort_order ASC, COALESCE(t.name, t_en.name) ASC
    `, [lang]);
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Admin: alle Kategorien inkl. ALLER Uebersetzungen (zum Bearbeiten).
 */
app.get('/api/admin/categories', requireAdmin, async (req, res) => {
  try {
    const cats = await query(`SELECT * FROM categories ORDER BY sort_order ASC, slug ASC`);
    const trans = await query(`SELECT category_id, lang, name FROM category_translations`);

    // Translations gruppieren pro Kategorie
    const transByCat = {};
    for (const t of trans.rows) {
      if (!transByCat[t.category_id]) transByCat[t.category_id] = {};
      transByCat[t.category_id][t.lang] = t.name;
    }

    const data = cats.rows.map(c => ({
      ...c,
      translations: transByCat[c.id] || {}
    }));

    res.json({ data });
  } catch (err) {
    console.error('GET /api/admin/categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Admin: neue Kategorie anlegen mit Uebersetzungen.
 * Body: { slug, icon_url?, sort_order?, translations: { en: "Brakes", de: "Bremsen", ... } }
 */
app.post('/api/admin/categories', requireAdmin, async (req, res) => {
  const { slug, icon_url, sort_order, translations } = req.body || {};

  if (!slug || !slug.trim()) {
    return res.status(400).json({ error: 'Missing slug' });
  }
  if (!translations || typeof translations !== 'object') {
    return res.status(400).json({ error: 'Missing translations object' });
  }
  if (!translations.en || !translations.en.trim()) {
    return res.status(400).json({ error: 'English (en) translation is required' });
  }

  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

  try {
    const newCat = await db.insert('categories', {
      slug: cleanSlug,
      icon_url: icon_url || null,
      sort_order: parseInt(sort_order, 10) || 0,
      active: true
    });

    // Uebersetzungen einfuegen
    for (const lang of SUPPORTED_LANGS) {
      const name = translations[lang];
      if (name && name.trim()) {
        await db.insert('category_translations', {
          category_id: newCat.id,
          lang,
          name: name.trim()
        });
      }
    }

    res.json({ success: true, category: newCat });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    console.error('POST /api/admin/categories error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Admin: Kategorie aktualisieren (slug, icon, sort_order, active, translations).
 */
app.put('/api/admin/categories/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { slug, icon_url, sort_order, active, translations } = req.body || {};

  try {
    const updates = {};
    if (slug !== undefined) updates.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (icon_url !== undefined) updates.icon_url = icon_url || null;
    if (sort_order !== undefined) updates.sort_order = parseInt(sort_order, 10) || 0;
    if (active !== undefined) updates.active = !!active;

    if (Object.keys(updates).length > 0) {
      await db.update('categories', id, updates);
    }

    if (translations && typeof translations === 'object') {
      for (const lang of SUPPORTED_LANGS) {
        const name = translations[lang];
        if (name === undefined) continue;

        if (name === null || name === '') {
          // Loeschen
          await query(
            'DELETE FROM category_translations WHERE category_id = $1 AND lang = $2',
            [id, lang]
          );
        } else {
          // Upsert
          await query(`
            INSERT INTO category_translations (category_id, lang, name)
            VALUES ($1, $2, $3)
            ON CONFLICT (category_id, lang)
            DO UPDATE SET name = EXCLUDED.name
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

/**
 * Admin: Kategorie loeschen (cascade loescht auch translations).
 */
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

/**
 * Public: alle Tags (z.B. fuer Autocomplete).
 * Sortiert nach Beliebtheit (usage_count DESC).
 */
app.get('/api/tags', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 100;
    const result = await query(
      'SELECT id, slug, usage_count FROM tags ORDER BY usage_count DESC, slug ASC LIMIT $1',
      [Math.min(limit, 500)]
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error('GET /api/tags error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Public: Tag-Suche (fuer Autocomplete).
 * Aufruf: GET /api/tags/search?q=brem
 */
app.get('/api/tags/search', async (req, res) => {
  try {
    const q = (req.query.q || '').toLowerCase().trim();
    if (!q) return res.json({ data: [] });

    const result = await query(
      `SELECT id, slug, usage_count FROM tags
       WHERE slug ILIKE $1
       ORDER BY usage_count DESC, slug ASC
       LIMIT 20`,
      [q + '%']
    );
    res.json({ data: result.rows });
  } catch (err) {
    console.error('GET /api/tags/search error:', err);
    res.status(500).json({ error: err.message });
  }
});

/* ---------- PUBLIC: PRODUCTS (noch JSON) ---------- */
app.get('/api/products', (req, res) => {
  const { q, category_id, condition, brand, china_only, page = 1, limit = 24 } = req.query;
  let products = load('products');

  if (q) {
    const s = q.toLowerCase();
    products = products.filter(p =>
      (p.title || '').toLowerCase().includes(s) ||
      (p.brand || '').toLowerCase().includes(s) ||
      (p.model || '').toLowerCase().includes(s) ||
      (p.oem || '').toLowerCase().includes(s)
    );
  }
  if (category_id) products = products.filter(p => String(p.category_id) === String(category_id));
  if (condition) products = products.filter(p => p.condition === condition);
  if (brand) {
    const b = brand.toLowerCase();
    products = products.filter(p => (p.brand || '').toLowerCase().includes(b));
  }
  if (china_only === '1') {
    products = products.filter(p => p.is_china_seller || p.shop_is_china);
  }

  const total = products.length;
  const pg = parseInt(page, 10) || 1;
  const lim = parseInt(limit, 10) || 24;
  const start = (pg - 1) * lim;
  const data = products.slice(start, start + lim);

  res.json({ data, pagination: { total, pages: Math.max(1, Math.ceil(total / lim)), page: pg } });
});

app.get('/api/products/:id', (req, res) => {
  const products = load('products');
  const p = products.find(x => String(x.id) === String(req.params.id));
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

/* ---------- PUBLIC: BANNERS (noch JSON) ---------- */
app.get('/api/banners', (req, res) => {
  const banners = load('banners') || [];
  res.json({ data: banners.filter(b => b.active !== false) });
});

/* ---------- PUBLIC: SHOPS (noch JSON) ---------- */
app.get('/api/shops', (req, res) => {
  res.json({ data: load('shops') });
});

app.get('/api/shops/:id', (req, res) => {
  const shops = load('shops');
  const s = shops.find(x => String(x.id) === String(req.params.id));
  if (!s) return res.status(404).json({ error: 'Shop not found' });
  const products = load('products').filter(p => String(p.shop_id) === String(s.id));
  res.json({ shop: s, products });
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

/* ---------- SELLER (noch JSON) ---------- */
app.post('/api/seller/products', (req, res) => {
  const p = req.body || {};
  if (!p.title || !p.price_usd) {
    return res.status(400).json({ error: 'Missing title or price' });
  }
  const products = load('products');
  p.id = Date.now().toString();
  p.created_at = new Date().toISOString();
  products.push(p);
  save('products', products);
  res.json({ success: true, product: p });
});

app.post('/api/seller/csv-import', upload.single('file'), (req, res) => {
  res.json({ success: true, message: 'CSV received (parsing not implemented in demo).' });
});

/* ============================================================
   ADMIN ROUTES (Rest noch JSON)
   ============================================================ */

app.get('/api/admin/users', requireAdmin, (req, res) => {
  const users = (load('users') || []).map(u => {
    const { password, ...safe } = u;
    return safe;
  });
  res.json({ data: users });
});

app.get('/api/admin/products', requireAdmin, (req, res) => {
  res.json({ data: load('products') });
});

app.post('/api/admin/products', requireAdmin, (req, res) => {
  const p = req.body || {};
  if (!p.title || !p.price_usd) {
    return res.status(400).json({ error: 'Missing title or price' });
  }
  const products = load('products');
  const product = {
    id: Date.now().toString(),
    title: p.title,
    price_usd: p.price_usd,
    brand: p.brand || '',
    model: p.model || '',
    oem: p.oem || '',
    category_id: p.category_id || null,
    seller_id: p.seller_id || null,
    shop_id: p.shop_id || null,
    condition: p.condition || 'new',
    images: p.images || [],
    created_at: new Date().toISOString()
  };
  products.push(product);
  save('products', products);
  res.json({ success: true, product });
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let products = load('products');
  const before = products.length;
  products = products.filter(p => String(p.id) !== String(id));
  save('products', products);
  res.json({ success: true, deleted: before - products.length });
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
app.get('/api/admin/shops', requireAdmin, (req, res) => res.json({ data: load('shops') }));

/* ============================================================
   ERROR HANDLING
   ============================================================ */
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl });
});

app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
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
