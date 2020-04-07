const fs = require('fs');
const path = require('path');

const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {

    static addProductTocart(productId, productPrice) {
        // fetch data freom cart json
        fs.readFile(myPath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};

            if(!err){
                cart = JSON.parse(fileContent);
            }
            // check existing product
            const existingproductIndex = cart.products.findIndex(p => p.id === productId);
            const existingproduct = cart.products[existingproductIndex];
            let updatedProduct;

            if(existingproduct){
                updatedProduct = {...existingproduct};
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products = [...cart.products];
                cart.products[existingproductIndex] = updatedProduct; 
            }else{
                updatedProduct = {id: productId, qty: 1};
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(myPath, JSON.stringify(cart), err => {
                console.log(err); 
            })

        })
    }

    static deleteProductFromCart(id, productPrice){
        fs.readFile(myPath, (err, fileContent) => {
            if(err){
                return;
            }

            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (productQty * productPrice);

            fs.writeFile(myPath, JSON.stringify(updatedCart), err => {
                console.log(err); 
            });

        })
    }

}