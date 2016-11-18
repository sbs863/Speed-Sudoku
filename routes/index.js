var express = require('express');
var passport = require('passport'),
    signupController = require('../controllers/signupController.js');
var router = express.Router();


module.exports = function(app) {

    var isAuthenticated = function(req, res, next) {
        if (req.isAuthenticated())
            return next();
        req.flash('error', 'You have to be logged in to access the page.');
        res.redirect('/');
    }

    app.get('/signup', signupController.show);
    app.post('/signup', signupController.signup);

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/', function(req, res, next) {
        res.render('home', {
            title: 'Speed Sudoku'
        });
    });

    app.get('/dashboard', isAuthenticated, function(req, res) {
        res.render('dashboard');
    })

    app.get('/login', function(req, res, next) {
        res.render('login', {
            title: 'Speed Sudoku',
            message: req.flash('loginMessage')
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

}

