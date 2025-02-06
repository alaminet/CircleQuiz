const express = require("express");
const route = express.Router();
const auth = require("./auth");
const topic = require("./topic");

route.use("/auth", auth);
route.use("/topic", topic);

module.exports = route;
