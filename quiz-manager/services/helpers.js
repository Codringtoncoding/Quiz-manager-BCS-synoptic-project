// const quizId = 1;

// const questions = [
//    {
//     id: 1,
//     name: 'Cities of the France',
//     question: 'what color is the sky?',
//     quizid: 1
//   },
//    {
//     id: 2,
//     name: 'Cities of the France',
//     question: 'what color is the grass',
//     quizid: 1
//   },
//    {
//     id: 3,
//     name: 'Cities of the France',
//     question: 'what color is the lava',
//     quizid: 2
//   },
//    {
//     id: 4,
//     name: 'Cities of the France',
//     question: 'what is the capital of france? ',
//     quizid: 1
//   }
// ];
function groupQuestionsByQuizId(quizId, questions) {
  const q = questions.filter((question) => question.quizid === quizId);
  return q;
}

// console.log(groupQuestionsByQuizId(quizId, questions));
