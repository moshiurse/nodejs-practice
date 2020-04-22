const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// URL => admin/add
router.get('/add', adminController.getAddProduct);

// router.get('/edit/:productId', adminController.getEditProduct);

// URL => admin/producs
// router.get('/products', adminController.getProducts);

// URL POST admin/add
router.post('/add', adminController.postAddProduct);

// router.post('/edit', adminController.postEditProduct);

// router.post('/delete', adminController.postDeleteProduct);

module.exports = router;