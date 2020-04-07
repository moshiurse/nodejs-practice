const fs = require('fs');
const path = require('path');

const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromfile = callback => {

    fs.readFile(myPath, (err, fileContent) => {
        if(err){
            callback([]);
        }else{
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromfile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(myPath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });

            }else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(myPath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        })
    }

    static fetchAll(callback){
        getProductsFromfile(callback);
    }

    static fetchProduct(id, callback){
        getProductsFromfile(products => {
            const product = products.find(pid => pid.id === id);
            callback(product);
        })
    }

}