const Product = require('../model/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', 
        {
            prods : products,
            title : "Products",
            path: '/products'
        });
    });

};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', 
        {
            prods : products,
            title : "Shop Page",
            path: '/'
        });
    });

};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', 
    {
       path: '/cart',
       title: 'Cart' 
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', 
    {
       path: '/orders',
       title: 'Orders' 
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    {
       path: '/checkout',
       title: 'Checkout' 
    });
};