const path = require('path');

const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');

router.get('/add', productController.getAddProduct);

router.post('/add', productController.postAddProduct);

module.exports = router;