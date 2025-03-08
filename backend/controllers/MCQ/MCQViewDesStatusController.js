const MCQ = require("../../model/MCQModel");

const MCQViewDesStatusController = async (req, res) => {
  const { type, status } = req.body;

  try {
    if (type === "MCQ") {
      const viewMCQ = await MCQ.find({ "des.status": status });
      const viewArr = [];
      const viewflt = viewMCQ.map((item) => {
        item?.des.map((desc) => {
          if (desc.status == status) {
            viewArr.push({ qn: item.question, details: desc });
          }
        });
      });
      return await res
        .status(200)
        .send({ viewArr, message: "Data Query Done!" });
    } else {
      return res.status(404).send({ message: "Invalid Data Query" });
    }
  } catch (error) {
    return await res.status(404).send({ error });
  }
};

module.exports = MCQViewDesStatusController;
