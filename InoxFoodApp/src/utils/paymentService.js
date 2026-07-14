// src/utils/paymentService.js
import RazorpayCheckout from 'react-native-razorpay';
import Config from 'react-native-config';

const BACKEND_URL = Config.BACKEND_URL;
const RAZORPAY_KEY_ID = Config.RAZORPAY_KEY_ID;

export const payWithRazorpay = async ({ cartTotal, customerName, customerEmail, customerPhone }) => {
  // 1. Create order on backend
  const orderRes = await fetch(`${BACKEND_URL}/api/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: cartTotal }),
  });

  if (!orderRes.ok) {
    throw new Error('Failed to create order');
  }
  const order = await orderRes.json();

  // 2. Open Razorpay checkout
  const options = {
    description: 'INOX F&B Order',
    currency: 'INR',
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    order_id: order.id,
    name: 'INOX Cinemas',
    prefill: {
      name: customerName || 'Guest',
      email: customerEmail || 'guest@example.com',
      contact: customerPhone || '9999999999',
    },
    theme: { color: '#E71E25' },
  };

  const paymentData = await RazorpayCheckout.open(options);
  // paymentData: { razorpay_payment_id, razorpay_order_id, razorpay_signature }

  // 3. Verify on backend
  const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: paymentData.razorpay_order_id,
      payment_id: paymentData.razorpay_payment_id,
      signature: paymentData.razorpay_signature,
    }),
  });
  const verifyData = await verifyRes.json();

  if (!verifyData.verified) {
    throw new Error('Payment verification failed');
  }

  return {
    success: true,
    paymentId: paymentData.razorpay_payment_id,
    orderId: paymentData.razorpay_order_id,
  };
};