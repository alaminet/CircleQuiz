const MCQ = require("../model/MCQModel");

const MCQNewController = async (req, res) => {
  try {
    const { question, options, ans, topic, status } = req.body;
    const dataExist = await MCQ.findOne({ question: question });

    if (!question || !options  || !topic) {
      return res.status(404).send({ message: "Invalid Data Inserted" });
    } else if (!dataExist) {
      const addnew = await new MCQ({
        question: question,
        options: options,
        ans: ans,
        topic: topic,
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
