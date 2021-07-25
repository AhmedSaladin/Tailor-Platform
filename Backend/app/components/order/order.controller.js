const mongoose = require("mongoose");
const userModel = require("../user/user.model");
const tailorModel = require("../tailor/tailor.model");
const orderModel = require("./order.model");

const currentPage = parseInt(req.query.page || 1);
const limit = parseInt(req.query.limit || 4);
const count = await orderModel.find({}).countDocuments();
const totalPages = Math.ceil(count / limit);
const skip = (currentPage - 1) * limit;

const create_order = (req, res, next) => {
  const order = new orderModel({
    customer_id: req.body.customer_id,
    tailor_id: req.body.tailor_id,
    designs: req.body.design,
    customer_sizes: req.body.customer_sizes,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json();
    })
    .catch((err) => {
      console.log(err.toString());
      res.status(500).json({ message: err.toString() });
    });
};

const view_order = async (req, res, next) => {
  
  orderModel
    .aggregate([
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: tailorModel.collection.name,
          localField: "tailor_id",
          foreignField: "_id",
          as: "tailor",
        },
      },
      {
        $unwind: "$tailor",
      },

      {
        $project: {
          designs: 1,
          status: 1,
          customer_sizes: 1,
          customer_id: 1,
          tailor_id: 1,
          customer_name: "$customer.name",
          tailor_name: "$tailor.name",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ])
    .then((result) => {
      res.status(200).json({ orders: result, totalPages });
    })
    .catch((error) => {
      console.log(error);
    });
};

const view_orderByTailor = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  orderModel
    .aggregate([
      { $match: { tailor_id: id } },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: tailorModel.collection.name,
          localField: "tailor_id",
          foreignField: "_id",
          as: "tailor",
        },
      },
      {
        $unwind: "$tailor",
      },

      {
        $project: {
          comments: 1,
          designs: 1,
          status: 1,
          customer_sizes: 1,
          customer_id: 1,
          tailor_id: 1,
          customer_name: "$customer.name",
          tailor_name: "$tailor.name",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ])
    .then((result) => {
      console.log("line 221");
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
const view_orderByCustomer = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  orderModel
    .aggregate([
      { $match: { customer_id: id } },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: tailorModel.collection.name,
          localField: "tailor_id",
          foreignField: "_id",
          as: "tailor",
        },
      },
      {
        $unwind: "$tailor",
      },

      {
        $project: {
          _id: 1,
          comments: 1,
          designs: 1,
          status: 1,
          customer_sizes: 1,
          customer_id: 1,
          tailor_id: 1,
          customer_name: "$customer.name",
          tailor_name: "$tailor.name",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ])
    .then((result) => {
      console.log("line 273");
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
const view_orderByOrderId = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  orderModel
    .aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: userModel.collection.name,
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: tailorModel.collection.name,
          localField: "tailor_id",
          foreignField: "_id",
          as: "tailor",
        },
      },
      {
        $unwind: "$tailor",
      },

      {
        $project: {
          comments: 1,
          designs: 1,
          status: 1,
          customer_sizes: 1,
          customer_name: "$customer.name",
          tailor_name: "$tailor.name",
          customer_id: 1,
          tailor_id: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ])
    .then((result) => {
      console.log("line 327");
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const delete_order = (req, res, next) => {
  orderModel
    .remove({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Order deleted" });
    })
    .catch((err) => {
      console.log(err.toString());
      res.status(500).json({ message: err.toString() });
    });
};

const updateStatus = (req, res) => {
  // console.log(req.params.id)
  orderModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    { new: true },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: "Cannot update order status" });
      }
      res.json(order);
    }
  );
};
const updateComments = (req, res) => {
  let comment = [];
  // console.log(req.params.id)
  orderModel
    .findById(req.params.id)
    .then((result) => {
      comment = result.comments;
      if (comment !== null) comment.unshift(req.body.comment);
      else comment = req.body.comment;
      console.log(comment);
      orderModel.findOneAndUpdate(
        { _id: req.params.id },
        { comments: comment },
        { new: true },
        (err, order) => {
          if (err) {
            return res
              .comment(400)
              .json({ error: "Cannot update order status" });
          }
          res.json(order.comments);
        }
      );
      //res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
module.exports = {
  create_order,
  view_order,
  view_orderByTailor,
  view_orderByCustomer,
  view_orderByOrderId,
  delete_order,
  updateStatus,
  updateComments,
};
