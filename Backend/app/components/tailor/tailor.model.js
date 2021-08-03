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
    default: "https://ucarecdn.com/ff40ffec-ae73-4b9c-bd65-8d544de3efbb/21104.png",
  },
  orders: {
    type: Array,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  designFor: {
    type: String,
    enum: ["Men", "Women"],
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
  rate:{
    type:Number,
    default:5
  },
  count:{
    type:Number,
    default:0
  }
});
module.exports = mongoose.model("tailor", tailorSchema);
