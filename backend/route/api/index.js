const express = require("express");
const route = express.Router();
const auth = require("./auth");
const topic = require("./topic");
const MCQ = require("./MCQ");
const Category = require("./category");
const SubCategory = require("./subcategory");
const Tag = require("./tag");
const Book = require("./book");

route.use("/auth", auth);
route.use("/topic", topic);
route.use("/mcq", MCQ);
route.use("/category", Category);
route.use("/subcategory", SubCategory);
route.use("/book", Book);
route.use("/tag", Tag);

module.exports = route;
