const MCQ = require("../../model/MCQModel");
const Topics = require("../../model/topicsModel");

const MCQViewTopicsWiseController = async (req, res) => {
  const { topic } = req.params;
  const findTopic = await Topics.findOne({ slug: topic });

  try {
    if (findTopic) {
      await MCQ.updateMany(
        { topic: findTopic, status: "approved" },
        { $inc: { views: 1 } }
      );
      const view = await MCQ.find({ topic: findTopic._id, status: "approved" })
        .populate("topic")
        .populate("category")
        .populate("subcategory")
        .populate("tag")
        .populate("des.posted")
        .populate("created");
      return res.status(200).send({ view, message: "Data Query Done!" });
    } else {
      return res.status(404).send({ message: "Invalid Data Query" });
    }
  } catch (error) {
    return res.status(404).send({ error });
  }
};

module.exports = MCQViewTopicsWiseController;
