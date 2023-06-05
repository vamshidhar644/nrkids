const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const cartitems = async (req, res) => {
  const { userId } = req.body;
  const { productId, quantity, price } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product exists for the user
    let product = await Cart.findOne({ productId });
    if (product) {
      // Check if the user already exists for the product
      const existingUser = product.users.find((user) => user.userId === userId);

      if (existingUser) {
        // Update the quantity of the existing user product
        existingUser.quantity = quantity;
      } else {
        // Add a new User to the product
        product.users.push({ userId, quantity });
      }

      // Save the updated cart
      product = await product.save();

      res
        .status(200)
        .json({ message: 'User updated to products successfully', product });
    } else {
      // If the product doesn't exist, create a new product for the cart and add the user
      const newCart = new Cart({
        productId,
        price,
        users: [{ userId, quantity }],
      });

      await newCart.save();

      res
        .status(201)
        .json({ message: 'Product created successfully', cart: newCart });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { cartitems };
