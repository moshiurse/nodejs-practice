const express = require('express');

const router = express.Router();

router.get('/add',(req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="pname"><button type="submit">Submit</button></form>');
})

router.post('/product',(req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;