require("dotenv").config();
const jwt = require("jsonwebtoken");
const { FORBIDDEN, UNAUTHORIZED } = require("../utility/statusCodes");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // getting token from -> Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(UNAUTHORIZED);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(FORBIDDEN);
    req.user = decodedToken;
    next();
  });
};

const createToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { authToken, createToken };
