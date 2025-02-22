const Topics = require("../model/topicsModel");

const TopicsNewController = async (req, res) => {
  try {
    const { name,slug, iconUrl } = req.body;
    const dataExist = await Topics.findOne({ slug: slug });

    if (!name || !iconUrl || !slug) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (!dataExist) {
      const addnew = await new Topics({
        name: name,
        slug: slug,
        iconUrl: iconUrl,
      }).save();
      res.status(200).send({ addnew, message: "New Topics Added" });
    } else {
      res.status(400).send({ addnew, message: "Duplicate Data" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = TopicsNewController;
