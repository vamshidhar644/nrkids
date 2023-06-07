const express = require('express');

// controller functions
const {
  Setcartitems,
  Deletecartitems,
} = require('../controllers/cartController');

const router = express.Router();

// login route
router.post('/:userid', Setcartitems);

router.delete('/:userid', Deletecartitems);

module.exports = router;
