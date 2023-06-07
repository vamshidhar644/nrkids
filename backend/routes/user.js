const express = require('express');

// controller functions
const {
  signupUser,
  loginUser,
  addCart,
  deletecartitem,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// add to cart
router.post('/:userId/cart', addCart);

// delete item from cart
router.delete('/:userId/cart', deletecartitem);

module.exports = router;
