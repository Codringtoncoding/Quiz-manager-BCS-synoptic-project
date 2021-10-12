var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
var helpers = require('../public/helpers/helpers') 
var passport = require("passport");

const questionService = require("../services/questionService");
//create quiz post
router.post(
  //saniziation
  "/",
  body("question").isLength({ min: 8 }).not().isEmpty().trim().escape(),
  function (req, res) {
    //server side validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    function onSuccess() {
      res.redirect("/quizzes");
    }
    console.log(req.body, "req.body");

    questionService.createQuestion(req.body, onSuccess);
  }
);


router.get("/", function (req, res, next) {

  function onSuccess(questions) {
    console.log(questions, "questions");

    if (!questions) {
      res.render("error", {
        message: "no questions exits",
      });
    }
    res.render("questions", {
      questions: questions,
      message: "Questions page",
    });
  }
  questionService.retrieveQuestionFromQuizId(onSuccess);
});

//render create new page
// router.get("/new", function (req, res, next) {
//   res.render("quizzes/new");
// });
// router.get("/", function (req, res, next) {
//   function onSuccess(quizzes) {
//     if (!quizzes) {
//       res.render("error", { message: "no quizzes exits" });
//     }
//     res.render("quizzes", { quizzes: quizzes, message: "Quizzes page" });
//   }
//   questionService.getAllQuestions(onSuccess);
// });
// // router.get("/:id", function (req, res, next) {
// //   let quizId = req.params.id;

// //   function onSuccess(quiz) {
// //     if (quiz.length === 0) {
// //       res.render("error", { message: "no quiz exits" });
// //     }
// //     console.log(quiz);
// //     res.render("quizzes/details", { quiz: quiz[0] });
// //   }
// //   questionService.getSingualarQuestion(quizId, onSuccess);
// // });

// router.get("/:id/edit", function (req, res, next) {
//   let quizId = req.params.id;
//   function onSuccess(quiz) {
//     if (quiz.length === 0) {
//       res.render("error", { message: "no quiz exits" });
//     }
//     res.render("quizzes/edit", { quiz: quiz[0] });
//   }
//   questionService.getSingualarQuestion(quizId, onSuccess);
// });

// router.post("/:id/edit", function (req, res, next) {
//   function onSuccess() {
//     res.render("quizzes/edit", {
//       quiz: {
//         id: req.params.id,
//         name: formData.name,
//       },
//     });
//   }
//   let formData = {
//     id: req.params.id,
//     name: req.body.name,
//   };
//   questionService.editQuestion(formData, onSuccess);
// });

// router.get("/:id/delete", function (req, res, next) {
//   let id = req.params.id;
//   res.render("quizzes/delete", { id });
// });

// router.post("/:id/delete", function (req, res, next) {
//   let quizId = req.params.id;
//   function onSuccess() {
//     console.log("deleted");
//     res.redirect("/quizzes");
//   }
//   questionService.deleteQuestion(quizId, onSuccess);
// });

module.exports = router;
