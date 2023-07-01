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
    const _id = user.id;

    res.status(200).json({ _id, firstName, lastName, email, token });
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

  console.log('Get Cart data');

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
  const { itemsData } = req.body;

  // console.log(productId, itemsData);

  const userId = itemsData.userId;
  const quantity = itemsData.quantity;
  const price = itemsData.price;
  const size = itemsData.size;

  // console.log(productId, itemsData);
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
      console.log('not found');
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

    const cartItem = user.cartItems;

    res.status(200).json({ cartItem });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletecartitem = async (req, res) => {
  const { userId, productId } = req.params;

  console.log('Delete item from cart');

  User.updateOne(
    { _id: userId },
    { $pull: { cartItems: { productId: productId } } }
  )
    .then(() => {
      res.status(200).json({ message: 'Item deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Failed to delete item' });
    });
};

// GET all details
const getSavelater = async (req, res) => {
  const userId = req.params.id;

  console.log('Get Save later data');

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

    res.json(data.saveforLater);
  });
};

const addSavelater = async (req, res) => {
  const productId = req.params.id;
  const { itemsData } = req.body;

  console.log('Add item to save later data');

  const userId = itemsData.userId;
  const quantity = itemsData.quantity;
  const price = itemsData.price;
  const size = itemsData.size;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the PRODUCT already exists for the USER
    const product = user.saveforLater.find(
      (item) => item.productId === productId
    );

    if (product) {
      // Update the details of the existing product
      product.quantity = quantity;
      product.size = size;
      product.price = price;
    } else {
      // Add a new User to the product

      user.saveforLater.push({ productId, quantity, size, price });
    }

    // Save the updated cart
    await user.save();

    const saveforLater = user.saveforLater;

    res.status(200).json({ saveforLater });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSavelater = async (req, res) => {
  const { userId, productId } = req.params;

  console.log('Delete from save later');

  User.updateOne(
    { _id: userId },
    { $pull: { saveforLater: { productId: productId } } }
  )
    .then(() => {
      res.status(200).json({ message: 'Item deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Failed to delete item' });
    });
};

module.exports = {
  signupUser,
  loginUser,
  getCartData,
  addCart,
  deletecartitem,
  getSavelater,
  addSavelater,
  deleteSavelater,
};
