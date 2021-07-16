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
    type: String,
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
  admin: {
    type: Boolean,
    default: false,
  },
  gallary: {
    type: Array,
  },
  about: {
    type: String,
    default: "Hello, I'm a new tailor here! I will be editing this soon.",
  },
});
module.exports = mongoose.model("tailor", tailorSchema);
