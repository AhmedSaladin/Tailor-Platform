const mongoose = require("mongoose");
module.exports = mongoose.model("users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  isTailor: {
    type: Boolean,
    default: true,
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
    enum: ["male", "female"],
  },
  designFor: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  gallary: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  about: {
    type: String,
    default: "Hi I'm new Tailor here",
  },
});
