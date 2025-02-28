const express = require("express");
const TopicsNewController = require("../../controllers/Topics/TopicsNewController");
const TopicsViewAllController = require("../../controllers/Topics/TopicsViewAllController");
const TopicsUpdateController = require("../../controllers/Topics/TopicsUpdateController");

const route = express.Router();

route.post("/add", TopicsNewController);
route.get("/view", TopicsViewAllController);
route.post("/edit", TopicsUpdateController);

module.exports = route;
