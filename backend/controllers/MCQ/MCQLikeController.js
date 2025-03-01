const MCQ = require("../../model/MCQModel");

const MCQLikeController = async (req, res) => {
  const { postID, likedID } = req.body;

  try {
    const likeExist = await MCQ.findOne({ _id: postID, like: likedID });
    !likeExist &&
      (await MCQ.findOneAndUpdate(
        { _id: postID },
        { $push: { like: likedID } },
        { new: true }
      ));
    await res.status(200).send({ message: "MCQ Liked" });
  } catch (error) {
    await res.status(401).send(error);
    console.log(error);
  }
};

module.exports = MCQLikeController;
