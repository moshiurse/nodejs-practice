const express = require('express');

const app = express();

// use middleware
app.use((req, res, next) => {
    console.log("Middleware!!");
    next(); // next() allows app to execute next another middleware
})

// use another middleware
app.use((req, res, next) => {
    console.log("Another Middleware!!");
    next();
})

// use last middleware
app.use((req, res, next) => {
    console.log("Last Middleware!!");
    res.send('<h3>Hello From Moshiur Rahman</h3>');
})

app.listen(3000);
