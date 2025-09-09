const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

router.post('/pay', async (req, res) => {
  try {
    const { userId, method, amount, cardDetails, upiId } = req.body;

    const maskedCardNumber = cardDetails?.cardNumber
      ? `**** **** **** ${cardDetails.cardNumber.slice(-4)}`
      : undefined;

    const payment = new Payment({
      userId,
      method,
      amount,
      cardDetails: cardDetails ? {
        cardName: cardDetails.cardName,
        maskedCardNumber,
        expiryDate: cardDetails.expiryDate
      } : undefined,
      upiId
    });

    await payment.save();
    res.status(201).json({ message: 'Payment saved successfully.' });
  } catch (err) {
    console.error('Payment save error:', err);
    res.status(500).json({ message: 'Error processing payment.' });
  }
});

module.exports = router;
