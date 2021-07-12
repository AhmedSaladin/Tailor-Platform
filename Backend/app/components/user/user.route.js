const router = require("express").Router();
const asyncHandler = require("../../middlewares/asyncHandler");
const authToken = require("../../middlewares/authToken");
const {
  get_user,
  get_all_users,
  login,
  sign_up,
  update_user_info,
} = require("./user.controller");

router
  .get("/:id", asyncHandler(get_user))
  .get("", asyncHandler(get_all_users))
  .post("/login", asyncHandler(login))
  .post("/signup", asyncHandler(sign_up))
  .put("/:id", asyncHandler(update_user_info));

module.exports = router;
