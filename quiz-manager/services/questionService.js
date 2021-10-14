const mysql = require('mysql2');
const db = require('../db');

async function createQuestion(questions) {
    const sql = "INSERT INTO `questions` (question, quizid) VALUES (?, ?)";
    const inserts = [questions.question, questions.quizid];
    const preparedSql = mysql.format(sql, inserts);
    return db.query(preparedSql);
}

async function getAllQuestions() {
    const sql = "SELECT * FROM `questions`";
    const preparedSql = mysql.format(sql);
    return db.query(preparedSql);
}

async function getSingualarQuestion(id) {
    const sql = "SELECT id, name FROM `questions` WHERE id = (?)";
    const inserts = [id];
    const preparedSql = mysql.format(sql, inserts);
       return db.query(preparedSql);
}

async function editQuestion(formData) {
    const sql = "UPDATE `questions` SET question=? WHERE id=?";
    const inserts = [formData.question, formData.id];
    const preparedSql = mysql.format(sql, inserts);
    return db.query(preparedSql);
}

async function deleteQuestion(id) {
    const sql = "DELETE FROM `questions` WHERE id = (?)";
    const inserts = [id];
    const preparedSql = mysql.format(sql, inserts);
    return db.query(preparedSql);
}


async function retrieveQuestionFromQuizId() {
    const sql = "SELECT * FROM `quizzes` JOIN `questions` ON `quizzes`.`id` = `questions`.`quizid`";
    console.log(sql,'sql')
    const preparedSql = mysql.format(sql);
    return db.query(preparedSql);
}


module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.getSingualarQuestion = getSingualarQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.createQuestion = createQuestion;
module.exports.retrieveQuestionFromQuizId = retrieveQuestionFromQuizId;
