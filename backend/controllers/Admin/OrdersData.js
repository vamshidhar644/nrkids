const User = require('../../models/userModel');
const Orders = require('../../models/ordersModel');

// GET all orders
const changeStatus = async (req, res) => {
  const { userId, orderId } = req.params;
  const { status } = req.body;

  console.log(status);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order = user.orders.id(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  changeStatus,
};
