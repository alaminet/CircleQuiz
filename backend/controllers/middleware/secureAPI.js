const secureAPI = (req, res, next) => {
  if (req.headers.authorization === "CAt7p0qqwYALAIY") {
    next();
  } else {
    res.status(401);
    res.send({ error: "Invalid API" });
  }
};

module.exports = secureAPI;
