const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the cart
const cartSchema = new mongoose.Schema({
  productId: String,
  price: Number,
  users: [
    {
      userId: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Cart_Items', cartSchema);
