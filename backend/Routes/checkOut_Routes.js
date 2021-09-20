const router = require("express").Router();

//controller
const {
  productsCheckout,
  productCheckout,
  sendProductsEmail,
  sendProductEmail,
} = require("../Controller/checkout_Controller");

router.route("/productsCheckout").post(productsCheckout);

router.route("/productCheckout").post(productCheckout);

router.route("/sendProductsEmail").post(sendProductsEmail);

router.route("/sendProductEmail").post(sendProductEmail);

module.exports = router;
