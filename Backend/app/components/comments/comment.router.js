const router = require("express").Router();
const commentController = require("./comment.controller");
const asyncHandler = require("../../middlewares/asyncHandler");

router.get("", commentController.get_comment);
router.get("/rate/:tailor_id", asyncHandler(commentController.get_tailor_rate));
router.get("/rate", commentController.get_all_rate);
router.post("", commentController.creat_comment);
router.get("/:id", commentController.get_comments_by_id);
module.exports = router;
