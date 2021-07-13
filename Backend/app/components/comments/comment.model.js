const mongoose = require("mongoose");
module.exports = mongoose.model("comments", {
  customer_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true 
  },
  order_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
    required: true 
  },
  tailor_id: {  
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true 
  },
  body: {
    type: String,
  },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
