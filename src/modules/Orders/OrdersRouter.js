const express = require('express');
const OrdersController = require('./OrdersControllers');
const router = express.Router();
const ordersController = new OrdersController();

router.post('/:idUser', ordersController.createOrder);
router.get('/', ordersController.getOrders);
router.get('/individual/:idOrder', ordersController.getOrder);
router.post('/send/:idOrder', ordersController.sendOrder);
module.exports = router;

