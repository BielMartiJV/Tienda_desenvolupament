// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ─── Rutes públiques ─────────────────────────────────────────────────────────
router.post('/register', register);  // POST /api/auth/register
router.post('/login', login);        // POST /api/auth/login
router.post('/refresh', refresh);    // POST /api/auth/refresh
router.post('/logout', logout);      // POST /api/auth/logout

// ─── Exemple de ruta protegida (usuari autenticat) ──────────────────────────
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ status: 'success', message: 'Perfil accessible', user: req.user });
});

// ─── Exemple de ruta protegida amb RBAC (només admin) ───────────────────────
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ status: 'success', message: "Area d'administració accessible", user: req.user });
});

module.exports = router;
