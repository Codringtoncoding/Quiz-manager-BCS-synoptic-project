var express = require('express');
var router = express.Router();
var usersService = require('../services/usersService')
var jwt = require('jsonwebtoken')
var { checkBody, validationResult  } = require('express-validator');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/logout', function(req, res, next) {
  res.render('users/logout');
});


router.post('/logout', function(req, res, next) {
  res.clearCookie("key");
  console.log('logged out')
  res.redirect('/books')
});

router.post('/login',
  // body('email').isEmail().normalizeEmail,
  // body('username').isLength({
  //   min:6
  // }),
 function(req, res, next) {
  function onSuccess(success, user) {
    if (!success) {
      res.render('error', { message: 'No valid user', error: {title: 'User not recognised', message: ''} });
      return;
    } 
    const token = jwt.sign({ 
      user: {
        username: user.username
      }
    },
    // Your secret, e.g. here set by environment variable
    process.env.AUTH_SECRET);
    
    res.cookie('token', token);
      console.log('logged in')
      res.redirect('/quizzes');
  }

  usersService.validateLogin(req.body, onSuccess)
});
// create a user
router.post('/login', function(req, res, next) {
  
  let formData = { 
    username: req.body.username,
    password: req.body.password,
  }


  function onSuccess() {
      res.render('books/edit', {
          user: formData.username,
          password: formData.password,
      })
  
  }

  usersService.createUser(formData, onSuccess)

});

module.exports = router;

module.exports = router;
