const express = require("express");
const TagNewController = require("../../controllers/Tag/TagNewController");
const TagViewAllController = require("../../controllers/Tag/TagViewAllController");
const TagUpdateController = require("../../controllers/Tag/TagUpdateController");
const secureAPI = require("../../middleware/secureAPI");


const route = express.Router();

route.post("/add", secureAPI, TagNewController);
route.get("/view", secureAPI, TagViewAllController);
route.post("/edit", secureAPI, TagUpdateController);

module.exports = route;
