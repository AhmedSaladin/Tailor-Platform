const mongoose = require("mongoose");

module.exports = mongoose.model("orders", {
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tailor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  designs: {
    type: Array,
    required: true,
  },
  customer_sizes: {
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
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "rejected", "accepted", "updated" ,"finished"],
  },
  comments: Array,
  price: Number,
  updateDate: { type: Date, default: Date.now },
  deliveryDare:Date
});
