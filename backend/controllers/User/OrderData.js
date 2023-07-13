const User = require('../../models/userModel');
const Orders = require('../../models/ordersModel');

// GET all orders
const getOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and populate the 'orders' field
    const user = await User.findById(userId).populate('orders');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = user.orders;
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
};

const addOrder = async (req, res) => {
  const { userId } = req.params;
  const { orderData } = req.body;

  const _id = orderData._id;
  const orderedName = orderData.orderedName;
  const orderedMobile = orderData.orderedMobile;
  const orderedEmail = orderData.orderdEmail;
  const orderedAddress = orderData.orderedAddress;
  const orderedLocality = orderData.orderedLocality;
  const orderedState = orderData.orderedState;
  const orderedPincode = orderData.orderedPincode;
  const orderedDate = orderData.orderedDate;
  const items = orderData.items;
  const status = orderData.status;
  const totalAmount = orderData.totalAmount;
  const shippingCost = orderData.shippingCost;

  console.log(orderedDate);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.orders.push(orderData);
    await user.save();

    Orders.create(orderData);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error inserting order:', error);
    res.status(500).json({ error: 'Failed to insert order' });
  }
};

module.exports = {
  getOrders,
  addOrder,
};
