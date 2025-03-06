const MCQ = require("../../model/MCQModel");

const MCQDesPostUpdateController = async (req, res) => {
  const { postID, post } = req.body;
  try {
    const likeExist = await MCQ.findOne({
      "des._id": postID,
    });
    likeExist &&
      (await MCQ.findOneAndUpdate(
        { "des._id": postID },
        { $set: { "des.$.post": post } },
        { new: true }
      ));
    await res.status(200).send({ message: "MCQ Details Updated" });
  } catch (error) {
    await res.status(401).send(error);
  }
};

module.exports = MCQDesPostUpdateController;
