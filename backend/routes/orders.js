const express = require('express');
const { createOrder, getOrders } = require('../controllers/OrdersController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all workouts
router.get('/:userId', getOrders);

// POST a new workout
router.post('/:userId', createOrder);

module.exports = router;
