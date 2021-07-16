const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    unique: true,
  },
  sizes: {
    type: {
      armLength: Number,
      height: Number,
      waist: Number,
      collar: Number,
      thigh: Number,
      chest: Number,
      shoulder: Number,
      inseam: Number,
    },
  },
  isTailor: {
    type: Boolean,
    default: false,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
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
      message: "{VALUE} is not supported.",
    },
  },
});
module.exports = mongoose.model("user", userSchema);
