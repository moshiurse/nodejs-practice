const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', 
    {
        title: 'Add Product', 
        path: '/admin/add',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if(!editMode){
        return res.redirect('/');
    }

    const productId = req.params.productId;
    console.log(productId);
    Product.fetchProduct(productId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', 
        {
            title: 'Edit Product', 
            path: '/admin/edit',
            editing: editMode,
            product: product
        });
    });

};

exports.postEditProduct = (req, res, nextb) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl,updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
}

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