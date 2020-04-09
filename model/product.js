const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
    
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        return db.execute('insert into products (title, imageUrl, description, price) values (?, ?, ?, ?)', 
       [this.title, this.imageUrl, this.description, this.price]);
    }

    static delete(id){
       
    }

    static fetchAll(){
       return db.execute('select * from products');
    }

    static fetchProduct(id, callback){
        return db.execute('select * from products where id = ?', 
       [id]);
    }

}