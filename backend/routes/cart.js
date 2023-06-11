const express = require('express');

// controller functions
const {
  Setcartitems,
  Deletecartitems,
  getCartItems,
} = require('../controllers/cartController');

const router = express.Router();

// get cart items
router.get('/', getCartItems);

// login route
router.post('/:userid', Setcartitems);

router.delete('/:userid', Deletecartitems);



module.exports = router;
