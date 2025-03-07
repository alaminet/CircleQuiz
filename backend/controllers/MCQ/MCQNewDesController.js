const MCQ = require("../../model/MCQModel");

const MCQNewDesController = async (req, res) => {
  const { postID, posted, post } = req.body;
  const createdAt = Date.now();
  try {
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
  } catch (error) {
    await res.status(401).send(error);
  }
};

module.exports = MCQNewDesController;
