const router = require("express").Router();

//middleware
const { checkAddProduct } = require("../Middleware/admin_Middleware");
//Controller
const { addProductController } = require("../Controller/admin_Controller");

router.route("/addproduct").post(checkAddProduct, addProductController);

module.exports = router;
