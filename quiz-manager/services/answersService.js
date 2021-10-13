import { format } from 'mysql2';
import { query } from '../db';

function createAnswer(answers, onSuccess) {
    var sql = "INSERT INTO `answers` (answer, questionid) VALUES (?, ?)";
    var inserts = [answers.answer, answers.questionid];
    var preparedSql = format(sql, inserts);
    query(preparedSql, onSuccess);
}

function getAllAnswers(onSuccess) {
    var sql = "SELECT * FROM `answers`";
    query(sql, onSuccess);
}

function getSingualarAnswer(id, onSuccess) {
    var sql = "SELECT id, answer FROM `answers` WHERE id = (?)";
    var inserts = [id];
    var preparedSql = format(sql, inserts);
       query(preparedSql, onSuccess);
}

function editAnswers(formData, onSuccess) {
    var sql = "UPDATE `answers` SET question=? WHERE id=?";
    var inserts = [formData.question, formData.id];
    var preparedSql = format(sql, inserts);
    query(preparedSql, onSuccess);
}

function deleteAnswers(id, onSuccess) {
    var sql = "DELETE FROM `answers` WHERE id = (?)";
    var inserts = [id];
    var preparedSql = format(sql, inserts);
    query(preparedSql, onSuccess);
}

function retrieveAnswerFromQuestionID(onSuccess) {
    var sql = "SELECT * FROM `quizzes` JOIN `questions` ON `quizzes`.`id` = `questions`.`quizid`";
    console.log(sql,'sql')
    query(sql, onSuccess);
}


const _editAnswers = editAnswers;
export { _editAnswers as editAnswers };
const _deleteAnswers = deleteAnswers;
export { _deleteAnswers as deleteAnswers };
const _getSingualarAnswer = getSingualarAnswer;
export { _getSingualarAnswer as getSingualarAnswer };
const _getAllAnswers = getAllAnswers;
export { _getAllAnswers as getAllAnswers };
const _createAnswer = createAnswer;
export { _createAnswer as createAnswer };
const _retrieveAnswerFromQuestionID = retrieveAnswerFromQuestionID;
export { _retrieveAnswerFromQuestionID as retrieveAnswerFromQuestionID };
