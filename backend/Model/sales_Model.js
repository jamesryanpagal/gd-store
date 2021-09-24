const mongoose = require("mongoose");
const schema = mongoose.Schema;

const salesSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    purchased: [],
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("products_sales", salesSchema);
module.exports = Sales;
