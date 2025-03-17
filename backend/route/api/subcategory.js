const express = require("express");

const SubCategoryNewController = require("../../controllers/SubCategory/SubCategoryNewController");
const SubCategoryViewAllController = require("../../controllers/SubCategory/SubCategoryViewAllController");
const SubCategoryUpdateController = require("../../controllers/SubCategory/SubCategoryUpdateController");
const SubCategoryViewCatWiseController = require("../../controllers/SubCategory/SubCategoryViewCatWiseController");
const secureAPI = require("../../controllers/middleware/secureAPI");

const route = express.Router();

// Main Category
route.post("/add", secureAPI, SubCategoryNewController);
route.get("/view", secureAPI, SubCategoryViewAllController);
route.get("/view/:category", secureAPI, SubCategoryViewCatWiseController);
route.post("/edit", secureAPI, SubCategoryUpdateController);

module.exports = route;
