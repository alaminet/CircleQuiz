const Tag = require("../../model/tagModel");

const TagUpdateController = async (req, res) => {
  const { id, tag, slug, status } = req.body;

  try {
    await Tag.findByIdAndUpdate(
      id,
      { $set: { name: tag, slug: slug, status: status } },
      { new: true }
    );
    res.status(200).send({ message: "Tag Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = TagUpdateController;
