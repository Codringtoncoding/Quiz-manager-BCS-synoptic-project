const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const quizService = require("../services/quizService");
const passport = require("passport");
var helpers = require("../public/helpers/helpers");

var {
  editAccess,
  restrictedAccess,
  viewAccess,
} = require("../security/access");

//create quiz post
const auth = passport.authenticate("jwt", { session: false });

router.post(
  "/",
  auth,
  body("name").isLength({ min: 8 }),
  async (request, response) => {
    //server side validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    await quizService.createQuiz(request.body);
    res.redirect("/quizzes");
  }
);
//render create new page
router.get("/new", async (request, response, next) => {
  response.render("quizzes/new");
});
//get all quizzes
router.get("/", async (request, response) => {
  const quizzes = await quizService.getAllQuizzes();
  if (!quizzes) {
    response.render("error", {
      message: "no quizzes exits",
    });
  }
  response.render("quizzes", {
    quizzes: quizzes,
    message: "Quizzes page",
  });
});

//get singular quiz
router.get("/:id", function (req, res, next) {
  let quizId = req.params.id;
  function onSuccess(quiz) {
    if (quiz.length === 0) {
      res.render("error", {
        message: "no quiz exits",
      });
      return;
    }
    console.log(quiz);
    res.render("quizzes/details", {
      quiz: quiz[0],
    });
    return;
  }
  quizService.getSingualarQuiz(quizId, onSuccess);
});

router.get("/:id/edit", async (request, response) => {
  let quizId = request.params.id;

  const quiz = await quizService.getSingualarQuiz(quizId);
  const questions = await quizService.retrieveQuestionsForQuizId();
  console.log(quiz, "q");
  console.log(questions, "qes");

  const model = {
    quiz: quiz[0],
    questions: questions,
  };
  console.log(model, "model");
  response.render("quizzes/edit", model);
});
router.post("/:id/edit", async (req, res) => {
  let formData = {
    id: req.params.id,
    name: req.body.name,
  };

  try {
    quizService.editQuizName(formData);
  } catch (error) {
    res.render("error", error);
  }

  res.render("quizzes/edit", {
    quiz: {
      id: req.params.id,
      name: formData.name,
    },
  });
});

router.get("/:id/delete", async (request, response) => {
  let id = request.params.id;
  res.render("quizzes/delete", { id });
});

router.post("/:id/delete", async (request, response) => {
  let quizId = request.params.id;
  try {
    await quizService.deleteQuiz(quizId);
  } catch (err) {
    response.render("error", err);
  }
  console.log("deleted");
  response.redirect("/quizzes");
});

module.exports = router;
