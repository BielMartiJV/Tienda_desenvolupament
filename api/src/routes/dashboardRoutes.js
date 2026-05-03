// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  getUserDashboard,
  getAdminDashboard,
  canviarRolUsuari,
  eliminarUsuari,
} = require('../controllers/dashboardController');

// ─── Rutes de l'Usuari (rol: client) ────────────────────────────────────────
// GET /api/dashboard/user
router.get('/user', authMiddleware, roleMiddleware('client'), getUserDashboard);

// ─── Rutes de l'Admin (rol: admin) ──────────────────────────────────────────
// GET /api/dashboard/admin
router.get('/admin', authMiddleware, roleMiddleware('admin'), getAdminDashboard);

// PATCH /api/dashboard/admin/usuaris/:id/rol  → canvia el rol d'un usuari
router.patch('/admin/usuaris/:id/rol', authMiddleware, roleMiddleware('admin'), canviarRolUsuari);

// DELETE /api/dashboard/admin/usuaris/:id  → elimina un usuari
router.delete('/admin/usuaris/:id', authMiddleware, roleMiddleware('admin'), eliminarUsuari);

module.exports = router;
