// src/controllers/checkoutController.js
const stripeService = require('../services/stripeService');
const Comanda = require('../models/Comanda');
const Espada = require('../models/Espada');

const createCheckoutSession = async (req, res) => {
  try {
    const { cart, shippingData, success_url, cancel_url } = req.body;
    const user = req.user;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ status: 'error', message: 'La cistella està buida.' });
    }

    // 1. Validate Products, Prices and Stock from DB
    const line_items = [];
    let orderTotal = 0;

    for (const item of cart) {
      const dbProduct = await Espada.findById(item.id || item.espasaId);
      
      if (!dbProduct) {
        return res.status(404).json({ status: 'error', message: `Producte ${item.nom} no trobat.` });
      }

      if (dbProduct.estoc < item.quantity) {
        return res.status(400).json({ status: 'error', message: `Stock insuficient per ${dbProduct.nom}. Disponible: ${dbProduct.estoc}` });
      }

      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: dbProduct.nom,
            description: dbProduct.descripcio,
          },
          unit_amount: Math.round(dbProduct.preu * 100), // Use DB price, not frontend price
        },
        quantity: item.quantity,
      });

      orderTotal += dbProduct.preu * item.quantity;
    }

    // Add shipping cost (Brief says resum comanda should include shipping, usually)
    const shippingCost = 5.50;
    line_items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Cost d\'enviament',
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });
    orderTotal += shippingCost;

    // 2. Create the session
    const session = await stripeService.createCheckoutSession(
      line_items,
      success_url,
      cancel_url,
      user.email
    );

    // 3. Create the order in "pending" status
    const comanda = await Comanda.create({
      usuariId: user.id,
      total: orderTotal,
      stripeSessionId: session.id,
      estat: 'pending',
      enviament: shippingData, // Store shipping data
      espases: cart.map(item => ({
        espasaId: item.id || item.espasaId,
        quantitat: item.quantity
      }))
    });

    // Return session id as per brief 4.3
    res.status(200).json({ status: 'success', sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeService.verifyWebhookSignature(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Update order status to "paid"
      const comanda = await Comanda.findOneAndUpdate(
        { stripeSessionId: session.id },
        { estat: 'paid' },
        { new: true }
      );

      if (comanda) {
        console.log(`Comanda ${comanda._id} marcada com PAID.`);
        
        // Update stock
        for (const item of comanda.espases) {
          await Espada.findByIdAndUpdate(item.espasaId, {
            $inc: { estoc: -item.quantitat }
          });
        }
      }
    } catch (error) {
      console.error('Error fulfilling order in webhook:', error);
      // We don't return error here to avoid Stripe retrying if we already "received" it
    }
  }

  res.status(200).json({ received: true });
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
};
