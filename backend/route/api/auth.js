const express = require("express");
const UserNewController = require("../../controllers/User/UserNewController");
const UserLoggedOutController = require("../../controllers/User/UserLoggedOutController");
const secureAPI = require("../../middleware/secureAPI");
const UserInfoUpdateController = require("../../controllers/User/UserInfoUpdateController");
const UserExistController = require("../../controllers/User/UserExistController");
const route = express.Router();

route.post("/login", secureAPI, UserNewController);
route.post("/logout", secureAPI, UserLoggedOutController);
route.post("/edit", secureAPI, UserInfoUpdateController);
route.post("/userExist", secureAPI, UserExistController);

module.exports = route;
