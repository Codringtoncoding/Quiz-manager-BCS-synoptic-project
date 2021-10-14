const mysql = require('mysql2');
const db = require('../db');

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

async function editAnswers(formData) {
    const sql = "UPDATE `answers` SET question=? WHERE id=?";
    const inserts = [formData.question, formData.id];
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
    const sql = "SELECT * FROM `answers` WHERE questionid = (?)";
    const inserts = [id];
    const preparedSql = mysql.format(sql, inserts);
    return db.query(preparedSql);
  }

  module.exports.createAnswer = createAnswer;
  module.exports.getAllAnswers = getAllAnswers;
  module.exports.getSingualarAnswer = getSingualarAnswer;
  module.exports.editAnswers = editAnswers;
  module.exports.deleteAnswers = deleteAnswers;
  module.exports.retrieveAnswersFromQuestionsId = retrieveAnswersFromQuestionsId;