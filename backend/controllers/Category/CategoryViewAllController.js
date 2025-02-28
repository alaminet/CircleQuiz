const Category = require("../../model/categoryModel");

const CategoryViewAllController = async (req, res) => {
  try {
    const view = await Category.find();
    res.status(200).send({ view, message: "Category Lists" });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = CategoryViewAllController;
