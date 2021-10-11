var mysql = require('mysql2');
var db = require('../db');

function createQuiz(quiz, onSuccess) {
    console.log(quiz, 'quiz')
    var sql = "INSERT INTO `quizzes` (name) VALUES (?)";
    var inserts = [quiz.name];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}

function getAllQuizes(onSuccess) {
    var sql = "SELECT * FROM `quizzes`";
    db.query(sql, onSuccess);
}

function getSingualarQuiz(id, onSuccess) {
    var sql = "SELECT id, name FROM `quizzes` WHERE id = (?)";
    var inserts = [id];
    var preparedSql = mysql.format(sql, inserts);
       db.query(preparedSql, onSuccess);
}

function editQuizName(formData, onSuccess) {
    var sql = "UPDATE `quizzes` SET name=? WHERE id=?";
    var inserts = [formData.name, formData.id];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}

function deleteQuiz(id, onSuccess) {
    var sql = "DELETE FROM `quizzes` WHERE id = (?)";
    var inserts = [id];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}





module.exports.editQuizName = editQuizName;
module.exports.deleteQuiz = deleteQuiz;
module.exports.getSingualarQuiz = getSingualarQuiz;
module.exports.getAllQuizzes = getAllQuizes;
module.exports.createQuiz = createQuiz;