const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// use bodyParser
app.use(bodyParser.urlencoded({extended: false}));
// use middleware
app.use('/', (req, res, next) => {
    console.log("Middleware runs always!!");
    next();
})

app.use('/add',(req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="pname"><button type="submit">Submit</button></form>');
})

app.use('/product',(req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

app.use('/',(req, res, next) => {
    res.send('<h3>Hello From Moshiur Rahman</h3>');
})

app.listen(3000);
