const express = require("express");
const MCQNewController = require("../../controllers/MCQNewController");
const MCQViewAllController = require("../../controllers/MCQViewAllController");
const MCQUpdateController = require("../../controllers/MCQUpdateController");
const MCQViewTopicsWiseController = require("../../controllers/MCQViewTopicsWiseController");
const route = express.Router();

route.post("/add", MCQNewController);
route.get("/viewall", MCQViewAllController);
route.get("/view/:topic", MCQViewTopicsWiseController);
route.post("/edit", MCQUpdateController);

module.exports = route;
