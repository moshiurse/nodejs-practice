const path = require('path');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const products = [];

router.get('/add',(req, res, next) => {
    res.render('add-product', {title: 'Add Product', path: '/admin/add', products: true, activeAddProduct: true, productCss: true});
})

router.post('/add',(req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
})

exports.routes = router;
exports.products = products;