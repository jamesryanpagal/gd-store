const Users = require("../Model/user_Model");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const clientId = new OAuth2Client(
  "93702015471-21t26mneagpneevhg0spjnot5b0pk04n.apps.googleusercontent.com"
);

const signup_Middleware = async (req, res, next) => {
  const { fullname, email, username, user_type, password, confirm_password } =
    req.body;

  const resData = {
    error: false,
    message: "",
  };

  if (!fullname || !email || !username || !password) {
    (resData.error = true),
      (resData.message = "Please fill out all the inputs");
    return res.json(resData);
  }

  const fullname_regex = /[0-9]/g;

  if (fullname_regex.test(fullname)) {
    resData.error = true;
    resData.message = "Invalid fullname";
    res.json(resData);
    return;
  }

  if (password.length < 5) {
    (resData.error = true), (resData.message = "Password too short");
    return res.json(resData);
  }

  if (confirm_password !== password) {
    (resData.error = true), (resData.message = "Password don't matched");
    return res.json(resData);
  }

  const emailregex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const checkEmail = emailregex.test(email);
  if (!checkEmail) {
    (resData.error = true), (resData.message = "Invalid Email address");
    return res.json(resData);
  }

  const emailExist = await Users.findOne({ email });
  if (emailExist) {
    (resData.error = true),
      (resData.message = "Email address already been taken");
    return res.json(resData);
  }

  const userExist = await Users.findOne({ username });
  if (userExist) {
    (resData.error = true), (resData.message = "Username already been taken");
    return res.json(resData);
  }

  req.user = {
    user_image: "No Image",
    fullname,
    email,
    username,
    user_type,
    password,
  };
  next();
};

const login_Middleware = (req, res, next) => {
  const { email, password } = req.body;

  const resData = {
    error: false,
    message: "",
  };

  if (!email || !password) {
    resData.error = true;
    resData.message = "Invalid email or password";
    return res.json(resData);
  }

  req.user = { email, password };
  next();
};

const checkChangePassword = async (req, res, next) => {
  const { id, old_password, new_password, confirm_password } = req.body;
  const changePasswordError = { error: true, Message: "" };

  try {
    const details = await Users.findById(id);
    const verifyPassword = await bcrypt.compare(old_password, details.password);

    if (!verifyPassword) {
      changePasswordError.Message = "Incorrect Old Password";
      res.json(changePasswordError);
      return;
    }

    if (!new_password) {
      changePasswordError.Message = "Incorrect New Password";
      res.json(changePasswordError);
      return;
    }

    if (new_password !== confirm_password) {
      changePasswordError.Message = "Password didn't matched";
      res.json(changePasswordError);
      return;
    }

    req.user = {
      id,
      password: new_password,
    };
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const checkGoogleLogin = async (req, res, next) => {
  const { tokenId } = req.body;

  try {
    const verifyGoogleToken = await clientId.verifyIdToken({
      idToken: tokenId,
    });
    if (verifyGoogleToken.payload.email_verified) {
      next();
    }
  } catch (error) {
    res.json(error.message);
  }
};

const checkUserEdit = async (req, res, next) => {
  const { fullname, email, username } = req.body;

  const error = { error: true, Message: "" };

  const fullname_edit_regex = /[0-9]/g;
  const checkFullname = fullname_edit_regex.test(fullname);

  if (!fullname) {
    error.Message = "Invalid fullname";
    res.json(error);
    return;
  }

  if (checkFullname) {
    error.Message = "Invalid fullname";
    res.json(error);
    return;
  }

  if (!email) {
    error.Message = "Invalid email";
    res.json(error);
    return;
  }

  if (!username) {
    error.Message = "Invalid username";
    res.json(error);
    return;
  }

  req.user = {
    fullname,
    email,
    username,
  };

  next();
};

module.exports = {
  signup_Middleware,
  login_Middleware,
  checkChangePassword,
  checkGoogleLogin,
  checkUserEdit,
};
