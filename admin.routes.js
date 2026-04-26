const router = require('express').Router();
const adminController = require('./admin.controller');

/* -------------------- USERS -------------------- */
// Liste aller User (Admin only)
router.get('/users', adminController.getUsers);

/* -------------------- PRODUCTS -------------------- */
// Alle Produkte abrufen
router.get('/products', adminController.getProducts);
// Produkt hinzufügen
router.post('/products', adminController.addProduct);
// Produkt löschen
router.delete('/products/:id', adminController.deleteProduct);

/* -------------------- SHOPS -------------------- */
// Alle Shops abrufen
router.get('/shops', adminController.getShops);

/* -------------------- CATEGORIES -------------------- */
// Kategorien abrufen
router.get('/categories', adminController.getCategories);
// Kategorie hinzufügen
router.post('/categories', adminController.addCategory);
// Kategorie löschen
router.delete('/categories/:id', adminController.deleteCategory);

/* -------------------- BANNERS -------------------- */
// Banner abrufen
router.get('/banners', adminController.getBanners);
// Banner hinzufügen
router.post('/banners', adminController.addBanner);
// Banner löschen
router.delete('/banners/:id', adminController.deleteBanner);

module.exports = router;
