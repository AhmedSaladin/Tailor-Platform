const User = require("./user.model");
const { userSchema } = require("../../utility/validationSchema");
const promise_handler = require("../../utility/promiseHandler");
const { check_password, hashing } = require("../../utility/password");
const { createToken } = require("../../middlewares/authToken");
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
    const [user, err] = await promise_handler(User.findOne({ email }));
    if_error(err, INTERNAL_SERVER_ERROR);
    is_not_found(user);
    const valid = await check_password(password, user.password);
    is_not_found(valid);
    const authUser = { id: user._id, isTailor: user.isTailor };
    const accessToken = createToken(authUser);
    res
      .status(OK)
      .json({ token: accessToken, id: user._id, isTailor: user.isTailor });
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
