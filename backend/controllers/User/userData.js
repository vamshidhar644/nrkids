const User = require('../../models/userModel');
// Get User data
const getUserData = async (req, res) => {
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

    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const dob = data.dob;
    const displayPic = data.displayPic;

    const userData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      displayPic,
    };

    res.json(userData);
  });
};

// Update user Data
const updateUserData = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber, dob, displayPic } = req.body;

  // console.log(displayPic);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, phoneNumber, dob, displayPic },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserData, updateUserData };
