var usersService = require('./usersService');
var db = require('../db');


my_test_user = {
    username: "read_user",
    password: "read123",
    role: "read"
};

onSuccess = () => {
    db.end();
};

usersService.createUser(my_test_user, onSuccess);

