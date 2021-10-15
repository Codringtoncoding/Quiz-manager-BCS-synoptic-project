const mysql = require("mysql2");
const db = require("../db");

function createAnswer(answer, questionid) {
  const sql = "INSERT INTO `answers` (answer, questionid) VALUES (?, ?)";
  const inserts = [answer, questionid];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function getAllAnswers() {
  const sql = "SELECT * FROM `answers`";
  return db.query(sql);
}

async function getSingualarAnswer(id) {
  const sql = "SELECT id, answer FROM `answers` WHERE id = (?)";
  const inserts = [id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function editAnswer(answer, correct, questionid) {
  const sql = "UPDATE `answers` SET answer=?, correct=? WHERE id=?";
  const inserts = [answer, correct, questionid];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function deleteAnswers(id) {
  const sql = "DELETE FROM `answers` WHERE id = (?)";
  const inserts = [id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

async function retrieveAnswersFromQuestionsId(id) {
  const sql = "SELECT * FROM `answers` WHERE id = (?)";
  const inserts = [id];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

module.exports.createAnswer = createAnswer;
module.exports.getAllAnswers = getAllAnswers;
module.exports.getSingualarAnswer = getSingualarAnswer;
module.exports.editAnswer = editAnswer;
module.exports.deleteAnswers = deleteAnswers;
module.exports.retrieveAnswersFromQuestionsId = retrieveAnswersFromQuestionsId;

