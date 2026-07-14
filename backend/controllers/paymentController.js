// controllers/paymentController.js
const crypto = require('crypto');
const razorpayInstance = require('../config/razorpay');

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees, e.g. 250.50

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const order = await razorpayInstance.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: 'INR',
      receipt: `inox_receipt_${Date.now()}`,
    });

    return res.status(200).json(order);
  } catch (err) {
    console.error('createOrder error:', err);
    return res.status(500).json({ error: err.message || 'Order creation failed' });
  }
};

const verifyPayment = (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const body = order_id + '|' + payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const verified = expectedSignature === signature;
    return res.status(200).json({ verified });
  } catch (err) {
    console.error('verifyPayment error:', err);
    return res.status(500).json({ error: err.message || 'Verification failed' });
  }
};

module.exports = { createOrder, verifyPayment };