const mysql = require("mysql2");
const db = require("../db");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

async function createUser(user) {
  const sql = "INSERT INTO `user` (username, password, role) VALUES (?, ?, ?)";
  const hashPasswordResult = hashPassword(user.password);
  const inserts = [user.username, hashPasswordResult, user.role];
  const preparedSql = mysql.format(sql, inserts);
  db.query(preparedSql, onSuccess);
}

async function validateLogin(user) {
  const sql = "SELECT * FROM `user` WHERE username = ?";
  const inserts = [user.username];
  const preparedSql = mysql.format(sql, inserts);
  // React to query
  const onFindingUser = async (result) => {
    if (!result || result.length != 1) {
      // onSuccess(false, null);
      console.log("no user");
      return;
    }
    const passwordCorrect = bcrypt.compareSync(
      user.password,
      result[0].password
    );

    return passwordCorrect, result[0];
  };
  return db.query(preparedSql, onFindingUser);
}

async function findUser(username) {
  const sql = "SELECT username, role FROM `user` WHERE username = (?)";

  console.log("username", username);

  const inserts = [username];
  const preparedSql = mysql.format(sql, inserts);
  const onResult = async (result) => {
    console.log(result[0].username, "result");

    const userFromDb = result[0].username;

    if (!username === userFromDb) {
      // onSuccess(null, "no user");
       console.log("no user");

      return;
    }
     result;
  }
  db.query(preparedSql, onResult);
}
// findUser('read_user', () => {})
module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.validateLogin = validateLogin;
