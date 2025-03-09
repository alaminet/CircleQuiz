const SubCategory = require("../../model/subCategoryModel");

const SubCategoryUpdateController = async (req, res) => {
  const { id, subcategory, category, slug, iconUrl, status } = req.body;

  try {
    await SubCategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name: subcategory,
          slug: slug,
          category: category,
          iconUrl: iconUrl,
          status: status,
        },
      },
      { new: true }
    );
    res.status(200).send({ message: "Sub Category Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = SubCategoryUpdateController;
