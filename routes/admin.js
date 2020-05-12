const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// auth middleware
const isAuth = require('../middleware/is-auth');

// URL => admin/add
router.get('/add', isAuth, adminController.getAddProduct);

router.get('/edit/:productId', isAuth, adminController.getEditProduct);

// URL => admin/producs
router.get('/products', isAuth, adminController.getProducts);

// URL POST admin/add
router.post('/add', isAuth, adminController.postAddProduct);

router.post('/edit', isAuth, adminController.postEditProduct);

router.post('/delete', isAuth, adminController.postDeleteProduct);

module.exports = router;