const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the cart
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

module.exports = mongoose.model('Orders', orderSchema);
