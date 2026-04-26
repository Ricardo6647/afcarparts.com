// file: admin.controller.js
const { load, save } = require('./store');

/* -------------------- USERS -------------------- */
exports.getUsers = (req, res) => {
  const users = load('users');
  res.json({ data: users });
};

/* -------------------- PRODUCTS -------------------- */
exports.getProducts = (req, res) => {
  const products = load('products');
  res.json({ data: products });
};

exports.addProduct = (req, res) => {
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
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  let products = load('products');
  products = products.filter(p => String(p.id) !== String(id));

  save('products', products);

  res.json({ success: true });
};

/* -------------------- SHOPS -------------------- */
exports.getShops = (req, res) => {
  const shops = load('shops');
  res.json({ data: shops });
};

/* -------------------- CATEGORIES -------------------- */
exports.getCategories = (req, res) => {
  const categories = load('categories');
  res.json({ data: categories });
};

exports.addCategory = (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Missing name' });

  const categories = load('categories');
  const cat = { id: Date.now().toString(), name };

  categories.push(cat);
  save('categories', categories);

  res.json({ success: true, category: cat });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  let categories = load('categories');
  categories = categories.filter(c => String(c.id) !== String(id));

  save('categories', categories);

  res.json({ success: true });
};

/* -------------------- BANNERS -------------------- */
exports.getBanners = (req, res) => {
  const banners = load('banners');
  res.json({ data: banners });
};

exports.addBanner = (req, res) => {
  const { image_url, link_url } = req.body || {};
  if (!image_url) return res.status(400).json({ error: 'Missing image_url' });

  const banners = load('banners');

  const banner = {
    id: Date.now().toString(),
    image_url,
    link_url: link_url || '',
    active: true
  };

  banners.push(banner);
  save('banners', banners);

  res.json({ success: true, banner });
};

exports.deleteBanner = (req, res) => {
  const { id } = req.params;

  let banners = load('banners');
  banners = banners.filter(b => String(b.id) !== String(id));

  save('banners', banners);

  res.json({ success: true });
};
