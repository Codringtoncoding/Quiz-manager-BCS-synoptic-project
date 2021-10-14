require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
var JwtStrategy = require("passport-jwt").Strategy;
var CookieExtractor = require("./security/cookieExtractor");
var passport = require("passport");


const app = express();

var opts = {};
opts.jwtFromRequest = CookieExtractor.cookieExtractor;
opts.secretOrKey = process.env.AUTH_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // add the findUser function to get the details for a user given their username
    usersService.findUser(jwt_payload["user"].username, function (err, user) {
      if (err) {
        return done(err, null);
      }
      return done(null, user);
    });
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quizzes', quizzesRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("hello")
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
