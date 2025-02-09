const express = require("express");
const route = express.Router();
const auth = require("./auth");
const topic = require("./topic");
const MCQ = require("./MCQ");

route.use("/auth", auth);
route.use("/topic", topic);
route.use("/mcq", MCQ);

module.exports = route;
