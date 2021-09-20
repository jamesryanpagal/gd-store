const mongoose = require("mongoose");
const schema = mongoose.Schema;

const users_history_schema = new schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    purchased: [],
  },
  {
    timestamps: true,
  }
);

const Users_history = mongoose.model("users_histories", users_history_schema);
module.exports = Users_history;
