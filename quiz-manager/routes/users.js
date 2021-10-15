var express = require("express");
var router = express.Router();
var usersService = require("../services/usersService");
var jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/login", async (req, res, next) => {
  res.render("users/login");
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("key");
  req.logout();
  res.redirect("/");
});

router.post("/login", async (req, res, next) => {
  const user = await usersService.validateLogin(req.body);
  if (!user) {
    return res.render("errorLogin", {
      message: "No valid user or wrong password",
      error: { title: "User not recognised", message: "user not recognised" },
    });
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

  return res.redirect("/quizzes");
});

module.exports = router;
