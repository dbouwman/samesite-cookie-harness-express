var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var customDomainApp = express();

// view engine setup
customDomainApp.set('views', path.join(__dirname, 'custom-domain-views'));
customDomainApp.set('view engine', 'hbs');

customDomainApp.use(logger('dev'));
customDomainApp.use(express.json());
customDomainApp.use(express.urlencoded({ extended: false }));
customDomainApp.use(cookieParser());
customDomainApp.use(express.static(path.join(__dirname, 'public')));

customDomainApp.use('/', indexRouter);
customDomainApp.use('/postmessagedemo', function(req,res,next) {
  res.render('postmessage', {});
});

// catch 404 and forward to error handler
customDomainApp.use(function(req, res, next) {
  next(createError(404));
});

// error handler
customDomainApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = customDomainApp;
