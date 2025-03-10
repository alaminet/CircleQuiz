const express = require("express");
const MCQNewController = require("../../controllers/MCQ/MCQNewController");
const MCQViewAllController = require("../../controllers/MCQ/MCQViewAllController");
const MCQViewTopicsWiseController = require("../../controllers/MCQ/MCQViewTopicsWiseController");
const MCQUpdateController = require("../../controllers/MCQ/MCQUpdateController");
const MCQLikeController = require("../../controllers/MCQ/MCQLikeController");
const MCQDesLikeController = require("../../controllers/MCQ/MCQDesLikeController");
const MCQViewIDsWiseController = require("../../controllers/MCQ/MCQViewIDWiseController");
const MCQUpdateSingleController = require("../../controllers/MCQ/MCQUpdateSingleController");
const MCQDesPostUpdateController = require("../../controllers/MCQ/MCQDesPostUpdateController");
const MCQNewDesController = require("../../controllers/MCQ/MCQNewDesController");
const MCQViewDesStatusController = require("../../controllers/MCQ/MCQViewDesStatusController");
const MCQDesPostDeleteController = require("../../controllers/MCQ/MCQDesPostDeleteController");
const MCQUpdateFieldController = require("../../controllers/MCQ/MCQUpdateFieldController");

const route = express.Router();

route.post("/add", MCQNewController);
route.get("/viewall", MCQViewAllController);
route.get("/view/:topic", MCQViewTopicsWiseController);
route.get("/viewid/:id", MCQViewIDsWiseController);
route.post("/edit", MCQUpdateController);
route.post("/editid", MCQUpdateSingleController);
route.post("/editfield", MCQUpdateFieldController);
route.post("/mcqlike", MCQLikeController);
route.post("/desclike", MCQDesLikeController);
route.post("/desupdate", MCQDesPostUpdateController);
route.post("/viewdesstatus", MCQViewDesStatusController);
route.post("/postdlt", MCQDesPostDeleteController);
route.post("/adddes", MCQNewDesController);

module.exports = route;
