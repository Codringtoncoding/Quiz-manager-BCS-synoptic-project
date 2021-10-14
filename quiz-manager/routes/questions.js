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
const { retrieveAnswersFromQuestionsId, createAnswer } = require("../services/answerService");
// create quiz post
router.post(
  //saniziation
  "/",
  body("question").isLength({ min: 8 }).not().isEmpty().trim().escape(),
  async (req, res) => {
    //server side validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body, 'req')
    const questionID = req.body.quizid;
    const question = req.body.question;
    const answer = req.body.answer;
    console.log(questionID, 'q')
    console.log(answer, 'answer')
    await createQuestion(question, questionID);
    await createAnswer(answer, questionID)
    return res.redirect("/questions");
  }
);
router.get("/", async (req, res, next) => {
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

router.get("/:id/edit", async (req, res) => {
  let questionId = req.params.id;

  const question = await getSingualarQuestion(questionId);
  const answers = await retrieveAnswersFromQuestionsId(questionId);
  const model = {
    question: question[0],
    answers
  };

  console.log(model, "model");

  if (question.length === 0) {
    return res.render("error", {
      message: "no quiz exits",
    });
  }
  return res.render("questions/edit", model);
});

router.post("/:id/edit", async (req, res) => {
  let formData = {
    id: req.params.id,
    question: req.body.question,
  };

  await editQuestion(formData);

  return res.render("quizzes/edit", {
    questions: {
      id: req.params.id,
      questions: formData.question,
    },
  });
});

router.get("/:id/delete", function (req, res, next) {
  let id = req.params.id;
  res.render("questions/delete", { id });
});

router.post("/:id/delete", async (req, res, next) => {
  let quizId = req.params.id;

  console.log("deleted");
  res.redirect("/questions");

  deleteQuestion(quizId);
});

module.exports = router;
