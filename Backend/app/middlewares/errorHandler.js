const { INTERNAL_SERVER_ERROR } = require("../utility/statusCodes");
module.exports = (err, req, res, next) => {
  const status = err.status || INTERNAL_SERVER_ERROR;
  res.status(status).json({ message: err.message });
};
