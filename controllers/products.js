const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
    {
        title: 'Add Product', 
        path: '/admin/add', 
        products: true, 
        activeAddProduct: true, 
        productCss: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', 
        {
            prods : products,
            title : "Shop Page",
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        });
    });

};