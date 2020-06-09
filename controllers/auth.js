const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User =  require('../model/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split(';')[0]
    // .trim().split('=')[1] === 'true';
    let msg = req.flash('error');
    if(msg.length > 0){
        msg = msg[0];
    }else{
        msg = null;
    }
        res.render('auth/login', 
        {
           path: '/login',
           title: 'Login',
           isAuthenticated: false,
           errorMsg: msg
        });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user => {
        if(!user){
            req.flash("error", "Invalid Email or password");
            return res.redirect('/login');
        }
        return bcrypt.compare(password, user.password)
        .then(matched => {
            if(matched){
                req.session.isLoggedIn = true;
                req.session.user = user;

                return req.session.save((err) => {
                    console.log(err);
                    res.redirect('/');
                })
            }
            req.flash("error", "Invalid Email or password");
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });

    })
    .catch(err => console.log(err)); 
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
};

exports.getSignup = (req, res, next) => {
        let msg = req.flash('error');
        if(msg.length > 0){
            msg = msg[0];
        }else{
            msg = null;
        }
        res.render('auth/signup', 
        {
           path: '/signup',
           title: 'Sign Up',
           isAuthenticated: false,
           errorMsg: msg
        });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email: email})
    .then(userDoc => {
        if(userDoc){
            req.flash("error", "Email already exists!!");
            return res.redirect('/signup');
        }
        
        return bcrypt.hash(password, 12)
        .then(hashedPass => {
            const user = new User({
                email: email,
                password: hashedPass,
                cart: {items: []}
            });
            return user.save();
        })

    .then(result => {

// nodemailer sending mail
        const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <p>User created successfully</p>
        `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.moshiurse.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'mailtest@moshiurse.com',
          pass: 'tUzEf4zo+dgj'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Moshiur Rahman" <mailtest@moshiurse.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Testing my mail server in nodejs', // Subject line
        text: 'Hello NodeJs Dev', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.redirect('/login')
    });
    })
})
    .catch(err => console.log(err));
};

