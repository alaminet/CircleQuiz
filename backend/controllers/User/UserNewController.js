const User = require("../../model/userModel");

const UserNewController = async (req, res) => {
  try {
    const { data, deviceID, userAgent } = req.body;
    const loginAt = Date.now();

    const dataExist = await User.findOne({ email: data?.user?.email });
    const deviceExist = await User.findOne({
      email: data?.user?.email,
      "device.deviceID": deviceID,
    });

    if (!data) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (dataExist?.device.length > 2) {
      return res.status(404).send({ message: "Maximum 2 Device Allowed" });
    } else if (!dataExist) {
      const userExist = await new User({
        name: data?.user?.name,
        email: data?.user?.email,
        userImg: data?.user?.image,
        device: [
          {
            deviceID: deviceID,
            userAgent: userAgent,
            loginAt: loginAt,
          },
        ],
      }).save();
      await res.status(200).send({ userExist, message: "New User" });
    } else if (deviceExist) {
      const userExist = await User.findOneAndUpdate(
        { email: data?.user?.email },
        {
          $set: {
            userImg: data?.user?.image,
          },
        },
        { new: true }
      );
      await res.status(200).send({ userExist, message: "Existing User" });
    } else {
      const userExist = await User.findOneAndUpdate(
        { email: data?.user?.email },
        {
          $set: {
            userImg: data?.user?.image,
          },
          $push: {
            device: [
              {
                deviceID: deviceID,
                userAgent: userAgent,
                loginAt: loginAt,
              },
            ],
          },
        },
        { new: true }
      );
      await res.status(200).send({ userExist, message: "Existing User" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = UserNewController;
