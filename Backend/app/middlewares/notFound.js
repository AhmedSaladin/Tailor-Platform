const { NOT_FOUND } = require("../utility/statusCodes");

module.exports = (req, res) => {
  res.status(NOT_FOUND).json({ message: "انت بتعمل ايه هنا؟" });
};
