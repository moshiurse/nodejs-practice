const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// use bodyParser
app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

// use middleware
// app.use('/', (req, res, next) => {
//     console.log("Middleware runs always!!");
//     next();
// })


app.listen(3000);
