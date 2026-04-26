const { load, save } = require('./store');

// USERS
exports.getUsers = (req, res) => {
  const users = load('users');
  res.json({ data: users });
};

// PRODUCTS
exports.getProducts = (req, res) => {
  const products = load('products');
  res.json({ data: products });
};

// SHOPS
exports.getShops = (req, res) => {
  const shops = load('shops');
  res.json({ data: shops });
};

// CATEGORIES
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

// BANNERS
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
