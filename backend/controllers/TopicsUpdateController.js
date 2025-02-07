const Topics = require("../model/topicsModel");

const TopicsUpdateController = async (req, res) => {
  const { id, topics, iconUrl } = req.body;

  try {
    await Topics.findByIdAndUpdate(
      id,
      { $set: { name: topics, iconUrl: iconUrl } },
      { new: true }
    );
    res.status(200).send({ message: "Topics Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = TopicsUpdateController;
