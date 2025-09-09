const express = require('express');
const router = express.Router();
const Order = require('../model/order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { cart, paymentDetails, total, user } = req.body;

    if (!user?.name || !user?.email) {
      return res.status(400).json({ error: "User information is missing" });
    }

    const newOrder = new Order({
      cart,
      paymentDetails,
      total,
      user
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('❌ Order save failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get orders by user email
// Get orders by user email
router.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  console.log("Looking for orders of:", email);

  try {
    const orders = await Order.find({ "user.email": email });

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this email" });
    }

    console.log("✅ Orders found:", orders); // Move it here
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
});


module.exports = router;
