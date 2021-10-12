const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const quizService = require("../services/quizService");
var passport = require("passport");
var { editAccess, restrictedAccess, viewAccess } = require("../security/access");

//create quiz post
 
const auth = passport.authenticate('jwt', { session: false });
router.post("/", auth, body("name").isLength({ min: 8 }), function (req, res) {
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
router.get("/new", auth, editAccess, function (req, res, next) {
  res.render("quizzes/new");
});
//get all quizzes
router.get("/", function (req, res, next) {
  function onSuccess(quizzes) {
    if (!quizzes) {
      res.render("error", {
        message: "no quizzes exits",
      });
    }
    res.render("quizzes", {
      quizzes: quizzes,
      message: "Quizzes page",
    });
  }
  quizService.getAllQuizzes(onSuccess);
});

//get singular quiz
router.get("/:id", function (req, res, next) {
  let quizId = req.params.id;

  function onSuccess(quiz) {
    if (quiz.length === 0) {
      res.render("error", {
        message: "no quiz exits",
      });
    }
    console.log(quiz);
    res.render("quizzes/details", {
      quiz: quiz[0],
    });
  }
  quizService.getSingualarQuiz(quizId, onSuccess);
});

router.get("/:id/edit",  function (req, res, next) {
  let quizId = req.params.id;
   function onSuccess(quiz) {
    if (quiz.length === 0) {
       return res.render("error", {
        message: "no quiz exits",
      });
    } 
      res.render("quizzes/edit", {
      quiz: quiz[0],
    });
  }
  quizService.getSingualarQuiz(quizId, onSuccess); 

});
router.post("/:id/edit", function (req, res, next) {
  function onSuccess() {
    res.render("quizzes/edit", {
      quiz: {
        id: req.params.id,
        name: formData.name,
      },
    });
  }
  let formData = {
    id: req.params.id,
    name: req.body.name,
  };
  try {
    quizService.editQuizName(formData, onSuccess);
  } catch (error) {
    res.render("error", error);
  }
});

router.get("/:id/delete", function (req, res, next) {
  let id = req.params.id;
  res.render("quizzes/delete", { id });
});

router.post("/:id/delete", function (req, res, next) {
  let quizId = req.params.id;
  function onSuccess() {
    console.log("deleted");
    res.redirect("/quizzes");
  }
  try {
    quizService.deleteQuiz(quizId, onSuccess);
  } catch (error) {
    res.render("error", error);
  }
});


module.exports = router;
