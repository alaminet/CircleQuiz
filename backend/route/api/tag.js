const express = require("express");
const TagNewController = require("../../controllers/TagNewController");
const TagViewAllController = require("../../controllers/TagViewAllController");
const TagUpdateController = require("../../controllers/TagUpdateController");
const route = express.Router();

route.post("/add", TagNewController);
route.get("/view", TagViewAllController);
route.post("/edit", TagUpdateController);

module.exports = route;
