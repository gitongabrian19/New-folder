var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connectDb = require('./public/javascripts/databaseConn');
var submit = require('./routes/submitBookNow');
var cors = require('cors');

var app = express();
connectDb();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin : 'http://127.0.0.1:5501',
  methods : 'POST',
  optionSuccessStatus : 204,
};

app.use('/', indexRouter);
app.use('/users', usersRouter);

// my routes
app.options('/submitBookNow', cors(corsOptions));
app.post('/submitBookNow', cors(corsOptions), submit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error', // Define the title variable
    message: err.message,
    error: err
  });
});

// render the error message
app.get('/error', function(req, res, next) {
  res.render('error', { message: 'An error occurred' }); // Pass the message variable
});

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
