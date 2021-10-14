const mysql = require("mysql2");
const db = require("../db");

async function createQuiz(quiz) {
  const sql = "INSERT INTO `quizzes` (name) VALUES (?)";
  const inserts = [quiz.name];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function getAllQuizes() {
  const sql = "SELECT * FROM `quizzes`";
  return db.query(sql);
}

async function getSingualarQuiz(id) {
  const sql = "SELECT id, name FROM `quizzes` WHERE id =?";
  const inserts = [id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function editQuizName(formData) {
  const sql = "UPDATE `quizzes` SET name=? WHERE id=?";
  const inserts = [formData.name, formData.id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function deleteQuiz(id) {
  const sql = "DELETE FROM `quizzes` WHERE id =?";
  const inserts = [id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function retrieveQuestionsFromId(id) {
  const sql = "SELECT * FROM `questions` WHERE quizid = (?)";
  const inserts = [id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}


module.exports.editQuizName = editQuizName;
module.exports.deleteQuiz = deleteQuiz;
module.exports.getSingualarQuiz = getSingualarQuiz;
module.exports.getAllQuizzes = getAllQuizes;
module.exports.createQuiz = createQuiz;
module.exports.retrieveQuestionsFromId = retrieveQuestionsFromId;

