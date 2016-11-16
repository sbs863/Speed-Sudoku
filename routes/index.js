var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', {
    title: 'Speed Sudoku'
  });
});

/* GET Login Page */

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Speed Sudoku',
  });
});


router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Speed Sudoku',
  });
});

module.exports = router;