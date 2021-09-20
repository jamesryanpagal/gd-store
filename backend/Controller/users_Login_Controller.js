const Users = require("../Model/user_Model");

const users_Login = async (req, res) => {
  const { email, password } = req.user;

  const resData = {
    error: false,
    message: "",
  };

  try {
    const userExist = await Users.findOne({
      $or: [{ email }, { username: email }],
    });
    if (!userExist) {
      resData.error = true;
      resData.message = "Invalid email or password";
      return res.json(resData);
    }

    const verifyUser = await userExist.verifyPassword(password);
    if (!verifyUser) {
      resData.error = true;
      resData.message = "Invalid email or password";
      return res.json(resData);
    }

    const createUserToken = await userExist.token();
    res.json(createUserToken);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const users_GoogleLogin = async (req, res) => {
  const { name, email, givenName } = req.body.profileObj;
  const { tokenId } = req.body;

  try {
    const emailExist = await Users.findOne({ email });

    if (emailExist) {
      const createLoginGoogleUserToken = await emailExist.token();
      res.json(createLoginGoogleUserToken);
      return;
    }

    const createGoogleUser = await Users.create({
      user_image: "No Image",
      fullname: name,
      email,
      username: givenName,
      user_type: "GUser",
      password: tokenId,
    });

    const createSigninGoogleUserToken = await createGoogleUser.token();
    res.json(createSigninGoogleUserToken);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { users_Login, users_GoogleLogin };
