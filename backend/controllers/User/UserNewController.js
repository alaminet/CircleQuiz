const User = require("../../model/userModel");

const UserNewController = async (req, res) => {
  try {
    const { data, userAgent } = req.body;
    const loginAt = Date.now();

    const dataExist = await User.findOne({ email: data?.user?.email });
    const deviceExist = await User.findOne({
      email: data?.user?.email,
      "device.userAgent": userAgent,
    });
    console.log(!dataExist, !deviceExist);

    if (!data) {
      return res.status(404).send({ message: "Data Not Found" });
    }
    if (dataExist?.device.length > 2) {
      return res.status(404).send({ message: "Maximum 2 Device Allowed" });
    }
    if (deviceExist && dataExist) {
      console.log("user yes & Device yes");
      const userExist = await User.findOneAndUpdate(
        { email: data?.user?.email },
        {
          $set: {
            userImg: data?.user?.image,
          },
        },
        { new: true }
      );
      return await res
        .status(200)
        .send({ userExist, message: "Existing User" });
    }
    if (!dataExist && !deviceExist) {
      console.log("user & Device NA");

      const userExist = await new User({
        name: data?.user?.name,
        email: data?.user?.email,
        userImg: data?.user?.image,
        device: [
          {
            userAgent: userAgent,
            loginAt: loginAt,
          },
        ],
      }).save();
      return await res.status(200).send({ userExist, message: "New User" });
    }
    if (!deviceExist && dataExist) {
      console.log("user yes & Device NA");
      const userExist = await User.findOneAndUpdate(
        { email: data?.user?.email },
        {
          $set: {
            userImg: data?.user?.image,
          },
          $push: {
            device: [
              {
                userAgent: userAgent,
                loginAt: loginAt,
              },
            ],
          },
        },
        { new: true }
      );
      return await res
        .status(200)
        .send({ userExist, message: "Existing User" });
    }
  } catch (error) {
    return await res.status(404).send({ error });
  }
};

module.exports = UserNewController;
