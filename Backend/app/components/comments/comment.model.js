const mongoose = require("mongoose");
module.exports = mongoose.model("comments", {
  customer_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  order_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true 
  },
  tailor_id: {  
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Tailor',
    required: true 
  },
  body: {
    type: String,
  },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
