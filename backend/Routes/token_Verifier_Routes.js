const router = require("express").Router();
const { verifyToken } = require("../Middleware/token_Verifier_Middleware");
const { tokenInfo } = require("../Controller/token_Verifier_Controller");

router.route("/").get(verifyToken, tokenInfo);

module.exports = router;
