const Topics = require("../../model/topicsModel");

const TopicsViewAllController = async (req, res) => {
  try {
    const view = await Topics.find();
    res.status(200).send({ view, message: "Topics Lists" });
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = TopicsViewAllController;
