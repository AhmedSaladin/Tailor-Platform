const Comment = require("./comment.model");
const mongoose=require("mongoose")
const { is_valid_id, is_not_found } = require("../../utility/errors");
const { OK } = require("../../utility/statusCodes");

const get_comment = (req, res) => {
  if (req.query.tailor_id) {
    console.log(req.query);
    Comment.find({ tailor_id: req.query.tailor_id })
      .populate("customer_id", "name")
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
          console.log(result);
        }
      });
  } else if (req.query.order_id) {
    console.log(req.query);
    Comment.find({ order_id: req.query.order_id })
      .populate("customer_id", "name")
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(result);
          console.log(result);
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
          console.log(result);
        }
      });
  }
};

const creat_comment = (req, res) => {
  let { body } = req;
  const comment = new Comment(body);
  comment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .then(() => {
      console.log("tailor id** " + body.tailor_id);
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
        console.log(result);
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
      console.log(data.todos);
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
