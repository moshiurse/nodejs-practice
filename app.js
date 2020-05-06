const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./model/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5eb2a9437d4a729078339a9d')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);


mongoose.connect(
  'mongodb+srv://root:12345@moshiurscluster-mkbxp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  )
.then(result => {

  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: "moshiur",
        email: "moshiur@gmail.com",
        cart: {
          items: []
        }
      });
    
      user.save();

    }
  })

  app.listen(3000);
})
.catch(err => console.log(err));