const express = require("express");
const CategoryNewController = require("../../controllers/CategoryNewController");
const CategoryViewAllController = require("../../controllers/CategoryViewAllController");
const CategoryUpdateController = require("../../controllers/CategoryUpdateController");

const route = express.Router();

route.post("/add", CategoryNewController);
route.get("/view", CategoryViewAllController);
route.post("/edit", CategoryUpdateController);

module.exports = route;
