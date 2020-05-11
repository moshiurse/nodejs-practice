const User =  require('../model/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split(';')[0]
    // .trim().split('=')[1] === 'true';
        res.render('auth/login', 
        {
           path: '/login',
           title: 'Login',
           isAuthenticated: false
        });
};

exports.postLogin = (req, res, next) => {
    User.findById('5eb2a9437d4a729078339a9d')
    .then(user => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save((err) => {
            console.log(err);
            res.redirect('/');
        })

    })
    .catch(err => console.log(err)); 
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
};

