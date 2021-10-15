const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const {
  createQuestion,
  retrieveQuestionFromQuizId,
  deleteQuestion,
  editQuestion,
  getSingualarQuestion,
} = require("../services/questionService");
const {
  retrieveAnswersFromQuestionsId,
  createAnswer,
} = require("../services/answerService");
const { retrieveQuestionsFromId } = require("../services/quizService");

const { restrictedAccess, viewAccess } = require("../security/access");

const auth = passport.authenticate("jwt", { session: false });

// create quiz post
router.post(
  //saniziation
  "/",
  body("question").isLength({ min: 8 }).not().isEmpty().trim().escape(),
  auth,
  viewAccess,
  restrictedAccess,
  async (req, res) => {
    //server side validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const questionId = req.body.quizid
    const question  = req.body.question
    const answer = req.body.answer
    console.log(req.body, "req")
  
    await createQuestion(question, questionId);
    await createAnswer(answer, questionId);
    return res.redirect("back");
  }
);
router.get("/", auth, async (req, res, next) => {
  const questions = await retrieveQuestionFromQuizId();

  if (!questions) {
    return res.render("error", {
      message: "no questions exits",
    });
  }
  return res.render("questions", {
    questions: questions,
    message: "Questions page",
  });
});

router.get(
  "/:id/edit",
  auth,
  viewAccess,
  restrictedAccess,
  async (req, res) => {
    let questionId = req.params.id;

    const question = await getSingualarQuestion(questionId);
    const answers = await retrieveAnswersFromQuestionsId(questionId);
    const model = {
      question: question[0],
      answers,
    };

    if (question.length === 0) {
      return res.render("error", {
        message: "no quiz exits",
      });
    }
    return res.render("questions/edit", model);
  }
);

router.post(
  "/:id/edit",
  auth,
  viewAccess,
  restrictedAccess,
  async (req, res) => {
    let formData = {
      id: req.params.id,
      question: req.body.question,
    };

    await editQuestion(formData);

    return res.redirect('back')
  }
);
//get questions for quiz
router.get("/:id", auth, async (req, res) => {
  let quizId = req.params.id;

  const quizName = await retrieveQuestionFromQuizId(quizId);
  const question = await retrieveQuestionsFromId(quizId);

  const model = {
    questionName: quizName[0],
    question,
  };

  if (question.length === 0) {
    return res.render("error", {
      message: "no question exits for this quiz",
    });
  }
  return res.render("questions", model);
});

router.get(
  "/:id/delete",
  auth,
  viewAccess,
  restrictedAccess,
  function (req, res, next) {
    let id = req.params.id;
    res.render("questions/delete", { id });
  }
);

router.post(
  "/:id/delete",
  auth,
  viewAccess,
  restrictedAccess,
  async (req, res, next) => {
    let quizId = req.params.id;
    res.redirect('/quizzes');
    deleteQuestion(quizId);
  }
);

module.exports = router;
