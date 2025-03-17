const MCQ = require("../../model/MCQModel");
const category = require("../../model/categoryModel");
const subcategory = require("../../model/subCategoryModel");
const tag = require("../../model/tagModel");
const topics = require("../../model/topicsModel");

const MCQViewFieldWiseController = async (req, res) => {
  try {
    const { field, value, status } = req.body;
    // Map the field to the respective model
    const models = {
      subcategory,
      category,
      tag,
      topics,
    };
    const Model = models[field];
    if (!Model) {
      return res.status(400).send({ error: "Invalid field provided" });
    }

    // Matched field data query
    const dataexsit = await Model.findOne({ slug: value });
    if (!dataexsit) {
      return res.status(400).send({ error: "Invalid Data Query" });
    } else {
      const update = {};
      update[field] = dataexsit._id;
      // View Count
      await MCQ.updateMany(update, { $inc: { views: 1 } });
      // Add "approved" status dynamically
      update.status = status;

      const view = await MCQ.find(update)
        .populate("topic")
        .populate("category")
        .populate("subcategory")
        .populate("tag")
        .populate("des.posted")
        .populate("created");
      await res.status(200).send({ view, message: "MCQ Updated" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = MCQViewFieldWiseController;
