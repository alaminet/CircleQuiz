const Category = require("../model/categoryModel");

const CategoryNewController = async (req, res) => {
  try {
    const { name, iconUrl } = req.body;
    const dataExist = await Category.findOne({ name: name });

    if (!name || !iconUrl) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (!dataExist) {
      const addnew = await new Category({
        name: name,
        iconUrl: iconUrl,
      }).save();
      res.status(200).send({ addnew, message: "New Category Added" });
    } else {
      res.status(400).send({ addnew, message: "Duplicate Data" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = CategoryNewController;
