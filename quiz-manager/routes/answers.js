const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {getAllAnswers, retrieveAnswersFromQuestionsId } = require("../services/answerService");
const passport = require("passport");

const {
  editAccess,
  restrictedAccess,
  viewAccess,
} = require("../security/access");

const auth = passport.authenticate("jwt", { session: false });

// //create answer post
// router.postAsync("/", 
// auth, 
// body("name").isLength({ min: 8 }),
//   async (req, res) => {
//     //server side validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     await answerService.createAnswer(req.body);
//     res.redirect("/quizzes");
//   }
// );
// //render create new page
// router.getAsync( "/view", async (req, res, next) => {
//   req.render("answers");
// });

//get all answers for qestion
// router.getAsync("/", async (req, res) => {
//   const answers = await answerService.getAllAnswers();
//   if (!answers) {
//     res.render("error", {
//       message: "no answers exits",
//     });
//   }
//   res.render("answers", {
//     answers,
//     message: "answers page",
//   });
// });

router.get("/:id", async (req, res) => {
    // let id = req.body.id;  
    const answers = await getAllAnswers()
    console.log(answers, 'a')
    return res.render("answers", {answers})
  });

router.post("/:id", async (req, res) => {
    let questionId =  req.params
    console.log(req, 'req')

    console.log(req.body, 'req')
    console.log(questionId , 'questionId');


    const answers = await retrieveAnswersFromQuestionsId(questionId)
    console.log(answers , 'answers');
    
    return res.render("answers", {
        answers
    });
});



//   router.postAsync("/:id/view", async (req, res) => {
//     let quizId = req.params.id;
//     try {
//       await quizService.deleteQuiz(quizId);
//     } catch (err) {
//       res.render("error", err);
//     }
//     console.log("deleted");
//     res.redirect("/quizzes");
//   });

// //get singular quiz
// router.getAsync("/:id", async function (req, res, next) {
//   let quizId = req.params.id;
//   const quiz = await answerService.getSingualarAnswer(quizId);

//   if (quiz.length === 0) {
//     res.render("error", {
//       message: "no quiz exits",
//     });
//     return;
//   }
//   console.log(quiz);
//   res.render("quizzes/details", {
//     quiz: quiz[0],
//   });
//   return;
// });

// router.getAsync("/:id/edit", async (req, res) => {
//   let quizId = req.params.id;

//   const quiz = await quizService.getSingualarQuiz(quizId);
//   const questions = await quizService.retrieveQuestionsFromId(quizId);

//   console.log(questions, "q");

//   const model = {
//     quiz: quiz[0],
//     questions,
//   };

//   if (quiz.length === 0) {
//     res.render("error", {
//       message: "no quiz exits",
//     });
//     return;
//   }
//   res.render("quizzes/edit", model);
// });



// router.getAsync("/:id/delete", async (req, res) => {
//   let id = req.params.id;
//   res.render("quizzes/delete", { id });
// });

// router.postAsync("/:id/delete", async (req, res) => {
//   let quizId = req.params.id;
//   try {
//     await quizService.deleteQuiz(quizId);
//   } catch (err) {
//     res.render("error", err);
//   }
//   console.log("deleted");
//   res.redirect("/quizzes");
// });

module.exports = router;
