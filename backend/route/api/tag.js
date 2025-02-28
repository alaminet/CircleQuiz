const express = require("express");
const TagNewController = require("../../controllers/Tag/TagNewController");
const TagViewAllController = require("../../controllers/Tag/TagViewAllController");
const TagUpdateController = require("../../controllers/Tag/TagUpdateController");

const route = express.Router();

route.post("/add", TagNewController);
route.get("/view", TagViewAllController);
route.post("/edit", TagUpdateController);

module.exports = route;
