const User = require("../../model/userModel");

const UserNewController = async (req, res) => {
  try {
    const { data, userAgent } = req.body;
    const loginAt = Date.now();
    const dataExist = await User.findOne({ email: data?.user?.email });

    if (!data) {
      return res.status(404).send({ message: "Data Not Found" });
    }
    if (dataExist?.device.length > 3) {
      return res.status(404).send({ message: "Maximum 3 Device Allowed" });
    }
    if (!dataExist) {
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
    } else {
      const deviceExist = await User.findOne({
        email: data?.user?.email,
        "device.userAgent": userAgent,
      });
      if (deviceExist) {
        const userExist = await User.findOneAndUpdate(
          { email: data?.user?.email },
          {
            $set: {
              userImg: data?.user?.image,
            },
          }
        );
        return await res
          .status(200)
          .send({ userExist, message: "Existing User" });
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
                  userAgent: userAgent,
                  loginAt: loginAt,
                },
              ],
            },
          }
        );
        return await res
          .status(200)
          .send({ userExist, message: "Existing User" });
      }
    }
  } catch (error) {
    return await res.status(404).send({ error });
  }
};

module.exports = UserNewController;
