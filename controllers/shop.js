const Product = require('../model/product');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/product-list', 
        {
            prods : products,
            title : "Products",
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    productId = req.params.pId;
    Product.findById(productId)
    .then(product => {
        res.render('shop/product-detail', 
        {
            product: product, 
            title: product.title, 
            path: '/products'
        });
    })
    .catch(err => console.log(err))

}

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/product-list', 
        {
            prods : products,
            title : "Shop",
            path: '/products'
        });
    })
    .catch(err => console.log(err));
}; 

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(products => {
        res.render('shop/cart', 
        {
            path: '/cart',
            title: 'Cart',
            products: products 
        })
    })
    .catch(err => console.log(err));
    
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        res.redirect('/cart');
        console.log(result);
    })
   
};

exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    
    req.user.deleteItemFromCart(productId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
    .then(orders => {
        res.render('shop/orders', 
        {
           path: '/orders',
           title: 'Orders',
           orders: orders 
        });
    })
    .catch(err => console.log(err));
    
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    {
       path: '/checkout',
       title: 'Checkout' 
    });
};