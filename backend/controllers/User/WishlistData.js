const User = require('../../models/userModel');

// GET all details
const getWishlist = async (req, res) => {
  const userId = req.params.id;

  console.log('Get wishlist data');

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

    res.json(data.wishlist);
  });
};

const addWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  console.log('Add item to Wishlist data');
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the PRODUCT already exists for the USER
    const product = user.wishlist.find((item) => item.productId === productId);

    if (product) {
      res.status({ message: 'Product already exists' });
    } else {
      user.wishlist.push({ productId });
    }

    // Save the updated cart
    await user.save();

    const wishlist = user.wishlist;

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteWishlist = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  // Find the user document by ID
  const user = await User.findById(userId);

  try {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the item exists in the wishlist
    const itemIndex = user.wishlist.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    // Remove the item from the wishlist array
    user.wishlist.splice(itemIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getWishlist,
  addWishlist,
  deleteWishlist,
};
