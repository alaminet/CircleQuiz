require("dotenv").config();
const secureAPI = (req, res, next) => {
  if (req.headers.authorization === process.env.API_SECRATE) {
    next();
  } else {
    res.status(401);
    res.send({ error: "Invalid API" });
  }
};

module.exports = secureAPI;
