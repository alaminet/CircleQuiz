const MCQ = require("../../model/MCQModel");
const category = require("../../model/categoryModel");
const subcategory = require("../../model/subCategoryModel");
const tag = require("../../model/tagModel");
const topics = require("../../model/topicsModel");

const MCQSearchController = async (req, res) => {
  try {
    const { value, status } = req.body;
    // View Count
    // await MCQ.updateMany(query, { $inc: { views: 1 } });
    const regexPattern = value
      .split(" ")
      .map((word) => `(${word})`)
      .join("|"); // Create regex for all query words
    const mcqview = await MCQ.findOneAndUpdate(
      {
        question: { $regex: regexPattern, $options: "i" },
        status: status,
      },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("topic")
      .populate("category")
      .populate("subcategory")
      .populate("tag")
      .populate("des.posted")
      .populate("created");
    await res.status(200).send({ mcqview, message: "MCQ View" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = MCQSearchController;
