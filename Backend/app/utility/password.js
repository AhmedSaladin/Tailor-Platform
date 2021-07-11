const bcrypt = require("bcryptjs");

/**
 *
 * @param {*} password String
 * @returns new hashed password
 */
exports.hashing = async (password) => {
  try {
    const salt = 12;
    const hashed_password = await bcrypt.hash(password, salt);
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
exports.check_password = async (body_password, db_password) => {
  try {
    const is_true = await bcrypt.compare(body_password, db_password);
    return is_true;
  } catch (err) {
    console.error(err.toString());
  }
};
