const Books = require("../../model/bookModel");

const BookViewAllController = async (req, res) => {
  try {
    const view = await Books.find().populate("subCategory");
    await res.status(200).send({ view });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = BookViewAllController;
