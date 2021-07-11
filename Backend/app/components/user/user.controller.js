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
    const { name, email, phone, password } = req.body;
    try {
      const found = await User.findOne({ email });
      if (found) throw { status: 403, message: "Email already exists." };
      const hashed_password = await hashing(password);
      const user = await User.create({
        name,
        email,
        phone,
        password: hashed_password,
      });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const found = await User.findOne({ email });
      if (!found) throw { status: 403, message: "Wrong email or password." };
      const valid_password = await check_password(password, found.password);
      if (!valid_password)
        throw { status: 403, message: "Wrong email or password." };
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  },
};
