const MCQ = require("../../model/MCQModel");

const MCQDesLikeController = async (req, res) => {
  const { postID, likedID } = req.body;

  try {
    const likeExist = await MCQ.findOne({
      "des._id": postID,
      "des.$.like": likedID,
    });
    !likeExist &&
      (await MCQ.findOneAndUpdate(
        { "des._id": postID },
        { $push: { "des.$.like": likedID } },
        { new: true }
      ));
    await res.status(200).send({ message: "MCQ Details Liked" });
  } catch (error) {
    await res.status(401).send(error);
    console.log(error);
  }
};

module.exports = MCQDesLikeController;
