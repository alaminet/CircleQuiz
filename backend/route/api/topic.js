const express = require("express");
const TopicsNewController = require("../../controllers/Topics/TopicsNewController");
const TopicsViewAllController = require("../../controllers/Topics/TopicsViewAllController");
const TopicsUpdateController = require("../../controllers/Topics/TopicsUpdateController");
const secureAPI = require("../../controllers/middleware/secureAPI");

const route = express.Router();

route.post("/add", secureAPI, TopicsNewController);
route.get("/view", secureAPI, TopicsViewAllController);
route.post("/edit", secureAPI, TopicsUpdateController);

module.exports = route;
