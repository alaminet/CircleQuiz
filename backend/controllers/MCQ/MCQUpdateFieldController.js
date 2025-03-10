const MCQ = require("../../model/MCQModel");

const MCQUpdateFieldController = async (req, res) => {
  const { field, value, postID } = req.body;
  const update = {};
  update[field] = value;
  try {
    if (field == "delete") {
      await MCQ.findByIdAndDelete(postID);
      await res.status(200).send({ message: "MCQ Deleted" });
    } else {
      await MCQ.findByIdAndUpdate(
        postID,
        {
          $set: update,
        },
        { new: true }
      );
      await res.status(200).send({ message: "MCQ Updated" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = MCQUpdateFieldController;
