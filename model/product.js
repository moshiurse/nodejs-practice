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
    
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromfile(products => {
            products.push(this);
            fs.writeFile(myPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(callback){
        getProductsFromfile(callback);
    }

}