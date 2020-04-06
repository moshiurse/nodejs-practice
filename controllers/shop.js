const Product = require('../model/product');
const Cart = require('../model/cart');

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

exports.getProduct = (req, res, next) => {
    productId = req.params.pId;
    Product.fetchProduct(productId, product => {
        res.render('shop/product-detail', 
        {
            product: product, 
            title: product.title, 
            path: '/products'
        });
    })
    
}

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

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    
    Product.fetchProduct(productId, (product) => {
        Cart.addProductTocart(productId, product.price);
    })
    res.redirect('/cart');
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