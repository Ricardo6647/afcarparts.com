// file: server.js
// AFRICARPARTS - Backend API + Frontend (alles auf Render)
// Vorher: Frontend lag separat auf Hostinger
// Jetzt:  Render serviert auch index.html, app.js, styles.css

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { load, save } = require('./store');

const app = express();

/* ---------- PORT + HOST (Render setzt PORT automatisch) ---------- */
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
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language']
}));

/* ---------- BODY PARSER ---------- */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ---------- UPLOADS ---------- */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));
const upload = multer({ dest: uploadsDir });

/* ---------- STATIC FRONTEND ----------
   Serves index.html, app.js, styles.css, admin.* etc.
   Looks in ./public first (project convention),
   falls back to project root if public/ does not exist.
*/
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

/* ---------- API STATUS + HEALTH ----------
   Note: GET / now serves the frontend (index.html) via static middleware.
   API status info moved to /api.
*/
app.get('/api', (req, res) => {
  res.json({
    name: 'AFRICARPARTS API',
    status: 'running',
    docs: '/health'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ---------- AUTH ---------- */
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

/* ---------- PUBLIC: CATEGORIES ---------- */
app.get('/api/categories', (req, res) => {
  res.json(load('categories'));
});

/* ---------- PUBLIC: PRODUCTS ---------- */
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

/* ---------- PUBLIC: BANNERS (für Hauptseite anzeigbar) ---------- */
app.get('/api/banners', (req, res) => {
  const banners = load('banners') || [];
  res.json({ data: banners.filter(b => b.active !== false) });
});

/* ---------- PUBLIC: SHOPS ---------- */
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

/* ---------- ORDERS ---------- */
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

/* ---------- SELLER: ADD PRODUCT ---------- */
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
   ADMIN ROUTES (alle durch requireAdmin geschützt)
   ============================================================ */

/* ---------- USERS ---------- */
app.get('/api/admin/users', requireAdmin, (req, res) => {
  // Passwörter nicht zurückgeben
  const users = (load('users') || []).map(u => {
    const { password, ...safe } = u;
    return safe;
  });
  res.json({ data: users });
});

/* ---------- PRODUCTS ---------- */
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

/* ---------- CATEGORIES ---------- */
app.get('/api/admin/categories', requireAdmin, (req, res) => {
  res.json(load('categories'));
});

app.post('/api/admin/categories', requireAdmin, (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Missing name' });
  const categories = load('categories');
  const cat = { id: Date.now().toString(), name };
  categories.push(cat);
  save('categories', categories);
  res.json({ success: true, category: cat });
});

app.delete('/api/admin/categories/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let categories = load('categories');
  const before = categories.length;
  categories = categories.filter(c => String(c.id) !== String(id));
  save('categories', categories);
  res.json({ success: true, deleted: before - categories.length });
});

/* ---------- BANNERS ---------- */
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

/* ---------- ORDERS / SHOPS ---------- */
app.get('/api/admin/orders', requireAdmin, (req, res) => res.json({ data: load('orders') }));
app.get('/api/admin/shops', requireAdmin, (req, res) => res.json({ data: load('shops') }));

/* ============================================================
   ERROR HANDLING
   ============================================================ */
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl });
});

/* ---------- SPA FALLBACK ----------
   For any non-API GET request that did not match a static file,
   return index.html so the client-side router can handle it.
   (e.g. /cart, /products, /shop/123 etc.)
*/
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
