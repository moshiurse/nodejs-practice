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
    req.user.createProduct({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    })
    .then((result) => {
        console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
    
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if(!editMode){
        return res.redirect('/');
    }

    const productId = req.params.productId;
    req.user.getProducts({where: {id: productId}})
    // Product.findByPk(productId)
    .then(products => {
        const product = products[0];
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
    })
    .catch(err => console.log(err));

};

exports.postEditProduct = (req, res, nextb) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findByPk(productId)
    .then(product => {
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save();
    })
    .then(result => {
        console.log('Updated product success');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    .then(products => {
        res.render('admin/products', 
        {
            prods : products,
            title : "Admin Products",
            path: '/admin/products'
    });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}