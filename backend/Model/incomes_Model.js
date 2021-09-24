const mongoose = require("mongoose");
const schema = mongoose.Schema;

const incomesSchema = new schema(
  {
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const income = mongoose.model("incomes", incomesSchema);
module.exports = income;
