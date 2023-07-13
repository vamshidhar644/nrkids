const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the cart
const orderSchema = new Schema({
  _id: String,
  userId: String,
  orderedName: String,
  orderedMobile: String,
  orderedEmail: String,
  orderedAddress: String,
  orderedLocality: String,
  orderedState: String,
  orderedPincode: String,
  orderedDate: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      productId: String,
      price: Number,
      quantity: Number,
      size: String,
    },
  ],
  status: String,
  totalAmount: Number,
  shippingCost: Number,
});

module.exports = mongoose.model('Orders', orderSchema);
