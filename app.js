var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var flash = require('connect-flash');
var sessions = require('express-session');
var setupPassport = require('./setupPassport');
var app = express();


app.use(flash());
console.log('start cookie')
app.use(cookieParser());
console.log('start session')
app.use(session({ secret: 'wo9iijbnegl3kdn5k3fqw', resave: false, saveUninitialized: false }))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
console.log('start router')
setupPassport(app);
var appRouter = require('./routes/index.js')(app);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.use(function(req, res, next) {
    res.locals.errorMessage = res.flash('error')
    next()
});
// console.log('pasport init')

module.exports = app;