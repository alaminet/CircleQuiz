const Tag = require("../model/tagModel");

const TagViewAllController = async (req, res) => {
  try {
    const view = await Tag.find();
    res.status(200).send({ view, message: "Tag Lists" });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = TagViewAllController;
