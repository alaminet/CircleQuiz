const Category = require("../model/categoryModel");

const CategoryUpdateController = async (req, res) => {
  const { id, category, iconUrl, status } = req.body;

  try {
    await Category.findByIdAndUpdate(
      id,
      { $set: { name: category, iconUrl: iconUrl, status: status } },
      { new: true }
    );
    res.status(200).send({ message: "Category Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = CategoryUpdateController;
