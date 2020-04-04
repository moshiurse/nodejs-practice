const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', 
    {
        title: 'Add Product', 
        path: '/admin/add', 
        products: true, 
        activeAddProduct: true, 
        productCss: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', 
        {
            prods : products,
            title : "Products",
            path: '/admin/products'
    });
    });
};