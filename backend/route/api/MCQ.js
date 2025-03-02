const express = require("express");
const MCQNewController = require("../../controllers/MCQ/MCQNewController");
const MCQViewAllController = require("../../controllers/MCQ/MCQViewAllController");
const MCQViewTopicsWiseController = require("../../controllers/MCQ/MCQViewTopicsWiseController");
const MCQUpdateController = require("../../controllers/MCQ/MCQUpdateController");
const MCQLikeController = require("../../controllers/MCQ/MCQLikeController");
const MCQDesLikeController = require("../../controllers/MCQ/MCQDesLikeController");

const route = express.Router();

route.post("/add", MCQNewController);
route.get("/viewall", MCQViewAllController);
route.get("/view/:topic", MCQViewTopicsWiseController);
route.post("/edit", MCQUpdateController);
route.post("/mcqlike", MCQLikeController);
route.post("/desclike", MCQDesLikeController);

module.exports = route;
