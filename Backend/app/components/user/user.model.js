const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty."],
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Invalid email format."],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty."],
    validate: {
      validator: function(val) {
        return /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?_ \'\"\-+=]).*$/.test(val);
      },
      message: `Password should have at least 8 characters including one uppercase, lowercase character and a special character.`
    },
  },
  phone: {
    type: Number,
    required: [true, "Phone cannot be empty."],
  },
  sizes: {
    type: Object,
  },
  isTailor: {
    type: Boolean,
    default: false,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://image.flaticon.com/icons/png/512/21/21104.png",
  },
  orders: {
    type: Array,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not supported."
    }
  },
});
module.exports = mongoose.model("user", userSchema);
