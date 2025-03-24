const User = require("../../model/userModel");

const UserExistController = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      const userExist = await User.findOne({ _id: userID });
      await res.status(200).send({ userExist, message: "User Details" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = UserExistController;
