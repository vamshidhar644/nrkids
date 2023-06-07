const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the cart
const cartSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  users: [
    {
      userId: String,
      quantity: Number,
      size: String,
    },
  ],
});

module.exports = mongoose.model('Cart_Items', cartSchema);
