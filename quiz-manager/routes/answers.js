const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {getAllAnswers, retrieveAnswersFromQuestionsId, editAnswer, deleteAnswers } = require("../services/answerService");
const passport = require("passport");

const {
  editAccess,
  restrictedAccess,
  viewAccess,
} = require("../security/access");

const auth = passport.authenticate("jwt", { session: false });

//create answer post
router.post("/", 
// auth, 
// body("anser").isLength({ min: 8 }),
  auth, async (req, res) => {
    //server side validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const questionID = req.body.quizid;
    const answer = req.body.answer;
    const correct = req.body.correct;


    await editAnswer(answer, correct, questionID);
    res.redirect('back');

  }
);

router.get("/:id", auth, async (req, res) => {
    let id = req.body.id;  
    const answers = await getAllAnswers()
    return res.render("answers", {answers})
  });

router.post("/:id", auth, async (req, res) => {
    let  questionId =  req.params.id
    const answers = await retrieveAnswersFromQuestionsId(questionId)
    
    return res.render("answers", {
        answers
    });
});
router.get("/:id/answers-only", auth, async (req, res, next) => {

  let  questionId =  req.params.id
  const answers = await retrieveAnswersFromQuestionsId(questionId)

  if (answers.length === 0) {
    return res.render("error", {
      message: "no answers exits for this quiz",
    });
  }
  console.log(answers, 'answer')
  res.render("answers/view-only", {answers});
});

router.get("/:id/delete", function (req, res, next) {
  let id = req.params.id;
  res.render("answers/delete", { id });
});

router.post("/:id/delete", auth, async (req, res, next) => {
  let questionId = req.params.id;
  await deleteAnswers(questionId);
  console.log("deleted");
  res.redirect('back');

});

module.exports = router;
