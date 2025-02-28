const User = require("../../model/userModel");

const UserNewController = async (req, res) => {
  try {
    const { data } = req.body;

    const dataExist = await User.findOne({ email: data?.user?.email });

    if (!data) {
      return res.status(404).send({ message: "Data Not Found" });
    } else if (!dataExist) {
      const addnew = await new User({
        name: data?.user?.name,
        email: data?.user?.email,
      }).save();
      await res.status(200).send({ addnew, message: "New User" });
    } else {
      await res.status(200).send({ dataExist, message: "Existing User" });
    }
  } catch (error) {
    await res.status(404).send({ error });
  }
};

module.exports = UserNewController;
