const Razorpay = require('razorpay');

exports.handler = async (event) => {
  try {
    const { amount, currency } = JSON.parse(event.body);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: currency,
      receipt: 'receipt_' + Date.now(),
    });
    return {
      statusCode: 200,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(order),
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: err.message})
    };
  }
};
