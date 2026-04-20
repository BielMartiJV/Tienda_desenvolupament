// src/routes/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const protect = require('../middleware/authMiddleware');

// Route for creating the checkout session - Named as per brief 4.3
router.post('/create-session', protect, checkoutController.createCheckoutSession);

// Note: The webhook route remains directly in index.js for raw body handling
// app.post('/api/checkout/webhook', express.raw({ type: 'application/json' }), checkoutController.handleWebhook);

module.exports = router;
