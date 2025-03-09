const MCQ = require("../../model/MCQModel");

const MCQNewController = async (req, res) => {
  try {
    const { data } = req.body;
    const createdAt = Date.now();
    const dataExist = await MCQ.findOne({ question: data.question });
    if (
      !data.question ||
      !data.optA ||
      !data.optB ||
      !data.optC ||
      !data.optD ||
      !data.answer ||
      !data.subcategory ||
      !data.createdBy
    ) {
      return res.status(404).send({ message: "Invalid Data Inserted" });
    } else if (!dataExist) {
      const addnew = await new MCQ({
        created: data.createdBy,
        question: data.question,
        options: [data.optA, data.optB, data.optC, data.optD],
        ans: data.answer,
        topic: data.subject,
        category: data.category,
        subcategory: data.subcategory,
        tag: data.tag || null,
        des:
          [
            {
              post: data.details,
              posted: data.createdBy,
              createdAt: createdAt,
            },
          ] || null,
      }).save();
      await res.status(200).send({ addnew, message: "New Q&A Added" });
    } else {
      res.status(400).send({ message: "Questions Already Added" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = MCQNewController;
