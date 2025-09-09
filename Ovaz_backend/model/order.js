const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  paymentDetails: {
    method: String,
    card: {
      name: String,
      last4: String,
      expiry: String
    },
    upiId: String
  },
  total: Number,
  user: {
    name: String,
    email: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
