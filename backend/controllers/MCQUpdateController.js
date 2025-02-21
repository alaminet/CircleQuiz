const MCQ = require("../model/MCQModel");

const MCQUpdateController = async (req, res) => {
  const { id, question, options, ans, des, topic, status, category, tag } =
    req.body;

  try {
    await MCQ.findByIdAndUpdate(
      id,
      {
        $set: {
          question: question,
          options: options,
          ans: ans,
          des: des,
          topic: topic,
          status: status,
          category: category,
          tag: tag,
        },
      },
      { new: true }
    );
    res.status(200).send({ message: "MCQ Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = MCQUpdateController;
