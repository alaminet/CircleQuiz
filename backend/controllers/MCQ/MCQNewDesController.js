const MCQ = require("../../model/MCQModel");

const MCQNewDesController = async (req, res) => {
  const { postID, posted, post } = req.body;
  const createdAt = Date.now();
  try {
    if (!postID || !posted || !post) {
      return res.status(404).send({ message: "Invalid Data Inserted" });
    } else {
      await MCQ.updateOne(
        { _id: postID },
        {
          $push: {
            des: [
              {
                post: post,
                posted: posted,
                createdAt: createdAt,
              },
            ],
          },
        },
        { new: true }
      );
      await res.status(200).send({ message: "New Des. Added" });
    }
  } catch (error) {
    await res.status(401).send(error);
  }
};

module.exports = MCQNewDesController;
