const products = [];

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
    products.push({title: req.body.title});
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    res.render('shop', 
    {
        prods : products,
        title : "Shop Page",
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCss: true
    });
};