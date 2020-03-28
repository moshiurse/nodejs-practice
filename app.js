const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// configure template engine
app.set('view engine', 'pug');
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
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);
