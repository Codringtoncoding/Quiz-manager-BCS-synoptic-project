const mysql = require('mysql2');
const db = require('../db');

async function createQuestion(question, quizId) {
    const sql = "INSERT INTO `questions` (question, quizid) VALUES (?, ?)";
    const inserts = [question, quizId];
    const preparedSql = mysql.format(sql, inserts);
    console.log(preparedSql, 'prep')
    console.log(quizId , 'input')


    return db.query(preparedSql);
}

async function getAllQuestions() {
    const sql = "SELECT * FROM `questions`";
    const preparedSql = mysql.format(sql);
    return db.query(preparedSql);
}

async function getSingualarQuestion(id) {
    const sql = "SELECT id, question FROM `questions` WHERE id = (?)";
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


async function retrieveQuestionFromQuizId(id) {
    const sql = "SELECT * FROM `quizzes` WHERE id = (?)";
    const inserts = [id];
    const preparedSql = mysql.format(sql, inserts);
    return db.query(preparedSql);
}


module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.getSingualarQuestion = getSingualarQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.createQuestion = createQuestion;
module.exports.retrieveQuestionFromQuizId = retrieveQuestionFromQuizId;
