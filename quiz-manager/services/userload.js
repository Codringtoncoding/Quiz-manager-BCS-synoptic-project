var usersService = require('./usersService');
var db = require('../db');


my_test_user_edit = {
    username: "read_user",
    password: "read123",
    role: "edit"
};
my_test_user_view = {
    username: "view_user",
    password: "view123",
    role: "view"
};
my_test_user_restricted = {
    username: "restricted_user",
    password: "restricted123",
    role: "restricted"
};
onSuccess = () => {
    db.end();
};

usersService.createUser(my_test_user, onSuccess);

