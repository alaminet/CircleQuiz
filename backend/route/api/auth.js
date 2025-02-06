const express = require("express");
const route = express.Router();

route.get("/adduser", function (req, res) {
  res.send("add folder");
});

module.exports = route;
