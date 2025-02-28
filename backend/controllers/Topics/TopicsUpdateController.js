const Topics = require("../../model/topicsModel");

const TopicsUpdateController = async (req, res) => {
  const { id, topics, slug, iconUrl, status } = req.body;

  try {
    await Topics.findByIdAndUpdate(
      id,
      { $set: { name: topics, slug: slug, iconUrl: iconUrl, status: status } },
      { new: true }
    );
    res.status(200).send({ message: "Topics Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = TopicsUpdateController;
