const router = require("express").Router();
const asyncHandler = require("../../middlewares/asyncHandler");
const { authToken } = require("../../middlewares/authToken");
const {
  get_user,
  get_all_users,
  login,
  sign_up,
  update_user_info,
} = require("./user.controller");

router
  .post("/login", asyncHandler(login))
  .post("/signup", asyncHandler(sign_up))
  .get("/:id", authToken, asyncHandler(get_user))
  .get("", authToken, asyncHandler(get_all_users))
  .put("/:id", authToken, asyncHandler(update_user_info));

module.exports = router;
