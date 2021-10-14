const groupQuestionsByQuizId = (quizId, questions) => {
  const q = questions.filter((question) => question.quizid === quizId);
  return q;
}

const getDataFromObj = (data) => {
  for (const [value] of Object.entries(data)) {
  console.log(`${value}`);
  }
}
module.exports.getDataFromObj = getDataFromObj;

module.exports.groupQuestionsByQuizId = groupQuestionsByQuizId;
