const MCQ = require("../../model/MCQModel");

const MCQViewDesStatusController = async (req, res) => {
  const { type, status } = req.body;

  try {
    if (type === "MCQ") {
      const viewMCQ = await MCQ.find({ "des.status": status });
      const viewArr = viewMCQ.map((item) =>
        item?.des.map(
          (desc) =>
            desc.status == status && { qn: item.question, details: desc }
        )
      );
      //   console.log(viewArr);

      return res.status(200).send({ viewArr, message: "Data Query Done!" });
    } else {
      return res.status(404).send({ message: "Invalid Data Query" });
    }
  } catch (error) {
    return res.status(404).send({ error });
  }
};

module.exports = MCQViewDesStatusController;
