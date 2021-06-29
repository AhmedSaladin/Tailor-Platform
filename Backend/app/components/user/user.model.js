const mongoose = require("mongoose");

module.exports = mongoose.model("users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  sizes: {
    type: Object,
  },
  isTailor: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    default: "https://image.flaticon.com/icons/png/512/21/21104.png",
  },
  orders: {
    type: Array,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});
