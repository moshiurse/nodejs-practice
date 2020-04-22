const getDb = require('../util/database').getDb;

class product {
    constructor(title, price, description, imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){

    }
}

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allownull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allownull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allownull: false
    },
    description: {
        type: Sequelize.STRING,
        allownull: false
    }
});

module.exports = Product;