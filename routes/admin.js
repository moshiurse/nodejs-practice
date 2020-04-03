const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// URL => admin/add
router.get('/add', adminController.getAddProduct);

// URL => admin/producs
router.get('/products', adminController.getProducts);

// URL POST admin/add
router.post('/add', adminController.postAddProduct);

module.exports = router;