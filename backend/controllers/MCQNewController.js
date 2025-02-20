const MCQ = require("../model/MCQModel");

const MCQNewController = async (req, res) => {
  try {
    const {
      question,
      optA,
      optB,
      optC,
      optD,
      answer,
      subject,
      category,
      tag,
      details,
    } = req.body;

    const dataExist = await MCQ.findOne({ question: req.body.question });

    if (
      !question ||
      !optA ||
      !optB ||
      !optC ||
      !optD ||
      !subject ||
      !category
    ) {
      return res.status(404).send({ message: "Invalid Data Inserted" });
    } else if (!dataExist) {
      const addnew = await new MCQ({
        question: question,
        options: [optA, optB, optC, optD],
        ans: answer,
        topic: subject,
        category: category,
        tag: tag || null,
        des: details || null,
      }).save();
      res.status(200).send({ addnew, message: "New Q&A Added" });
    } else {
      res.status(400).send({ message: "Questions Already Added" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = MCQNewController;
