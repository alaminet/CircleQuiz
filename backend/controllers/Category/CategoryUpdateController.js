const Category = require("../../model/categoryModel");

const CategoryUpdateController = async (req, res) => {
  const { id, category, slug, iconUrl, status } = req.body;

  try {
    await Category.findByIdAndUpdate(
      id,
      {
        $set: { name: category, slug: slug, iconUrl: iconUrl, status: status },
      },
      { new: true }
    );
    res.status(200).send({ message: "Category Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = CategoryUpdateController;
