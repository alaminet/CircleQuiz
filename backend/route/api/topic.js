const express = require("express");
const TopicsNewController = require("../../controllers/TopicsNewController");
const route = express.Router();

route.post("/add", TopicsNewController);

module.exports = route;
