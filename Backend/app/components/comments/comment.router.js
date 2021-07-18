const router = require("express").Router();
const commentController=require("./comment.controller")

router.get('',commentController.get_comment)
router.get('/rate/:tailor_id',commentController.get_tailor_rate)
router.get('/rate',commentController.get_all_rate)
router.post('',commentController.creat_comment)
router.get('/:id',commentController.get_comments_by_id)
module.exports=router;