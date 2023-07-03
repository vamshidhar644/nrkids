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
  getAddressData,
  updateAddressData,
  deleteAddressData,
} = require('../controllers/User/AddressData');

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
router.get('/:id', getUserData);
router.put('/:id/change-password', updatePassword);

// Update Personal Information
router.put('/:id', updateUserData);

// Cart Routes
router.get('/cart/:id', getCartData);
router.post('/cart/:id', addCart);
router.delete('/:userId/cart/:productId', deletecartitem);

// Wishlist Routes
router.get('/wishlist/:id', getWishlist);
router.post('/wishlist/add', addWishlist);
router.delete('/:userId/wishlist/:productId', deleteWishlist);

// Address Routes
router.get('/address/:id', getAddressData);
router.post('/address/:aId', updateAddressData);
router.delete('/:userId/address/:addressId', deleteAddressData);

module.exports = router;
