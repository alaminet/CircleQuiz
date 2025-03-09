const SubCategory = require("../../model/subCategoryModel");

const SubCategoryNewController = async (req, res) => {
  try {
    const { name, slug, iconUrl, category } = req.body;
    const dataExist = await SubCategory.findOne({ slug: slug });

    if (!name || !iconUrl || !slug || !category) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (!dataExist) {
      const addnew = await new SubCategory({
        name: name,
        slug: slug,
        iconUrl: iconUrl,
        category: category,
      }).save();
      res.status(200).send({ addnew, message: "New SubCategory Added" });
    } else {
      res.status(400).send({ addnew, message: "Duplicate Data" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = SubCategoryNewController;
