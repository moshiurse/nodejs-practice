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

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    {
       path: '/checkout',
       title: 'Checkout' 
    });
};