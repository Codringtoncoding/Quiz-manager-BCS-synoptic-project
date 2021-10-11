var express = require("express");
var router = express.Router();

var quizService = require("../services/quizService");

router.post("/", function (req, res) {
  function onSuccess(result) {
    res.redirect("/quizzes");
  }
  quizService.createQuiz(req.body, onSuccess);
});

router.get("/new", function (req, res, next) {
  res.render("quizzes/new");
});

router.get("/", function (req, res, next) {
  function onSuccess(quizzes) {
    if (!quizzes) {
      res.render("error", { message: "no quizzes exits" });
    }
    res.render("quizzes", { quizzes: quizzes, message: "Quizzes page" });
  } 
  quizService.getAllQuizzes(onSuccess);
});

module.exports = router;
