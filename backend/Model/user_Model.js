const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersSchema = new schema(
  {
    user_image: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    user_type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  return (this.password = await bcrypt.hash(this.password, salt));
});

usersSchema.methods.token = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

usersSchema.methods.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const users = mongoose.model("e_commerce_users", usersSchema);
module.exports = users;
