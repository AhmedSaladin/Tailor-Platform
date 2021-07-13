const Tailor = require("../user/user.model");
const mongo = require("mongoose");

all_tailors_get = async (req, res, next) => {
  try {
    const tailors = await Tailor.find({ isTailor: true });
    res.status(200).json(tailors);
  } catch (err) {
    next(err);
  }
};

tailor_get = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if (!mongo.isValidObjectId(_id))
      throw { status: 400, message: "Invalid Id." };
    const tailor = await Tailor.findById(_id);
    res.status(200).json(tailor);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  all_tailors_get,
  tailor_get,
};
