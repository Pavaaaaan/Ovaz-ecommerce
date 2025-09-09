const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: String,
  method: String, // 'card', 'paypal', 'upi'
  amount: Number,
  cardDetails: {
    cardName: String,
    maskedCardNumber: String,
    expiryDate: String,
  },
  upiId: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
