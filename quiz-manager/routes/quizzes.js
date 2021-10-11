const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const quizService = require("../services/quizService");

//create quiz post
router.post("/", body("name").isLength({ min: 8 }), function (req, res) {

  //server side validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  function onSuccess(result) {
    res.redirect("/quizzes");
  }
  quizService.createQuiz(req.body, onSuccess);
});

//render create new page
router.get("/new", function (req, res, next) {
  res.render("quizzes/new");
});

//get all quizzes
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
