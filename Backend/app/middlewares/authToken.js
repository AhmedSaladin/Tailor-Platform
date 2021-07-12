const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // getting token from -> Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, "secretitivezeetacloneproject", (err, decodedToken) => {
    if (err) res.sendStatus(403);
    req.user = decodedToken;
    next();
  });
};

module.exports = { authToken };
