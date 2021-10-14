var express = require('express');
var router = express.Router();
const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false });

/* GET home page. */
router.get('/', auth, function(req, res, next) {

  return res.render('index', { title: 'Quiz Manager' });
});

module.exports = router;
