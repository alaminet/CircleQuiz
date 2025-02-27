const MCQ = require("../model/MCQModel");

const MCQViewAllController = async (req, res) => {
  try {
    const view = await MCQ.find()
      .populate("topic")
      .populate("category")
      .populate("tag")
      .populate("des.posted")
      .populate("created");
    await res.status(200).send({ view });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = MCQViewAllController;
