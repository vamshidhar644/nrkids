const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the cart

const adminSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  productName: { type: String },
  price: { type: Number },
  cartItems: [
    {
      userId: String,
      quantity: Number,
      size: String,
    },
  ],
  wishlist: [{ userId: String }],
});

module.exports = mongoose.model('Admin', adminSchema);
