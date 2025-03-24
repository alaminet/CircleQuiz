const MCQ = require("../../model/MCQModel");

const MCQViewIDsWiseController = async (req, res) => {
  const { id } = req.params;

  try {
    const dataExist = await MCQ.findById(id);
    if (!dataExist) {
      res.status(404).send({ message: "Invalid Data Query" });
    } else {
      await MCQ.updateOne({ _id: id }, { $inc: { views: 1 } });
      const view = await MCQ.findById(id)
        .populate("topic")
        .populate("category")
        .populate("subcategory")
        .populate("tag")
        .populate("des.posted")
        .populate("created");
      res.status(200).send({ view, message: "Data Query Done!" });
    }
  } catch (error) {
    res.status(404).send({ error });
  }
};

module.exports = MCQViewIDsWiseController;
