const router = require("express").Router();
const commentController=require("./comment.controller")

router.get('',commentController.get_comment)
router.post('',commentController.creat_comment)
router.get('/:id',commentController.get_comments_by_id)
module.exports=router;