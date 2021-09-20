const Products = require("../Model/product_Model");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.json(error.message);
  }
};

const getProduct = async (req, res) => {
  const { id } = req.headers;

  try {
    const product = await Products.findById(id);
    res.json(product);
  } catch (error) {
    res.json(error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_image,
    product_name,
    product_brand,
    product_specs,
    product_price,
    product_stock,
    product_category,
    product_description,
  } = req.product;
  const updates = {
    product_image,
    product_name,
    product_brand,
    product_specs,
    product_price,
    product_stock,
    product_category,
    product_description,
  };
  const option = {
    new: true,
  };

  try {
    await Products.findByIdAndUpdate(id, updates, option);
    res.json({ error: false, Message: "Update Success" });
  } catch (error) {
    res.json(error.message);
  }
};

const updateProductStock = async (req, res) => {
  const { productUpdateStock_id, totalStock } = req.body;
  try {
    const updateStock = await Products.findByIdAndUpdate(
      productUpdateStock_id,
      { product_stock: totalStock },
      { new: true }
    );
    res.json(updateStock);
  } catch (error) {
    res.json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const delete_product = await Products.findByIdAndDelete(id);
    res.json(delete_product);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};
