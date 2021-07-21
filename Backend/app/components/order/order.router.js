const express = require('express');
const router = express.Router();

const orderController = require('./order.controller')


router.post('/',orderController.create_order);
router.get('',orderController.view_order);
router.get('/customer-orders/:id',orderController.view_orderByCustomer);
router.get('/:id',orderController.view_orderByOrderId);
router.get('/tailor-orders/:id',orderController.view_orderByTailor);
router.get('/:orderId',orderController.delete_order);




module.exports = router;