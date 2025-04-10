const Books = require("../../model/bookModel");

const BookLessonAddController = async (req, res) => {
  try {
    // name iconUrl slug subCategory lesson[name slug] status
    const { postID, newLesson } = req.body;

    if (!postID || !newLesson) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      await Books.findOneAndUpdate(
        { _id: postID },
        {
          $push: { lesson: newLesson },
        },
        {
          new: true,
        }
      );
      res.status(200).send({ message: "New Lesson Added" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = BookLessonAddController;
