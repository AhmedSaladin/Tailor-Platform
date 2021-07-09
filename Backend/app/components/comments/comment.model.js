const mongoose = require("mongoose");
module.exports = mongoose.model("comments", {
  customer_id: { type: ObjectId, required: true },
  tailor_id: { type: ObjectId, required: true },
  body: {
    type: String,
  },
  rate: { type: number, required: true },
  date: { type: Date, default: Date.now },
});
