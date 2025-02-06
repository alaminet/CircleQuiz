const Topics = require("../model/topicsModel");

const TopicsNewController = async (req, res) => {
  try {
    const { name, iconUrl } = req.body;
    if (!name || !iconUrl) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      const addnew = await new Topics({
        name: name,
        iconUrl: iconUrl,
      }).save();
      res.status(200).send({ addnew, message: "New Topics Added" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = TopicsNewController;
