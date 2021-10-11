var mysql = require('mysql2');
var db = require('../db');

function createQuiz(quiz, onSuccess) {
    var sql = "INSERT INTO `quizes` (title) VALUES (?)";
    var inserts = [quiz.title];
    var preparedSql = mysql.format(sql, inserts);
    db.query(preparedSql, onSuccess);
}

function getAllQuizes(onSuccess) {
    var sql = "SELECT * FROM `quizes`";
    db.query(sql, onSuccess);
}

module.exports.getAllQuizes = getAllQuizes;
module.exports.createQuiz = createQuiz;