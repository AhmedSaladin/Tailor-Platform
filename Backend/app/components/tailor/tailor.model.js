const mongoose = require("mongoose");
const tailorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  phone: {
    type: Number,
    required: true,
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
module.exports = mongoose.model("user", tailorSchema);
