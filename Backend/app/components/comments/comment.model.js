const mongoose = require("mongoose");
module.exports = mongoose.model("comments", {
  customer_id: { type: ObjectId, required: true },
  tailor_id: { type: ObjectId, required: true },
  body: {
    type: String,
    required: true,
  },
  rate: { type: number, required: true },
});
