const express = require('express');

// controller functions
const { signupUser, loginUser } = require('../controllers/userController');

const { updatePassword } = require('../controllers/User/ChangePassword');

const { getUserData, updateUserData } = require('../controllers/User/userData');

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

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// login / signup route
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Change Password
router.get('/:id', requireAuth, getUserData);
router.put('/:id/change-password', requireAuth, updatePassword);

// Update Personal Information
router.put('/:id', requireAuth, updateUserData);

// Cart Routes
router.get('/cart/:id', requireAuth, getCartData);
router.post('/cart/:id', requireAuth, addCart);
router.delete('/:userId/cart/:productId', requireAuth, deletecartitem);

// Wishlist Routes
router.get('/wishlist/:id', requireAuth, getWishlist);
router.post('/wishlist/add', requireAuth, addWishlist);
router.delete('/:userId/wishlist/:productId', requireAuth, deleteWishlist);

// Address Routes
router.get('/address/:id', requireAuth, getAddressData);
router.post('/address/:aId', requireAuth, updateAddressData);
router.delete('/:userId/address/:addressId', requireAuth, deleteAddressData);

module.exports = router;
