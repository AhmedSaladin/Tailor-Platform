const express = require('express');
const router = express.Router();

const orderController = require('./order.controller')


router.post('/',orderController.create_order);
router.get('',orderController.view_order);
router.get('/customer-orders/:id',orderController.view_orderByCustomer);
router.get('/:id',orderController.view_orderByOrderId);
router.get('/tailor-orders/:id',orderController.view_orderByTailor);
router.delete('/:id',orderController.delete_order);
router.patch('/:id',orderController.updateStatus);
router.patch('/comments/:id',orderController.updateComments);
router.patch('/price/:id',orderController.updatePrice);





module.exports = router;