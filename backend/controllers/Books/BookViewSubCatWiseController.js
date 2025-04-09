const Books = require("../../model/bookModel");
const BookViewSubCatWiseController = async (req, res) => {
  try {
    const { subcatid } = req.params;

    const dataExist = await Books.findOne({ "subCategory._id": subcatid });
    if (dataExist) {
      const view = await Books.find({ "subCategory._id": subcatid }).populate(
        "subCategory"
      );
      console.log(dataExist);

      return res.status(200).send({ view, message: "Sub-Catagory Wise View!" });
    } else {
      return res.status(404).send({ message: "Invalid Data Query" });
    }
  } catch (error) {
    return res.status(404).send({ error });
  }
};

module.exports = BookViewSubCatWiseController;
