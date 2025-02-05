const express = require("express");
const route = express.Router();

route.post("/adduser", function (req, res) {
  res.send("Home folder");
});

module.exports = route;
