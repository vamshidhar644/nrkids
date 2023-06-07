const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// GET all items
const getCartItems = async (req, res) => {
  const cartitems = await Cart.find({}).sort({ createdAt: -1 });

  res.status(200).json(cartitems);
};

const Setcartitems = async (req, res) => {
  const { userId, quantity, size } = req.body;
  const { _id, price } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product exists for the user
    let product = await Cart.findById(_id);
    if (product) {
      // Check if the user already exists for the product
      const existingUser = product.users.find((user) => user.userId === userId);

      if (existingUser) {
        // Update the quantity of the existing user product
        existingUser.quantity = quantity;
        existingUser.size = size;
      } else {
        // Add a new User to the product
        product.users.push({ userId, quantity, size });
      }

      // Save the updated cart
      product = await product.save();

      res
        .status(200)
        .json({ message: 'User updated to products successfully', product });
    } else {
      // If the product doesn't exist, create a new product for the cart and add the user
      const newCart = new Cart({
        _id,
        price,
        users: [{ userId, quantity, size }],
      });

      await newCart.save();

      res
        .status(200)
        .json({ message: 'Product created successfully', cart: newCart });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Deletecartitems = async (req, res) => {
  const { userId, productId } = req.body;

  Cart.findByIdAndUpdate(
    productId,
    { $pull: { users: { userId: userId } } },
    { new: true }
  )
    .then((product) => {
      // Check if the nested document was successfully deleted
      if (!product) {
        return res
          .status(404)
          .json({ message: 'Parent or nested document not found' });
      }

      // Check if the length of nestedDocuments array is 0
      if (product.users.length === 0) {
        // Delete the parent document
        Cart.findByIdAndDelete(productId)
          .then(() => {
            res.status(200).json({ message: 'Parent document deleted' });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res.status(200).json({ message: 'Nested document deleted' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports = { getCartItems, Setcartitems, Deletecartitems };
