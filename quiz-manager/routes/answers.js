const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  getAllAnswers,
  retrieveAnswersFromQuestionsId,
  editAnswer,
  deleteAnswers,
} = require("../services/answerService");

const { restrictedAccess, viewAccess } = require("../security/access");

const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.post(
  "/",
  auth,
  restrictedAccess,
  viewAccess,
  async (req, res) => {
    //server side validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const questionID = req.body.quizid;
    const answer = req.body.answer;
    const correct = req.body.correct;

    await editAnswer(answer, correct, questionID);
    res.redirect("back");
  }
);

router.get("/:id", auth, viewAccess, restrictedAccess, async (req, res) => {
  const answers = await getAllAnswers();
  return res.render("answers", { answers });
});

router.post("/:id", auth, restrictedAccess, async (req, res) => {
  let questionId = req.params.id;
  const answers = await retrieveAnswersFromQuestionsId(questionId);

  return res.render("answers", {
    answers,
  });
});

router.get(
  "/:id/answers-only",
  auth,
  restrictedAccess,
  async (req, res, next) => {
    let questionId = req.params.id;
    const answers = await retrieveAnswersFromQuestionsId(questionId);

    if (answers.length === 0) {
      return res.render("error", {
        message: "no answers exits for this quiz",
      });
    }

    res.render("answers/view-only", { answers });
  }
);

router.get(
  "/:id/delete",
  auth,
  viewAccess,
  restrictedAccess,
  function (req, res, next) {

    let id = req.params.id;
    res.render("answers/delete", { id });
  }
);

router.post(
  "/:id/delete",
  auth,
  viewAccess,
  restrictedAccess,
  async (req, res, next) => {

    let questionId = req.params.id;
    await deleteAnswers(questionId);
    console.log("deleted");
    res.redirect("back");
  }
);

module.exports = router;
