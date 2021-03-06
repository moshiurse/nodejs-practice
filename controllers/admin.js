const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
    // not minimal way to do route protection
    // if(!req.session.isLoggedIn){
    //     return res.redirect('/login');
    // }
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
    const product = new Product({
        title: title,
        price:price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product.save()
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
    Product.findById(productId)
    // Product.findByPk(productId)
    .then(product => {
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

    Product.findById(productId).then(product => {

        if(product.userId.toString() !== req.user._id.toString()){
            return res.redirect('/');
        }
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;

       return product.save()
       .then(result => {
        console.log('Updated product success');
        res.redirect('/admin/products');
    });

    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    Product.find()
    // .select('title price -_id')
    // .populate('userId')
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

    Product.deleteOne({_id: productId, userId: req.user._id})
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}