const MCQ = require("../../model/MCQModel");

const MCQLikeController = async (req, res) => {
  const { postID, likedID } = req.body;
  console.log(postID, likedID);

  //   try {
  //     await MCQ.findByIdAndUpdate(
  //       id,
  //       {
  //         $set: {
  //           question: question,
  //           options: options,
  //           ans: ans,
  //           topic: topic,
  //           status: status,
  //           category: category,
  //           tag: tag,
  //         },
  //       },
  //       { new: true }
  //     );
  //     res.status(200).send({ message: "MCQ Updated" });
  //   } catch (error) {
  //     res.status(401).send(error);
  //   }
};

module.exports = MCQLikeController;
