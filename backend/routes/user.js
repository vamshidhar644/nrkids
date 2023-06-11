const express = require('express');

// controller functions
const {
  signupUser,
  loginUser,
  addCart,
  getCartData,
  deletecartitem,
  getSavelater,
  addSavelater,
  deleteSavelater,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get all the cart items
router.get('/cart/:id', getCartData);

// add to cart / update cart
router.post('/cart/:id', addCart);

// delete item from cart
router.delete('/:userId/cart/:productId', deletecartitem);

// get all the save later items
router.get('/savelater/:id', getSavelater);

// add / update save later
router.post('/savelater/:id', addSavelater);

// delete item from cart
router.delete('/:userId/savelater/:productId', deleteSavelater);

module.exports = router;
