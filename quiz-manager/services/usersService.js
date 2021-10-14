const mysql = require("mysql2");
const db = require("../db");
const bcrypt = require("bcrypt");

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

async function createUser(user) {
  const sql = "INSERT INTO `user` (username, password, role) VALUES (?, ?, ?)";
  const hashPasswordResult = hashPassword(user.password);
  const inserts = [user.username, hashPasswordResult, user.role];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

// async function validateLogin(user) {
//   const sql = "SELECT * FROM `user` WHERE username = ?";
//   const inserts = [user.username];
//   const preparedSql = mysql.format(sql, inserts);
//   const resultToCheck = await db.query(preparedSql);
//   const passwordCorrect = bcrypt.compareSync(user.password, resultToCheck[0].password);
//   // React to query
//   if (!resultToCheck) {
//     // onSuccess(false, null);
//     console.log("no user");
//     return;
//   }
//   if (passwordCorrect) {
//     console.log("passcorrect");
//     return passwordCorrect, resultToCheck[0];
//   }

//   const incorrect = [
//   "incorrect password", 
//   ...resultToCheck];

//   return incorrect;
// }
async function validateLogin(user) {
  var sql = "SELECT * FROM `user` WHERE username = ?";
  var inserts = [user.username];
  var preparedSql = mysql.format(sql, inserts);
  const resultToCheck = await db.query(preparedSql) // React to query
  function onFindingUser(resultToCheck) {
    if (!resultToCheck || resultToCheck.length != 1) {
      console.log('no user')
      return;
    }
    const passwordCorrect = bcrypt.compareSync(user.password, resultToCheck[0].password);
    console.log(resultToCheck,'res')
    return resultToCheck, passwordCorrect;
  }
  console.log(resultToCheck, 'resultToCheck');
  const outPut = onFindingUser(resultToCheck)
  if(outPut){
    return resultToCheck;
  }
}
async function findUser(username) {
  const sql = "SELECT username, role FROM `user` WHERE username = (?)";
  const inserts = [username];
  const preparedSql = mysql.format(sql, inserts);
  return db.query(preparedSql);
}

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.validateLogin = validateLogin;
