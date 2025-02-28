const express = require("express");
const UserNewController = require("../../controllers/User/UserNewController");
const route = express.Router();

route.post("/add", UserNewController);

module.exports = route;
