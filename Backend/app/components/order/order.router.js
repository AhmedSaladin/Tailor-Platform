const express = require('express');
const router = express.Router();

const orderController = require('./order.controller')


router.post('/',orderController.create_order);

module.exports = router;