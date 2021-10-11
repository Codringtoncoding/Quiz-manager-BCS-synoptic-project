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

module.exports.getAllQuizzes = getAllQuizes;
module.exports.createQuiz = createQuiz;