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

    res.status(200).json({ firstName, lastName, email, token });
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

const cartfunction = async (req, res) => {
  const newData = req.body;

  try {
    const existingData = await User.findOne({
      /* Query to find existing data */
    });

    if (existingData) {
      // Update the existing data
      existingData.field1 = newData.field1;
      existingData.field2 = newData.field2;
      // ... Update other fields as needed

      await existingData.save();

      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      // Create a new data object
      const newDataObject = new DataModel({
        field1: newData.field1,
        field2: newData.field2,
        // ... Set other fields as needed
      });

      await newDataObject.save();

      res.status(201).json({ message: 'New data added successfully' });
    }
  } catch (error) {
    console.error('Error updating or adding data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signupUser, loginUser, cartfunction };
