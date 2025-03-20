const User = require("../../model/userModel");

const UserInfoUpdateController = async (req, res) => {
  const { field, value, userID } = req.body;
  const update = {};
  update[field] = value;
  try {
    if (!field || !value || !userID) {
      return res.status(404).send({ message: "Data Not Found" });
    } else {
      await User.findByIdAndUpdate(
        userID,
        {
          $set: update,
        },
        { new: true }
      );
      await res.status(200).send({ message: "User Updated" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = UserInfoUpdateController;
