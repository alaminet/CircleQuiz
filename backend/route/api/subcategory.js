const express = require("express");

const SubCategoryNewController = require("../../controllers/SubCategory/SubCategoryNewController");
const SubCategoryViewAllController = require("../../controllers/SubCategory/SubCategoryViewAllController");
const SubCategoryUpdateController = require("../../controllers/SubCategory/SubCategoryUpdateController");

const route = express.Router();

// Main Category
route.post("/add", SubCategoryNewController);
route.get("/view", SubCategoryViewAllController);
route.post("/edit", SubCategoryUpdateController);

module.exports = route;
