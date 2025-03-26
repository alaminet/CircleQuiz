const MCQ = require("../../model/MCQModel");

const MCQSearchController = async (req, res) => {
  try {
    const { value, status } = req.body;
    // View Count
    // await MCQ.updateMany(query, { $inc: { views: 1 } });
    const regexPattern = value
      .split(" ")
      .map((word) => `(${word})`)
      .join("|"); // Create regex for all query words

    // update view count
    await MCQ.updateMany(
      {
        question: { $regex: regexPattern, $options: "i" },
        status: status,
      },
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    // Collect Parial Match
    const exactMatch = await MCQ.find({
      question: { $regex: value, $options: "i" },
      status: status,
    })
      .populate("topic")
      .populate("category")
      .populate("subcategory")
      .populate("tag")
      .populate("des.posted")
      .populate("created");

    // Collect Parial Match
    const mcqview = await MCQ.find({
      question: { $regex: regexPattern, $options: "i" },
      status: status,
    })
      .populate("topic")
      .populate("category")
      .populate("subcategory")
      .populate("tag")
      .populate("des.posted")
      .populate("created");

    // Merge arrays and remove duplicates by 'id'
    const uniqueArray = [...exactMatch, ...mcqview].filter(
      (obj, index, self) => index === self.findIndex((o) => o._id === obj._id)
    );

    return await res.status(200).send({ uniqueArray, message: "MCQ View" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = MCQSearchController;
