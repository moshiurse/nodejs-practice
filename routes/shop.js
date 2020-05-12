const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

// auth middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:pId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete', isAuth, shopController.postDeleteCart);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);
 
module.exports = router;
