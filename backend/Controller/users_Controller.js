const Users = require("../Model/user_Model");

const getUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await Users.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
};

const updateChangePassword = (req, res) => {
  const { id, password } = req.user;
  const changeErrorPassword = { error: false, Message: "" };

  try {
    Users.findById(id).then((user) => {
      user.user_image = user.user_image;
      user.fullname = user.fullname;
      user.email = user.email;
      user.username = user.username;
      user.user_type = user.user_type;
      user.password = password;

      user.save();
    });
    changeErrorPassword.Message = "Update Success";
    res.json(changeErrorPassword);
  } catch (error) {
    res.json(error.message);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.user;
  const option = { new: true };

  try {
    const updateUser = await Users.findByIdAndUpdate(id, updates, option);
    res.json({
      Message: "Update Success",
      update: updateUser,
    });
  } catch (error) {
    res.json(error);
  }
};

const updateUserProfileImage = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const options = { new: true };

  try {
    const updateUserProfile = await Users.findByIdAndUpdate(
      id,
      update,
      options
    );
    res.json({ updates: updateUserProfile });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getUser,
  updateChangePassword,
  editUser,
  updateUserProfileImage,
};
