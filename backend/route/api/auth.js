const express = require("express");
const UserNewController = require("../../controllers/User/UserNewController");
const secureAPI = require("../../controllers/middleware/secureAPI");
const route = express.Router();

route.post("/add", UserNewController);

module.exports = route;
