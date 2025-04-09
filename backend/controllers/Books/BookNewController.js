const Books = require("../../model/bookModel");

const BookNewController = async (req, res) => {
  try {
    // name iconUrl slug subCategory lesson[name slug] status
    const { name, iconUrl, slug, subCategory } = req.body;
    const dataExist = await Books.findOne({
      slug: slug,
      subCategory: subCategory,
    });
    if (!name || !iconUrl || !slug || !subCategory) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (!dataExist) {
      const addnew = await new Books({
        name: name,
        slug: slug,
        iconUrl: iconUrl,
        subCategory: subCategory,
      }).save();
      res.status(200).send({ addnew, message: "New Books Added" });
    } else {
      res.status(400).send({ message: "Duplicate Data" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = BookNewController;
