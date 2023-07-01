const express = require('express');

// controller functions
const { signupUser, loginUser } = require('../controllers/userController');
const {
  getCartData,
  addCart,
  deletecartitem,
} = require('../controllers/User/CartData');
const {
  getWishlist,
  addWishlist,
  deleteWishlist,
} = require('../controllers/User/WishlistData');
const { getUserData, updateUserData } = require('../controllers/User/userData');

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
router.get('/savelater/:id', getWishlist);

// add / update save later
router.post('/savelater/:id', addWishlist);

// delete item from cart
router.delete('/:userId/savelater/:productId', deleteWishlist);

//Update user data
router.put('/:id', updateUserData);

// get user data
router.get('/:id', getUserData);

module.exports = router;
