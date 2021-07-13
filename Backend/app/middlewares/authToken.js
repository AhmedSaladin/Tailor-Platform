const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // getting token from -> Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secretitivezeetacloneproject", (err, decodedToken) => {
    if (err) return res.sendStatus(403);
    req.user = decodedToken;
    next();
  });
};

const createToken = (user) => {
  return jwt.sign(user, "secretitivezeetacloneproject", {
    expiresIn: "7d",
  });
};

module.exports = { authToken, createToken };
