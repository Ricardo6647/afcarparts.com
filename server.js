// file: server.js
// AFRICARPARTS Backend API - läuft auf Render
// Frontend liegt separat auf Hostinger (www.afcarparts.com)

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
// Erlaubt deine Domain mit und ohne "www" + lokale Tests
const allowedOrigins = [
  'https://afcarparts.com',
  'https://www.afcarparts.com',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5500'
];

app.use(cors({
  origin: function (origin, cb) {
    // Erlaube Requests ohne Origin (z.B. curl, Postman, Health-Checks)
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

/* ---------- UPLOADS (für CSV / Bilder) ---------- */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));
const upload = multer({ dest: uploadsDir });

/* ---------- ROOT + HEALTH ---------- */
app.get('/', (req, res) => {
  res.json({
    name: 'AFRICARPARTS API',
    status: 'running',
    docs: '/health',
    frontend: 'https://www.afcarparts.com'
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
    name,
    email,
    password, // Demo only - in Produktion: bcrypt!
    role: role || 'buyer',
    phone,
    country,
    created_at: new Date().toISOString()
  };

  users.push(user);
  save('users', users);

  // Passwort nicht zurückgeben
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

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const { password: _, ...safeUser } = user;
  return res.json({ user: safeUser, token: 'token-' + user.id });
});

/* ---------- CATEGORIES ---------- */
app.get('/api/categories', (req, res) => {
  res.json(load('categories'));
});

app.get('/api/admin/categories', (req, res) => {
  res.json(load('categories'));
});

/* ---------- PRODUCTS LIST ---------- */
app.get('/api/products', (req, res) => {
  const {
    q, category_id, condition, brand, china_only,
    page = 1, limit = 24
  } = req.query;

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

  if (category_id) {
    products = products.filter(p => String(p.category_id) === String(category_id));
  }
  if (condition) {
    products = products.filter(p => p.condition === condition);
  }
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

  res.json({
    data,
    pagination: { total, pages: Math.max(1, Math.ceil(total / lim)), page: pg }
  });
});

/* ---------- PRODUCT DETAIL ---------- */
app.get('/api/products/:id', (req, res) => {
  const products = load('products');
  const p = products.find(x => String(x.id) === String(req.params.id));
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
});

/* ---------- SHOPS ---------- */
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

/* ---------- CSV IMPORT ---------- */
app.post('/api/seller/csv-import', upload.single('file'), (req, res) => {
  res.json({ success: true, message: 'CSV received (parsing not implemented in demo).' });
});

/* ---------- ADMIN (einfacher Stub - kein externes Modul nötig) ---------- */
// Falls du später einen echten Admin-Bereich willst, hier ergänzen.
app.get('/api/admin/users', (req, res) => res.json({ data: load('users') }));
app.get('/api/admin/products', (req, res) => res.json({ data: load('products') }));
app.get('/api/admin/orders', (req, res) => res.json({ data: load('orders') }));
app.get('/api/admin/shops', (req, res) => res.json({ data: load('shops') }));

/* ---------- 404 für alle anderen API Routen ---------- */
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl });
});

/* ---------- 404 Fallback (KEIN SPA-Fallback - Frontend liegt auf Hostinger) ---------- */
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

/* ---------- START SERVER ---------- */
app.listen(PORT, HOST, () => {
  console.log(`AFRICARPARTS API running on port ${PORT}`);
});
