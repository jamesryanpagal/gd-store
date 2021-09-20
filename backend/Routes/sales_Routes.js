const router = require("express").Router();

//controller
const { sales, getSales } = require("../Controller/sales_Controller");

router.route("/productsales").post(sales);

router.route("/getSales").get(getSales);

module.exports = router;
