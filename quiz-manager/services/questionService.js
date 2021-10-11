var mysql = require('mysql2');
var db = require('../db');
const { getAllQuizzes } = require('./quizService');

function createQuestion(questions, onSuccess) {
    var sql = "INSERT INTO `questions` (question, quizid) VALUES (?, ?)";
    var inserts = [questions.question, questions.quizid];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}

function getAllQuestions(onSuccess) {
    var sql = "SELECT * FROM `questions`";
    db.query(sql, onSuccess);
}

function getSingualarQuestion(id, onSuccess) {
    var sql = "SELECT id, name FROM `questions` WHERE id = (?)";
    var inserts = [id];
    var preparedSql = mysql.format(sql, inserts);
       db.query(preparedSql, onSuccess);
}

function editQuestion(formData, onSuccess) {
    var sql = "UPDATE `questions` SET question=? WHERE id=?";
    var inserts = [formData.question, formData.id];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}

function deleteQuestion(id, onSuccess) {
    var sql = "DELETE FROM `questions` WHERE id = (?)";
    var inserts = [id];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}

function retrieveQuestionSetToQuiz(questions) {
    var sql = "SELECT * FROM `quizzes` JOIN questions ON (?) = questions.quizid";
    var inserts = [questions.quizid];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}


module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.getSingualarQuestion = getSingualarQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.createQuestion = createQuestion;
module.exports.retrieveQuestionSetToQuiz = retrieveQuestionSetToQuiz;