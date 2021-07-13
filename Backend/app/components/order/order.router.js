const express = require('express');
const router = express.Router();

const orderController = require('./order.controller')


router.post('/',orderController.create_order);
router.get('/',orderController.view_order);


module.exports = router;