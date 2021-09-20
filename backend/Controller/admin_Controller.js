const Products = require("../Model/product_Model");

const addProductController = async (req, res) => {
  const {
    product_image,
    product_name,
    product_brand,
    product_specs,
    product_price,
    product_stock,
    product_category,
    product_description,
  } = req.products;
  const error = { error: false, Message: "" };

  try {
    await Products.create({
      product_image,
      product_name,
      product_brand,
      product_specs,
      product_price,
      product_stock,
      product_category,
      product_description,
    });

    error.Message = "Product Successfully Added";
    res.json(error);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = { addProductController };
