var express = require('express');
var session = require('express-session');
var passport = require('passport'),
    signupController = require('../controllers/signupController.js');
var router = express.Router();
Model = require('../models');


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

        successRedirect: '/game',
        failureRedirect: '/',
        failureFlash: true,
    }), function(req, res) {
        User.findOne({ username: req.body.username }, function(err, user) {
            if (!user) {
                req.flash('error', 'Invalid username or password.');
            } else {
                if (req.body.password === user.password) {
                    // sets a cookie with the user's info
                    req.session.user = user;
                    res.redirect('/game');
                } else {
                    res.flash('error', 'error:Invalid email or password.');

                }
            }
        });

    });

    app.get('/', function(req, res, next) {
        res.render('home', {
            title: 'Speed Sudoku'
        });
    });

    app.get('/game', isAuthenticated, function(req, res) {
        res.render('Game');
    })

    app.get('/login', function(req, res, next) {
        console.log('LOOKATME' + req.session);
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