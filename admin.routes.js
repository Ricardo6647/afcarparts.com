const router = require('express').Router();
const adminController = require('./admin.controller');

// USERS
router.get('/users', adminController.getUsers);

// PRODUCTS
router.get('/products', adminController.getProducts);

// SHOPS
router.get('/shops', adminController.getShops);

// CATEGORIES
router.get('/categories', adminController.getCategories);
router.post('/categories', adminController.addCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// BANNERS
router.get('/banners', adminController.getBanners);
router.post('/banners', adminController.addBanner);
router.delete('/banners/:id', adminController.deleteBanner);

module.exports = router;
