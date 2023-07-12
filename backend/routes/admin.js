const express = require('express');

// controller functions
const { changeStatus } = require('../controllers/Admin/OrdersData');

const router = express.Router();

// ORDERS
router.put('/:userId/orders/:orderId/status', changeStatus);

module.exports = router;
