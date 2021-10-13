const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "quiz_manager",
});

connection.connect(function (error) {
  if (!!error) {
    console.log('DB CONNECT error');
  } else {
    console.log("Connected!");
  }
});

async function query(sql) {
    const db = connection
    .promise()
    .query(sql)
    .then(([rows]) => {
      return rows
    })
    .catch(console.log("error"));
    return db;
}

function end() {
  connection.end();
}

module.exports.end = end;
module.exports.query = query;
