const bcrypt = require('bcryptjs');

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
        res.redirect('/login')
    })
})
    .catch(err => console.log(err));
};

