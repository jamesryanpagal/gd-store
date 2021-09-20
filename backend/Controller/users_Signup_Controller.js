const Users = require("../Model/user_Model");

const users_Signup = async (req, res) => {
  const { user_image, fullname, email, username, user_type, password } =
    req.user;

  try {
    const createUser = await Users.create({
      user_image,
      fullname,
      email,
      username,
      user_type,
      password,
    });

    const createUserToken = await createUser.token();
    return res.json(createUserToken);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { users_Signup };
