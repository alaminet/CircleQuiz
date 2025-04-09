const express = require("express");
const secureAPI = require("../../middleware/secureAPI");
const BookNewController = require("../../controllers/Books/BookNewController");
const BookViewSubCatWiseController = require("../../controllers/Books/BookViewSubCatWiseController");
const BookViewAllController = require("../../controllers/Books/BookViewAllController");
const BookUpdateFieldController = require("../../controllers/Books/BookUpdateFieldController");
const route = express.Router();

// Main Category
route.post("/add", secureAPI, BookNewController);
route.get("/view", secureAPI, BookViewAllController);
route.get("/view/:subcatid", secureAPI, BookViewSubCatWiseController);
route.post("/editfield", secureAPI, BookUpdateFieldController);

module.exports = route;
