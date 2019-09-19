var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/oauth');

var platformApp = express();

// view engine setup
platformApp.set('name', 'Platform App');
platformApp.set('views', path.join(__dirname, 'views'));
platformApp.set('view engine', 'hbs');

platformApp.use(logger('dev'));
platformApp.use(express.json());
platformApp.use(express.urlencoded({ extended: false }));
platformApp.use(cookieParser());
platformApp.use(express.static(path.join(__dirname, 'public')));

platformApp.use('/', indexRouter);
platformApp.use('/authorize', authRouter);
platformApp.use('/app-in-iframe', function (req, res, next) {
  res.render('iframe', { title: 'IFrame', cookies: req.cookies, url: req.originalUrl });
});
platformApp.use('/pm-app-in-iframe', function (req, res, next) {
  res.render('pm-iframe', { title: 'Post Message IFrame', cookies: req.cookies, url: req.originalUrl });
});
platformApp.use('/redirect.html', function (req, res, next) {
  res.render('redirect', { title: 'Redirect Html' });
});



// catch 404 and forward to error handler
platformApp.use(function(req, res, next) {
  next(createError(404));
});

// error handler
platformApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = platformApp;
