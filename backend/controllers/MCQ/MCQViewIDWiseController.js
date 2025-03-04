const MCQ = require("../../model/MCQModel");

const MCQViewIDsWiseController = async (req, res) => {
  const { id } = req.params;

  const dataExist = await MCQ.findById(id);

  try {
    if (dataExist) {
      await MCQ.updateOne({ _id: id }, { $inc: { views: 1 } });
      const view = await MCQ.findById(id)
        .populate("topic")
        .populate("category")
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

module.exports = MCQViewIDsWiseController;
