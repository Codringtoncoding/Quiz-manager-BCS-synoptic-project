var mysql = require("mysql2");
var db = require("../db");
var bcrypt = require("bcrypt");

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

function createUser(user, onSuccess) {
  var sql = "INSERT INTO `user` (username, password, role) VALUES (?, ?, ?)";
  var hashPasswordResult = hashPassword(user.password);
  var inserts = [user.username, hashPasswordResult, user.role];
  var preparedSql = mysql.format(sql, inserts);
  db.query(preparedSql, onSuccess);
}

function validateLogin(user, onSuccess) {
  var sql = "SELECT * FROM `user` WHERE username = ?";
  var inserts = [user.username];
  var preparedSql = mysql.format(sql, inserts);
  // React to query
  function onFindingUser(result) {
    if (!result || result.length != 1) {
      onSuccess(false, null);
      return;
    }
    var passwordCorrect = bcrypt.compareSync(user.password, result[0].password);

    onSuccess(passwordCorrect, result[0]);
  }
  db.query(preparedSql, onFindingUser);
}

function findUser(username, onSuccess) {
  var sql = "SELECT username, role FROM `user` WHERE username = (?)";

  console.log("username",  username)

  var inserts = [username];
  var preparedSql = mysql.format(sql, inserts);
  function onResult(result) {

    console.log(result[0].username, 'result')

     const userFromDb = result[0].username;

        if (!username === userFromDb) {
            onSuccess(null, "no user");
            return;
        }
    onSuccess(null, result );
  }
  db.query(preparedSql, onResult);
}
// findUser('read_user', () => {})
module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.validateLogin = validateLogin;
