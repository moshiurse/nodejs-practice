const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Product = require('./model/product');
const User = require('./model/user');

const errorController = require('./controllers/error');

const expressHbs = require('express-handlebars');
const app = express();


// Handlebars engine configure
// app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'handlebars'}));

// configure template engine
// app.set('view engine', 'pug'); // Pug
// app.set('view engine', 'handlebars'); //handlebars
app.set('view engine', 'ejs'); //EJS
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser
app.use(bodyParser.urlencoded({extended: false}));
// access static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware sfor store user
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);


// use middleware for 404 Page not found
app.use(errorController.get404Page);

// 
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
// sync with table by sequelize
sequelize.sync({force: true})
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({name: "Moshiur", email: "moshiurse@gmail.com"});
    }
    return user;
})
.then(user => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})


