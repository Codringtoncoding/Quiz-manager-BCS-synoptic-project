var mysql = require('mysql2');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'quiz_manager'
});

connection.connect(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Connected!');
    }
});

function query(sql, onResult) {
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        onResult(results);
    });
}

module.exports.query = query;