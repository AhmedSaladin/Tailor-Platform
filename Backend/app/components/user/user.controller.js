const User = require("./user.model");
const mongoID = require("mongoose");
const { check_password, hashing } = require("../../utility/password");
const INTERNAL_SERVER_ERROR = 500;
const promise_handler = require("../../utility/promiseHandler");

module.exports = {
  get_user: async (req, res, next) => {
    const id = req.params.id;
    if (!mongoID.isValidObjectId(id))
      next({ status: 400, message: "Not valid ID" });
    const [user, err] = await promise_handler(User.findById(id));
    if (user) return res.status(200).json(user);
    next({ status: 400, message: err.toString() });
  },

  sign_up: async (req, res, next) => {
    try {
      const user = req.body;
      const email = user.email;
      const is_found = await User.findOne({ email });
      if (is_found == []) res.status(406).json();
      const password = await hashing(user.password);
      const new_user = new User({
        name: user.name,
        email: user.email,
        password,
      });
      new_user.save();
      console.log(new_user);
      res.status(201).json();
    } catch (err) {
      throw Error({ status: INTERNAL_SERVER_ERROR, message: err.toString() });
    }
  },

  login: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { password } = req.body;
      const found = await User.findOne({ email });
      if (found == []) throw Error({ status: 404, message: "Email not found" });
      const valid_password = await check_password(password, found.password);
      if (!valid_password) res.status(400).json();
      res.status(200).json();
    } catch (err) {
      throw Error({ status: INTERNAL_SERVER_ERROR, message: err.toString() });
    }
  },
};
