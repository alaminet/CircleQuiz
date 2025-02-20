const Tag = require("../model/tagModel");

const TagNewController = async (req, res) => {
  try {
    const { name } = req.body;
    const dataExist = await Tag.findOne({ name: name });

    if (!name) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (!dataExist) {
      const addnew = await new Tag({
        name: name,
      }).save();
      res.status(200).send({ addnew, message: "New Tag Added" });
    } else {
      res.status(400).send({ addnew, message: "Duplicate Data" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = TagNewController;
