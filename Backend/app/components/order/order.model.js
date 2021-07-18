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
  sizes: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "rejected", "accepted", "finished"],
  },
});
