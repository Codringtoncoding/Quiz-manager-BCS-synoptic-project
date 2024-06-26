const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const quizService = require("../services/quizService");

const passport = require("passport");

const {
  restrictedAccess,
  viewAccess,
} = require("../security/access");

const auth = passport.authenticate("jwt", { session: false });

//create quiz post
router.post(
  "/",
  auth,
  restrictedAccess,
  body("name").isLength({ min: 8 }),
  async (req, res) => {
    //server side validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await quizService.createQuiz(req.body);
    res.redirect("/quizzes");
    return;
  }
);
//render create new page
router.get(
  "/new",
  viewAccess,
  restrictedAccess,
  auth,
  async (req, res, next) => {
    return res.render("quizzes/new");
  }
);

//get all quizzes
router.get("/", auth, async (req, res) => {
  const quizzes = await quizService.getAllQuizzes();
  if (!quizzes) {
    return res.render("error", {
      message: "no quizzes exits",
    });
  }
  return res.render("quizzes", {
    quizzes: quizzes,
    message: "Quizzes page",
  });
});

//get singular quiz
router.get("/:id", auth, async function (req, res, next) {
  let quizId = req.params.id;
  const quiz = await getSingualarQuiz(quizId);

  if (quiz.length === 0) {
    return res.render("error", {
      message: "no quiz exits",
    });
  }
  return res.render("quizzes/details", {
    quiz: quiz[0],
  });
});

router.get(
  "/:id/edit",
  auth,
  viewAccess,
  restrictedAccess,
  async (req, res) => {
    let quizId = req.params.id;

    const quiz = await quizService.getSingualarQuiz(quizId);
    const questions = await quizService.retrieveQuestionsFromId(quizId);

    const model = {
      quiz: quiz[0],
      questions,
    };

    if (quiz.length === 0) {
      return res.render("error", {
        message: "no quiz exits",
      });
    }
    return res.render("quizzes/edit", model);
  }
);

router.post(
  "/:id/edit",
  viewAccess,
  restrictedAccess,
  auth,
  async (req, res) => {
    let formData = {
      id: req.params.id,
      name: req.body.name,
    };

    await quizService.editQuizName(formData);

    return res.render("quizzes/edit", {
      quiz: {
        id: req.params.id,
        name: formData.name,
      },
    });
  }
);

router.get(
  "/:id/delete",
  viewAccess,
  restrictedAccess,
  auth,
  async (req, res) => {
    let id = req.params.id;
    return res.render("quizzes/delete", { id });
  }
);

router.post(
  "/:id/delete",
  viewAccess,
  restrictedAccess,
  auth,
  async (req, res) => {
    let quizId = req.params.id;

    try {
      await quizService.deleteQuiz(quizId);
    } catch (err) {
      return res.render("error", err);
    }
    console.log("deleted");
    return res.redirect("back");
  }
);

module.exports = router;
