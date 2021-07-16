const { BAD_REQUEST, NOT_FOUND } = require("./statusCodes");
const mongo = require("mongoose");

module.exports = {
  is_valid_id: (id) => {
    if (!mongo.isValidObjectId(id))
      throw { status: BAD_REQUEST, message: "Invalid ID." };
  },

  if_error: (error, status) => {
    if (error) throw { status: status, message: error.toString() };
  },

  is_not_found: (data) => {
    if (!data) throw { status: NOT_FOUND, message: "NOT FOUND" };
  },
  is_exists: (data) => {
    if (data)
      throw { status: BAD_REQUEST, message: "Email already registered." };
  },
};
