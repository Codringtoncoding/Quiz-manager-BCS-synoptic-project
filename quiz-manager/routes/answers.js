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

// const auth = passport.authenticate("jwt", { session: false });

//create answer post
router.post("/", 
// auth, 
// body("anser").isLength({ min: 8 }),
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
    res.redirect('back');

  }
);

router.get("/:id", async (req, res) => {
    // let id = req.body.id;  
    const answers = await getAllAnswers()
    console.log(answers, 'a')
    return res.render("answers", {answers})
  });

router.post("/:id", async (req, res) => {
    let  questionId =  req.params.id
    console.log(req, 'req')

    console.log(req.body, 'req')
    console.log(questionId , 'questionId');


    const answers = await retrieveAnswersFromQuestionsId(questionId)
    console.log(answers , 'answers');
    
    return res.render("answers", {
        answers
    });
});

router.get("/:id/delete", function (req, res, next) {
  let id = req.params.id;
  res.render("answers/delete", { id });
});

router.post("/:id/delete", async (req, res, next) => {
  let questionId = req.params.id;
  await deleteAnswers(questionId);
  console.log("deleted");
  res.redirect('back');

});

module.exports = router;
