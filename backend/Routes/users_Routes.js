const router = require("express").Router();

//Controller
const { users_Signup } = require("../Controller/users_Signup_Controller");
const {
  users_Login,
  users_GoogleLogin,
} = require("../Controller/users_Login_Controller");
const {
  getUser,
  updateChangePassword,
  editUser,
  updateUserProfileImage,
} = require("../Controller/users_Controller");
//Middleware
const {
  signup_Middleware,
  login_Middleware,
  checkChangePassword,
  checkGoogleLogin,
  checkUserEdit,
} = require("../Middleware/users_Middleware");

router.route("/signup").post(signup_Middleware, users_Signup);

router.route("/login").post(login_Middleware, users_Login);

router.route("/googleLogin").post(checkGoogleLogin, users_GoogleLogin);

router.route("/editUserProfileDetails/:id").patch(checkUserEdit, editUser);

router.route("/updateUserProfileImage/:id").patch(updateUserProfileImage);

router.route("/user").post(getUser);

router.route("/changePassword").post(checkChangePassword, updateChangePassword);

module.exports = router;
