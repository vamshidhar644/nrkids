const User = require('../../models/userModel');
const bcrypt = require('bcrypt');

// GET all details
const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { email, oldpassword, newpassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const passWord = user.password;

  const match = await bcrypt.compare(oldpassword, passWord);

  if (!match) {
    return res.status(404).json({ message: 'Incorrect password' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newpassword, salt);

  try {
    // Find the document by ID and update the specific field
    const updatedItem = await User.findByIdAndUpdate(
      id,
      { $set: { password: hash } },
      {
        new: true, // Return the updated document after the update
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return res.status(500).json({ message: 'Server error' });
  }
  return res.status(404).json({ hash });
};

module.exports = {
  updatePassword,
};
