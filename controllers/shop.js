const Product = require('../model/product');
const Order = require('../model/order');

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
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
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
        console.log(result);
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {

    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(p => {
            return {
                product: {...p.productId._doc},
                quantity: p.quantity
            }
        });
        const order = new Order({
            user: {
                email: req.user.email,
                userId: req.user
            },
            products: products
        });
        return order.save();
    })
    .then(result => {
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})
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