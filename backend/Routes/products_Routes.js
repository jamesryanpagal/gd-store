const router = require("express").Router();

//middleware
const { checkUpdateProduct } = require("../Middleware/products_Middleware");
//controller
const {
  getProducts,
  getProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
} = require("../Controller/products_Controller");

router.route("/getProducts").get(getProducts);

router.route("/getProduct").get(getProduct);

router.route("/updateProduct/:id").patch(checkUpdateProduct, updateProduct);

router.route("/updateProductStock").patch(updateProductStock);

router.route("/deleteProduct/:id").delete(deleteProduct);

module.exports = router;
