const SubCategory = require("../../model/subCategoryModel");

const SubCategoryViewCatWiseController = async (req, res) => {
  const { category } = req.params;
  const dataExist = await SubCategory.find({ category: category });

  try {
    if (dataExist) {
      const view = await SubCategory.find({ category: category }).populate(
        "category"
      );
      return res
        .status(200)
        .send({ view, message: "Category Wise SubCategory!" });
    } else {
      return res.status(404).send({ message: "Invalid Data Query" });
    }
  } catch (error) {
    return res.status(404).send({ error });
  }
};

module.exports = SubCategoryViewCatWiseController;
