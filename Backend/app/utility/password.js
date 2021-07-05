const bcrypt = require("bcryptjs");

/**
 *
 * @param {*} password String
 * @returns new hashed password
 */
exports.hashing = (password) => {
  try {
    const hashed_password = bcrypt.hash(password, 12);
    return hashed_password;
  } catch (err) {
    console.error(err.toString());
  }
};

/**
 *
 * @param {*} body_password String
 * @param {*} db_password String
 * @returns Boolen
 */
exports.check_password = (body_password, db_password) => {
  try {
    const is_true = bcrypt.compare(body_password, db_password);
    return is_true;
  } catch (err) {
    console.error(err.toString());
  }
};
