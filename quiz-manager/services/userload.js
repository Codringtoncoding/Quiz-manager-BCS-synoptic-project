var usersService = require("./usersService");
var db = require("../db");

my_test_user_edit = {
  username: "edit_user",
  password: "edit123",
  role: "edit",
};

my_test_user_view = {
  username: "view_user",
  password: "view123",
  role: "view",
};

my_test_user_restricted = {
  username: "restricted_user",
  password: "restricted123",
  role: "restricted",
};

usersService.createUser(my_test_user_view);
usersService.createUser(my_test_user_restricted);
usersService.createUser(my_test_user_edit);
db.end();
