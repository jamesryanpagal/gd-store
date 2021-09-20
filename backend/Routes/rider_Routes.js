const router = require("express").Router();

//controller
const { getRiders } = require("../Controller/rider_Controller");

router.route("/getRiders").get(getRiders);

module.exports = router;
