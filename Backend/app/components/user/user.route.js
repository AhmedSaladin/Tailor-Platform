const router = require("express").Router();
const user = require("./user.controller");

router
  .get("/:id", user.get_user)
  .post("/login", user.login)
  .post("/signup", user.sign_up);

module.exports = router;
