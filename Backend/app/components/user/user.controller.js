require("dotenv").config();
const User = require("./user.model");
const Tailor = require("../tailor/tailor.model");
const { userSchema } = require("../../utility/validationSchema");
const promise_handler = require("../../utility/promiseHandler");
const { check_password, hashing } = require("../../utility/password");
const { get_uuid, images_clean_up } = require("../../utility/imageHandling");
const { createToken } = require("../../middlewares/authToken");
const { cleaner } = require("../../utility/relationCleaner");

const {
  is_not_found,
  if_error,
  is_valid_id,
  is_exists,
} = require("../../utility/errors");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../../utility/statusCodes");

module.exports = {
  sign_up: async (req, res) => {
    const { email } = req.body;
    let [user, error] = await promise_handler(User.findOne({ email }));
    if_error(error, INTERNAL_SERVER_ERROR);
    is_exists(user);
    [user, error] = await promise_handler(Tailor.findOne({ email }));
    if_error(error, INTERNAL_SERVER_ERROR);
    is_exists(user);
    [user, error] = await promise_handler(userSchema.validateAsync(req.body));
    if_error(error, BAD_REQUEST);
    const hashed_password = await hashing(user.password);
    await User.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: hashed_password,
    });
    res.status(CREATED).json();
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    let [user, err] = await promise_handler(User.findOne({ email }));
    if_error(err, INTERNAL_SERVER_ERROR);
    if (!user) [user, err] = await promise_handler(Tailor.findOne({ email }));
    if_error(err, INTERNAL_SERVER_ERROR);
    is_not_found(user);
    const valid = await check_password(password, user.password);
    is_not_found(valid);
    const authUser = { id: user._id, isTailor: user.isTailor };
    const accessToken = createToken(authUser);
    res.status(OK).json({
      id: user._id,
      name: user.name,
      token: accessToken,
      isTailor: user.isTailor,
      admin: user.admin,
    });
  },

  get_all_users: async (req, res) => {
    const currentPage = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 3);
    const count = await User.find({ isTailor: false }).countDocuments();
    const totalPages = Math.ceil(count / limit);
    const [users, error] = await promise_handler(
      User.find({ isTailor: false })
        .skip((currentPage - 1) * limit)
        .limit(limit)
    );
    if_error(error, BAD_REQUEST);
    res.status(OK).json({ totalPages, users });
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
    const [user, err] = await promise_handler(
      User.findOneAndUpdate({ _id: id }, body)
    );
    if_error(err, INTERNAL_SERVER_ERROR);
    if (body.avatar) {
      const oldImg = get_uuid(user.avatar);
      const newImg = get_uuid(body.avatar);
      if (oldImg !== newImg) await images_clean_up(oldImg);
    }
    res.status(OK).json();
  },

  delete_user: async (req, res) => {
    const { id } = req.params;
    is_valid_id(id);
    const [user, err] = await promise_handler(
      User.findOneAndDelete({ _id: id })
    );
    if_error(err, INTERNAL_SERVER_ERROR);
    is_not_found(user);
    await images_clean_up(user.avatar);
    await cleaner("customer", id, "comment");
    await cleaner("customer", id, "order");
    res.status(OK).json();
  },
};
