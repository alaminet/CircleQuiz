const MCQ = require("../../model/MCQModel");

const MCQUpdateSingleController = async (req, res) => {
  const {
    id,
    question,
    optA,
    optB,
    optC,
    optD,
    answer,
    subject,
    category,
    tag,
  } = req.body;
  
  try {
    await MCQ.findByIdAndUpdate(
      id,
      {
        $set: {
          question: question,
          options: [optA, optB, optC, optD],
          ans: answer,
          topic: subject,
          status: "waiting",
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

module.exports = MCQUpdateSingleController;
