const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/post', placeOrder);
router.put('/status/:id/', updateOrderStatus);

module.exports = router;
