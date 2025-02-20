const express = require("express");
const route = express.Router();
const auth = require("./auth");
const topic = require("./topic");
const MCQ = require("./MCQ");
const Category = require("./category");
const Tag = require("./tag");

route.use("/auth", auth);
route.use("/topic", topic);
route.use("/mcq", MCQ);
route.use("/category", Category);
route.use("/tag", Tag);

module.exports = route;
