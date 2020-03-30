const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const expressHbs = require('express-handlebars');
const app = express();


// Handlebars engine configure
app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'handlebars'}));

// configure template engine
// app.set('view engine', 'pug'); // Pug
app.set('view engine', 'handlebars'); //handlebars
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser
app.use(bodyParser.urlencoded({extended: false}));
// access static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);


// use middleware for 404 Page not found
app.use((req, res, next) => {
    res.status(404).render('404', {title : "Page not found"});
})

app.listen(3000);
