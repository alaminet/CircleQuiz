const MCQ = require("../../model/MCQModel");

const MCQViewStatusWiseController = async (req, res) => {
  const { type, status } = req.body;
  try {
    if (type === "MCQ") {
      const viewMCQ = await MCQ.find({ status: status })
        .populate("topic")
        .populate("category")
        .populate("subcategory")
        .populate("tag")
        .populate("des.posted")
        .populate("created");
      return await res
        .status(200)
        .send({ viewMCQ, message: "Data Query Done!" });
    } else {
      return res.status(404).send({ message: "Invalid Data Query" });
    }
  } catch (error) {
    return await res.status(404).send({ error });
  }
};

module.exports = MCQViewStatusWiseController;
