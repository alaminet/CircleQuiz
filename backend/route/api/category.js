const express = require("express");
const CategoryNewController = require("../../controllers/Category/CategoryNewController");
const CategoryViewAllController = require("../../controllers/Category/CategoryViewAllController");
const CategoryUpdateController = require("../../controllers/Category/CategoryUpdateController");
const secureAPI = require("../../controllers/middleware/secureAPI");

const route = express.Router();

// Main Category
route.post("/add", secureAPI, CategoryNewController);
route.get("/view", secureAPI, CategoryViewAllController);
route.post("/edit", secureAPI, CategoryUpdateController);

module.exports = route;
