// src/services/stripeService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (items, successUrl, cancelUrl, customerEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
    });
    return session;
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw error;
  }
};

const verifyWebhookSignature = (payload, sig, endpointSecret) => {
  try {
    return stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    throw err;
  }
};

module.exports = {
  createCheckoutSession,
  verifyWebhookSignature,
};
