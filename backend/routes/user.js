const express = require('express');

// controller functions
const { signupUser, loginUser } = require('../controllers/userController');
const { updatePassword } = require('../controllers/User/ChangePassword');
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

// login / signup route
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Change Password
router.put('/:id/change-password', updatePassword);

// Cart Routes
router.get('/cart/:id', getCartData);
router.post('/cart/:id', addCart);
router.delete('/:userId/cart/:productId', deletecartitem);

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
