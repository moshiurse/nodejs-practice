const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs-practice', 'root', '', 
{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;