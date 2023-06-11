const express = require('express');

// controller functions
const {
  signupUser,
  loginUser,
  addCart,
  getCartData,
  deletecartitem,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get all the cart items
router.get('/cart/:id', getCartData);

// add to cart / update
router.post('/cart/:id', addCart);

// delete item from cart
router.delete('/:userId/cart/:productId', deletecartitem);

module.exports = router;
