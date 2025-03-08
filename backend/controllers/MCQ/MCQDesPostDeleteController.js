const MCQ = require("../../model/MCQModel");

const MCQDesPostDeleteController = async (req, res) => {
  const { postID } = req.body;
  console.log(postID);

  try {
    await MCQ.findOneAndUpdate(
      { "des._id": postID },
      { $pull: { des: { _id: postID } } },
      { new: true }
    );
    await res.status(200).send({ message: "MCQ Details Post Details" });
  } catch (error) {
    await res.status(401).send(error);
  }
};

module.exports = MCQDesPostDeleteController;
