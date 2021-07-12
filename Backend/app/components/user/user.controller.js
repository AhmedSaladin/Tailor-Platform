const User = require("./user.model");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../../utility/validationSchema");
const promise_handler = require("../../utility/promiseHandler");
const { check_password, hashing } = require("../../utility/password");
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

const TOKEN_AGE = 7 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign(user, "secretitivezeetacloneproject", {
    expiresIn: TOKEN_AGE,
  });
};

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
    // const token = createToken(user._id, user.isTailor);
    res.status(CREATED).json();
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw { status: BAD_REQUEST, message: "Wrong email or password" };
    }
    const valid = await check_password(password, user.password);
    if (!valid) {
      throw { status: BAD_REQUEST, message: "Wrong email or password" };
    }
    const authUser = { id: user._id, isTailor: user.isTailor };
    const accessToken = createToken(authUser);
    res.status(OK).json({ accessToken });
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
