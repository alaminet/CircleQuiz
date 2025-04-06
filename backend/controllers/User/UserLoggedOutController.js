const User = require("../../model/userModel");

const UserLoggedOutController = async (req, res) => {
  try {
    const { userAgent, userID } = req.body;
    if (!userAgent || !userID) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      const deviceCount = await User.findOne({ _id: userID });
      if (deviceCount.device.length == 1) {
        const updateUser = await User.findOneAndUpdate(
          { _id: userID },
          { $unset: { device: "" } },
          { new: true }
        );
        return await res
          .status(200)
          .send({ updateUser, message: "Logged Out Successfully" });
      } else {
        const updateUser = await User.findOneAndUpdate(
          { _id: userID },
          { $pull: { device: { userAgent: userAgent } } },
          { new: true }
        );
        return await res
          .status(200)
          .send({ updateUser, message: "Logged Out Successfully" });
      }
    }
  } catch (error) {
    console.log(error);

    await res.status(404).send({ error });
  }
};

module.exports = UserLoggedOutController;
