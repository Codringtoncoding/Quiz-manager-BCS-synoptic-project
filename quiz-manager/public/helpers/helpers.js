const groupQuestionsByQuizId = (quizId, questions) => {
  const q = questions.filter((question) => question.quizid === quizId);
  return q;
}

module.exports.groupQuestionsByQuizId = groupQuestionsByQuizId;
