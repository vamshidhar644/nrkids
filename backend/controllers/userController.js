const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw Error('User does not exists');
    }

    // create a token
    const token = createToken(user._id);
    const _id = user.id;

    res.status(200).json({ _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { _id, firstName, lastName, email, password, displayPic } = req.body;

  try {
    const user = await User.signup(
      _id,
      firstName,
      lastName,
      email,
      password,
      displayPic
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
