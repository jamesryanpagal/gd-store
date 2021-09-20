const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema(
  {
    product_image: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_brand: {
      type: String,
      required: true,
    },
    product_specs: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_stock: {
      type: Number,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("products", productSchema);
module.exports = products;
