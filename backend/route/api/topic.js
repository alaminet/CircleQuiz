const express = require("express");
const TopicsNewController = require("../../controllers/TopicsNewController");
const TopicsViewAllController = require("../../controllers/TopicsViewAllController");
const TopicsUpdateController = require("../../controllers/TopicsUpdateController");
const route = express.Router();

route.post("/add", TopicsNewController);
route.get("/view", TopicsViewAllController);
route.post("/edit", TopicsUpdateController);

module.exports = route;
