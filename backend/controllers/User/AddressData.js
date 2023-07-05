const User = require('../../models/userModel');
const mongoose = require('mongoose');
// Get Address
const getAddressData = async (req, res) => {
  const userId = req.params.id;

  console.log('Get Address data');

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

    res.json(data.addresses);
  });
};

// Update Address
const updateAddressData = async (req, res) => {
  const aId = req.params.aId;
  const {
    userId,
    fullname,
    mobile,
    email,
    fullAddress,
    landmark,
    state,
    pincode,
  } = req.body;

  // console.log(productId, itemsData);
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('aId: ', aId);
    // Check if the PRODUCT already exists for the USER
    const address = user.addresses.find((item) => item.aId === aId);
    if (address) {
      // Update the details of the existing product
      address.fullname = fullname;
      address.mobile = mobile;
      address.email = email;
      address.fullAddress = fullAddress;
      address.landmark = landmark;
      address.state = state;
      address.pincode = pincode;
    } else {
      // Add a new User to the product
      user.addresses.push({
        aId,
        fullname,
        mobile,
        email,
        fullAddress,
        landmark,
        state,
        pincode,
      });
    }

    // Save the updated cart
    await user.save();

    const addressess = user.addresses;

    res.status(200).json({ addressess });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Address
const deleteAddressData = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true } // To get the updated document after deletion
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getAddressData, updateAddressData, deleteAddressData };
