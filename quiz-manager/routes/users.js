var express = require("express");
var router = express.Router();
var usersService = require("../services/usersService");
var jwt = require("jsonwebtoken");
var { checkBody, validationResult, body } = require("express-validator");
const { compare } = require("bcrypt");

router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/login", async (req, res, next) => {
  res.render("users/login");
});

router.get("/logout", async (req, res, next) => {
  res.render("users/logout");
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("key");
  console.log("logged out");
  res.redirect("/quizzes");
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
      res.render("error", {
        message: "No valid user",
        error: { title: "User not recognised", message: "user not recognised" },
      });
      return;
    }
  
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

    res.redirect("/quizzes");
  }
);

module.exports = router;
