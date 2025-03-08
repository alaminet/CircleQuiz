const MCQ = require("../../model/MCQModel");

const MCQDesPostUpdateController = async (req, res) => {
  const { postID, post, status } = req.body;
  try {
    const likeExist = await MCQ.findOne({
      "des._id": postID,
    });
    if (likeExist) {
      if (post && !status) {
        await MCQ.findOneAndUpdate(
          { "des._id": postID },
          { $set: { "des.$.post": post } },
          { new: true }
        );
        return await res.status(200).send({ message: "MCQ Details Updated" });
      } else if (!post && status) {
        await MCQ.findOneAndUpdate(
          { "des._id": postID },
          { $set: { "des.$.status": status } },
          { new: true }
        );
        return await res.status(200).send({ message: "MCQ Status Updated" });
      } else if (post && status) {
        await MCQ.findOneAndUpdate(
          { "des._id": postID },
          { $set: { "des.$.post": post, "des.$.status": status } },
          { new: true }
        );
        return await res
          .status(200)
          .send({ message: "MCQ Details & Status Updated" });
      }
    }
    // likeExist &&
    //   (await MCQ.findOneAndUpdate(
    //     { "des._id": postID },
    //     { $set: { "des.$.post": post } },
    //     { new: true }
    //   ));
    // await res.status(200).send({ message: "MCQ Details Updated" });
  } catch (error) {
    await res.status(401).send(error);
  }
};

module.exports = MCQDesPostUpdateController;
