// file: server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const adminRoutes = require('./admin.routes');
const adminRequired = require('./admin.middleware');
const { load, save } = require('./store');

const app = express();

/* ---------- PORT + HOST (Render benötigt das) ---------- */
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

/* ---------- HEALTH CHECK ---------- */
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ---------- CORS ---------- */
app.use(cors({
  origin: [
    "https://afcarparts.com",
    "https://www.afcarparts.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"]
}));

/* ---------- BODY PARSER ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- STATIC UPLOADS ---------- */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ---------- AUTH: REGISTER ---------- */
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
    password, // Passwort speichern
    role: role || 'buyer',
    phone,
    country
  };

  users.push(user);
  save('users', users);

  res.json({ user, token: 'token-' + user.id });
});

/* ---------- AUTH: LOGIN ---------- */
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

  res.json({ user, token: 'token-' + user.id });
});

/* ---------- PRODUCTS LIST ---------- */
app.get('/api/products', (req, res) => {
  const {
    q,
    category_id,
    condition,
    brand,
    china_only,
    page = 1,
    limit = 24
  } = req.query;

  let products = load('products');

  if (q) {
    const s = q.toLowerCase();
    products = products.filter(
      p =>
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
    pagination: {
      total,
      pages: Math.max(1, Math.ceil(total / lim)),
      page: pg
    }
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
  const shops = load('shops');
  res.json({ data: shops });
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
  const orders = load('orders');
  res.json({ data: orders });
});

app.post('/api/orders', (req, res) => {
  const { items, shipping, payment, address, user } = req.body || {};
  if (!items || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'No items' });
  }

  const orders = load('orders');
  const order = {
    id: Date.now().toString(),
    items,
    shipping,
    payment,
    address,
    user,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  orders.push(order);
  save('orders', orders);

  res.json({ success: true, order });
});

/* ---------- SELLER: ADD PRODUCT (GESCHÜTZT) ---------- */
app.post('/api/seller/products', adminRequired, (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Seller only" });
  }

  const p = req.body || {};
  if (!p.title || !p.price_usd) {
    return res.status(400).json({ error: 'Missing title or price' });
  }

  const products = load('products');
  p.id = Date.now().toString();
  p.seller_id = req.user.id;

  products.push(p);
  save('products', products);

  res.json({ success: true, product: p });
});

/* ---------- CSV IMPORT ---------- */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ dest: uploadsDir });

app.post('/api/seller/csv-import', adminRequired, upload.single('file'), (req, res) => {
  res.json({ success: true, message: 'CSV received (parsing not implemented).' });
});

/* ---------- ADMIN AREA (GESCHÜTZT) ---------- */
app.use('/api/admin', adminRequired, adminRoutes);

/* ---------- FRONTEND FALLBACK (Render Fix) ---------- */
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ---------- START SERVER ---------- */
app.listen(PORT, HOST, () => {
  console.log(`AFRICARPARTS API running on http://${HOST}:${PORT}`);
});
