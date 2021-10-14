var express = require("express");
var router = express.Router();
var usersService = require("../services/usersService");
var jwt = require("jsonwebtoken");
var { checkBody, validationResult, body } = require("express-validator");
const passport = require("passport");

const auth =  passport.authenticate("jwt", { session: false });

router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/login", async (req, res, next) => {
  res.render("users/login");
});

router.get("/logout", async (req, res, next) => {
  res.clearCookie("key");
  req.logout();
  res.redirect("/")
});

router.post(
  "/login",
  // body('email').isEmail().normalizeEmail,
  // body('username').isLength({
  //   min:6
  // }),
  async (req, res, next) => {
    const user = await usersService.validateLogin(req.body);
    if (!user) {
      return res.render("error", {
        message: "No valid user or wrong password",
        error: { title: "User not recognised", message: "user not recognised" },
      });
      ;
    }
    console.log(user, "user")
    const token = jwt.sign(
      {
        user: {
          username: user[0].username,
        },
      },
      process.env.AUTH_SECRET
    );

    res.cookie("token", token);
    console.log("logged in");
    console.log("token", token);
    console.log("user", user[0].username);

    return res.redirect("/quizzes");
  }
);

module.exports = router;
