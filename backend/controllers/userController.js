const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token 
    const token = createToken(user._id);

    const firstName = user.firstName;
    const lastName = user.lastName;
    const id = user.id;

    res.status(200).json({ id, firstName, lastName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};

// signup user
const signupUser = async (req, res) => {
  const { _id, firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(_id, firstName, lastName, email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ _id, firstName, lastName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all details
const getCartData = async (req, res) => {
  const userId = req.params.id;

  User.findOne({ _id: userId }, (err, data) => {
    if (err) {
      console.error('Error retrieving document:', err);
      res
        .status(500)
        .json({ error: 'An error occurred while retrieving the document' });
      return;
    }

    if (!data) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    res.json(data.cartItems);
  });
};

const addCart = async (req, res) => {
  const productId = req.params.id;
  const { userId, quantity, size, price } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the PRODUCT already exists for the USER
    const product = user.cartItems.find((item) => item.productId === productId);

    if (product) { 
      // Update the details of the existing product
      product.quantity = quantity; 
      product.size = size;  
      product.price = price; 
    } else {
      // Add a new User to the product
      user.cartItems.push({ productId, quantity, size, price });
    }

    // Save the updated cart
    await user.save();

    res
      .status(200)
      .json({ message: 'Product updated to user successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletecartitem = async (req, res) => {
  const { userId, productId } = req.body;

  User.updateOne(
    { _id: userId },
    { $pull: { cartItems: { productId: productId } } }
  )
    .then((result) => {
      if (result.modifiedCount === 1) {
        res.sendStatus(204); // Success, no content
      } else {
        res.sendStatus(404); // Item not found
      }
    })
    .catch((err) => {
      console.error('Error deleting item from cart', err);
      res.sendStatus(500); // Internal Server Error
    });
};

module.exports = {
  signupUser,
  loginUser,
  getCartData,
  addCart,
  deletecartitem,
};
