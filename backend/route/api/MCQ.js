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
const MCQViewFieldWiseController = require("../../controllers/MCQ/MCQViewFieldWiseController");
const MCQSearchController = require("../../controllers/MCQ/MCQSearchController");
const secureAPI = require("../../middleware/secureAPI");

const route = express.Router();

route.post("/add", secureAPI, MCQNewController);
route.get("/viewall", secureAPI, MCQViewAllController);
route.get("/view/:topic", secureAPI, MCQViewTopicsWiseController);
route.post("/viewfield", secureAPI, MCQViewFieldWiseController);
route.post("/search", secureAPI, MCQSearchController);
route.get("/viewid/:id", secureAPI, MCQViewIDsWiseController);
route.post("/edit", secureAPI, MCQUpdateController);
route.post("/editid", secureAPI, MCQUpdateSingleController);
route.post("/editfield", secureAPI, MCQUpdateFieldController);
route.post("/mcqlike", secureAPI, MCQLikeController);
route.post("/desclike", secureAPI, MCQDesLikeController);
route.post("/desupdate", secureAPI, MCQDesPostUpdateController);
route.post("/viewdesstatus", secureAPI, MCQViewDesStatusController);
route.post("/postdlt", secureAPI, MCQDesPostDeleteController);
route.post("/adddes", secureAPI, MCQNewDesController);

module.exports = route;
