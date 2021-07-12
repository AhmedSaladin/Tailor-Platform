const User = require("./user.model");
const promise_handler = require("../../utility/promiseHandler");
const { check_password, hashing } = require("../../utility/password");
const { is_not_found, if_error, is_valid_id } = require("../../utility/errors");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../../utility/statusCodes");

module.exports = {
  sign_up: async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashed_password = await hashing(password);
    const [, error] = await promise_handler(
      User.create({
        name,
        email,
        phone,
        password: hashed_password,
      })
    );
    if_error(error, BAD_REQUEST);
    res.status(CREATED).json();
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const found = await User.findOne({ email });
    if (!found) throw { status: 400, message: "Wrong email or password." };
    const valid_password = await check_password(password, found.password);
    if (!valid_password)
      throw { status: 404, message: "Wrong email or password." };
    res.status(200).json();
  },

  get_all_users: async (req, res) => {
    const [users, error] = await promise_handler(
      User.find({ isTailor: false })
    );
    if_error(error, BAD_REQUEST);
    res.status(OK).json(users);
  },

  get_user: async (req, res) => {
    const id = req.params.id;
    is_valid_id(id);
    const [user, err] = await promise_handler(User.findById(id));
    is_not_found(user);
    if_error(err, INTERNAL_SERVER_ERROR);
    res.status(OK).json(user);
  },

  update_user_info: async (req, res) => {
    const id = req.params.id;
    const { body } = req;
    is_valid_id(id);
    if (body.password) {
      const hashed_password = await hashing(body.password);
      body.password = hashed_password;
    }
    const [, err] = await promise_handler(
      User.findOneAndUpdate({ _id: id }, body)
    );
    if_error(err, INTERNAL_SERVER_ERROR);
    res.status(OK).json();
  },
};
