const MCQ = require("../model/MCQModel");

const MCQViewAllController = async (req, res) => {
  try {
    const view = await MCQ.find().populate("topic");
    res.status(200).send({ view });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = MCQViewAllController;
