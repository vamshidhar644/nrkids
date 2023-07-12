const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: String,
  userId: String,
  orderedName: String,
  orderedMobile: String,
  orderdEmail: String,
  orderedAddress: String,
  oderedLocality: String,
  orderedState: String,
  orderedPincode: String,
  orderDate: Date,
  items: [
    {
      productId: String,
      productName: String,
      price: Number,
      quantity: Number,
      size: String,
    },
  ],
  status: String,
  totalAmount: Number,
  shippingCost: Number,
});

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayPic: { type: String },
  phoneNumber: { type: String },
  dob: { type: Date },
  addresses: [
    {
      aId: { type: String, required: true },
      fullname: { type: String, required: true },
      mobile: { type: String, required: true },
      fullAddress: { type: String, required: true },
      landmark: { type: String, required: true },
      email: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  ],
  cartItems: [
    {
      productId: String,
      price: Number,
      quantity: Number,
      size: String,
    },
  ],
  orders: [orderSchema],
  wishlist: [{ productId: String }],
});

// static signup method
userSchema.statics.signup = async function (
  _id,
  firstName,
  lastName,
  email,
  password,
  displayPic
) {
  // validation
  if (!_id) {
    throw Error('Id is required');
  }
  if (!email) {
    throw Error('Email is required');
  }
  if (!password) {
    throw Error('Password is required');
  }
  if (!firstName) {
    throw Error('Firstname is required');
  }
  if (!lastName) {
    throw Error('Lastname is required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password in not strong enough');
  // }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    _id,
    firstName,
    lastName,
    email,
    password: hash,
    displayPic,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // authentication
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('User does not exists');
  }
  const firstName = user.firstName;
  const lastName = user.lastName;
  const passWord = user.password;
  const id = user._id;

  const match = await bcrypt.compare(password, passWord);

  if (!match) {
    throw Error('Incorrect password');
  }
  const userDetails = { id, firstName, lastName, email, passWord };
  return userDetails;
};

module.exports = mongoose.model('User', userSchema);
