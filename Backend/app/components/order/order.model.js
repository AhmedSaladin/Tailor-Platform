const mongoose = require("mongoose");

module.exports = mongoose.model("orders", {
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tailorID: {
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
