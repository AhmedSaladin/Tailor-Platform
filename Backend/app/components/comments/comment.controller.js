const Comment = require("./comment.model");
const Tailor = require("../tailor/tailor.model");
const mongoose = require("mongoose");
const { is_valid_id, is_not_found } = require("../../utility/errors");
const { OK } = require("../../utility/statusCodes");

const get_comment = (req, res) => {
  if (req.query.tailor_id) {
    // console.log(req.query);
    var mysort = { date: -1 };
    Comment.find({ tailor_id: req.query.tailor_id })
      .populate("customer_id", "name")
      .sort(mysort)
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
  } else if (req.query.order_id) {
    Comment.find({ order_id: req.query.order_id })
      .populate("customer_id", "name")
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
  } else {
    Comment.find({})
      .populate("customer_id", "name")
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
        }
      });
  }
};

const creat_comment = (req, res) => {
  let { body } = req;
  const id = mongoose.Types.ObjectId(body.tailor_id);
  Tailor.findOne({ _id: id })
    .then((result) => {
      console.log(result);
      let oldRate = result.rate;
      let oldCount = result.count;
      let sum = oldCount * oldRate;
      let newRate = Math.ceil((sum + body.rate) / (oldCount + 1));
      Tailor.findOneAndUpdate(
        { _id: result._id },
        { rate: newRate, count: oldCount + 1 },
        { new: true }
      );
    })
    .then((result) => {
      const comment = new Comment(body);
      comment.save();
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const get_comments_by_id = (req, res) => {
  Comment.findById(req.params.id)
    .populate("customer_id", "name")
    // .populate('tailor_id')
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
};

const get_all_rate = (req, res) => {
  Comment.aggregate(
    [
      {
        $group: {
          _id: { tailor_id: "$tailor_id" },
          count: { $sum: 1 },
          rate: { $avg: "$rate" },
        },
      },
    ],
    function (error, data) {
      if (error) {
        console.log(error);
      }
      return res.json(data);
      //handle error case also
    }
  );
};

const get_tailor_rate = async (req, res) => {
  const params_id = req.params.tailor_id;
  is_valid_id(params_id);
  const id = mongoose.Types.ObjectId(req.params.tailor_id);
  const rate = await Comment.aggregate([
    {
      $match: { tailor_id: id },
    },
    {
      $group: {
        _id: { tailor_id: "$tailor_id" },
        count: { $sum: 1 },
        rate: { $avg: "$rate" },
      },
    },
    //  { $sort : { date : 1 } }
  ]);
  is_not_found(rate);
  res.status(OK).json(rate);
};

module.exports = {
  get_comment,
  creat_comment,
  get_comments_by_id,
  get_all_rate,
  get_tailor_rate,
};
