const SubCategory = require("../../model/subCategoryModel");

const SubCategoryViewAllController = async (req, res) => {
  try {
    const view = await SubCategory.find().populate("category");
    res.status(200).send({ view, message: "Sub-Category Lists" });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = SubCategoryViewAllController;
