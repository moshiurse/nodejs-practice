const Product = require('../model/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
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
    Product.fetchAll()
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
    .then(cart => {
        return cart.getProducts()
            .then(products => {
                res.render('shop/cart', 
                {
                    path: '/cart',
                    title: 'Cart',
                    products: products
                })
                .catch(err => console.log(err));
            })
    })
    .catch(err => console.log(err));
    
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            let newQty = 1;
            return cart.getProducts({where: {id: productId}})
            .then(products => {
                let product;
                if(products.length > 0 ){
                    product = products[0];
                }

                if(product){
                    const oldQty = product.cartItem.quantity;
                    newQty = oldQty +1;
                    return product;
                }
                return Product.findByPk(productId)
            })
            .then(product => {
                return fetchedCart.addProduct(product, 
                    { through: { quantity: newQty }
                });
            })
            .then(() => {
                res.redirect('/cart');
            })
                .catch(err => console.log(err));
            })
            
};

exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: productId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProduct(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            }));
        })
        .catch(err => console.log(err));
    })
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
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