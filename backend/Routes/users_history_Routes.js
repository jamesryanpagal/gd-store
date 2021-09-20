const router = require("express").Router();

//controller
const {
  createUserHistory,
  getUserHistory,
} = require("../Controller/users_History_Controller");

router.route("/createUserHistory").post(createUserHistory);

router.route("/getUserHistory/:id").get(getUserHistory);

module.exports = router;
