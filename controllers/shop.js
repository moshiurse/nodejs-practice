const Product = require('../model/product');
const Cart = require('../model/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, data]) => {
        res.render('shop/product-list', 
        {
            prods : rows,
            title : "Products",
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    productId = req.params.pId;
    Product.fetchProduct(productId)
    .then(([product]) => {
        res.render('shop/product-detail', 
        {
            product: product[0], 
            title: product.title, 
            path: '/products'
        });
    })
    .catch(err => console.log(err))

}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, data]) => {
        res.render('shop/product-list', 
        {
            prods : rows,
            title : "Products",
            path: '/products'
        });
    })
    .catch(err => console.log(err));

};

exports.getCart = (req, res, next) => {
    Cart.getCartProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductdata = cart.products.find(p => p.id === product.id);
                if(cartProductdata){
                    cartProducts.push({productData: product, qty: cartProductdata.qty});
                }
            }
            
            res.render('shop/cart', 
            {
                path: '/cart',
                title: 'Cart',
                products: cartProducts
            });

        })
    })
    
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    
    Product.fetchProduct(productId, (product) => {
        Cart.addProductTocart(productId, product.price);
    })
    res.redirect('/cart');
};

exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProduct(productId, product => {
        Cart.deleteProductFromCart(productId, product.price);
        res.redirect('/cart');
    })
}

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