const express = require('express');

// controller functions
const { cartitems } = require('../controllers/cartController');

const router = express.Router();

// login route
router.post('/:userid', cartitems);

module.exports = router;
