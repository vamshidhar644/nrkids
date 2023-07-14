const mongoose = require('mongoose');
const Order = require('../models/ordersModel');

// GET all Order
const getOrders = async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(orders);
};

// get a single order
const getOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such order' });
  }
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: 'No such order' });
  }
  res.status(200).json(order);
};

// create new order
const createOrder = async (req, res) => {
  const { userId } = req.params;
  const { orderData } = req.body;

  const _id = orderData._id;
  const orderedName = orderData.orderedName;
  const orderedMobile = orderData.orderedMobile;
  const orderedEmail = orderData.orderedEmail;
  const orderedAddress = orderData.orderedAddress;
  const orderedLocality = orderData.orderedLocality;
  const orderedState = orderData.orderedState;
  const orderedPincode = orderData.orderedPincode;
  const orderedDate = orderData.orderedDate;
  const items = orderData.items;
  const status = orderData.status;
  const totalAmount = orderData.totalAmount;
  const shippingCost = orderData.shippingCost;

  // add doc to db
  try {
    const order = await Order.create(orderData);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such order' });
  }

  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    return res.id.status(404).json({ error: 'No such order' });
  }

  res.status(200).json(order);
};

// update a order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such order' });
  }

  const order = await Order.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!order) {
    return res.id.status(404).json({ error: 'No such order' });
  }

  res.status(200).json(order);
};

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  deleteOrder,
  updateOrder,
};
