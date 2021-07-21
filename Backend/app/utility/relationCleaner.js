const Comment = require("../components/comments/comment.model");
const Order = require("../components/order/order.model");
const mongoose = require("mongoose");

module.exports = {
  /**
   *
   * @param {*} target target field
   * @param {*} id _id of user
   * @param {*} collection  name of collection to clean from it
   */
  cleaner: async (target, id, collection) => {
    const _id = mongoose.Types.ObjectId(id);
    switch (target) {
      case "customer":
        if (collection == "order")
          return await Order.deleteMany({ customer_id: _id });
        else if (collection == "comment")
          return await Comment.deleteMany({ customer_id: _id });
        break;
      case "tailor":
        if (collection == "order")
          return await Order.deleteMany({ tailor_id: _id });
        else if (collection == "comment")
          return await Comment.deleteMany({ tailor_id: _id });
        break;
    }
  },
};
