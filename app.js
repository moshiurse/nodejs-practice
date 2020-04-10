const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);


// use middleware for 404 Page not found
app.use(errorController.get404Page);

sequelize.sync().then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})


