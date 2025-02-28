const express = require("express");
const CategoryNewController = require("../../controllers/Category/CategoryNewController");
const CategoryViewAllController = require("../../controllers/Category/CategoryViewAllController");
const CategoryUpdateController = require("../../controllers/Category/CategoryUpdateController");

const route = express.Router();

route.post("/add", CategoryNewController);
route.get("/view", CategoryViewAllController);
route.post("/edit", CategoryUpdateController);

module.exports = route;
