var bcryptjs = require('bcryptjs'),
    Model = require('../models');


module.exports.show = function(req, res) {
    res.render('signup');
}

module.exports.signup = function(req, res) {
    var flash = require('connect-flash');
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    if (!username || !password || !password2) {
        req.flash('error', "Please, fill in all the fields.")
        res.redirect('signup');
    }

    if (password !== password2) {
        req.flash('error', "Please, enter the same password twice.");
        res.redirect('signup');
    }

    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(password, salt);

    var newUser = {
        username: username,
        salt: salt,
        password: hashedPassword
    };

    Model.users.create(newUser).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        console.log(error);
        req.flash('error', "Please, choose a different username.");
        res.redirect('/signup');
    });
};