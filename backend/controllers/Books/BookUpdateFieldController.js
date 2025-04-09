const Books = require("../../model/bookModel");

const BookUpdateFieldController = async (req, res) => {
  const { field, value, postID } = req.body;
  const update = {};
  update[field] = value;
  try {
    if (field == "delete") {
      await Books.findByIdAndDelete(postID);
      await res.status(200).send({ message: "MCQ Deleted" });
    } else {
      await Books.findByIdAndUpdate(
        postID,
        {
          $set: update,
        },
        { new: true }
      );
      await res.status(200).send({ message: `${field} Updated` });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = BookUpdateFieldController;
