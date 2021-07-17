const express = require('express');
const router = express.Router();

const orderController = require('./order.controller')


router.post('/',orderController.create_order);
router.get('/orders',orderController.view_order);
router.get('/customer-order',orderController.view_orderByCustomer);
router.get('/order',orderController.view_orderByOrder);
router.get('/tailor-order',orderController.view_orderByTailor);



module.exports = router;