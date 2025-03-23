const User = require("../../model/userModel");
const { v4: uuidv4 } = require("uuid");

const UserLoggedOutController = async (req, res) => {
  try {
    const { deviceID, userID } = req.body;
    if (!deviceID || !userID) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      const updateUser = await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { device: { deviceID: deviceID } } },
        { new: true }
      );
      await res
        .status(200)
        .send({ updateUser, message: "Logged Out Successfully" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = UserLoggedOutController;
