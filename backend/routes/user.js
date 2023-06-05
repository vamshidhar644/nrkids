const express = require('express');

// controller functions
const { signupUser, loginUser, cartfunction } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// add to cart

router.post('/:userid/cart', cartfunction)

module.exports = router;
 