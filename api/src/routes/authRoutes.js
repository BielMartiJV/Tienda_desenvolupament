// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ─── Rutes publiques ─────────────────────────────────────────────────────────

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints d'autenticació i gestió de sessió
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nou usuari
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, cognom, email, password]
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Luke
 *               cognom:
 *                 type: string
 *                 example: Skywalker
 *               email:
 *                 type: string
 *                 format: email
 *                 example: luke@cedi.cat
 *               password:
 *                 type: string
 *                 format: password
 *                 example: theforce
 *     responses:
 *       201:
 *         description: Usuari creat correctament
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Dades invàlides o email ja registrat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error intern del servidor
 */
router.post('/register', register);  // POST /api/auth/register

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sessió i retorna tokens JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: luke@cedi.cat
 *               password:
 *                 type: string
 *                 format: password
 *                 example: theforce
 *     responses:
 *       200:
 *         description: Login correcte. Retorna accessToken i refreshToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       401:
 *         description: Credencials invàlides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error intern del servidor
 */
router.post('/login', login);        // POST /api/auth/login

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Obté un nou accessToken a partir del refreshToken
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Nou accessToken generat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: RefreshToken invàlid o expirat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/refresh', refresh);    // POST /api/auth/refresh

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Tanca la sessió i invalida el refreshToken
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Logout correcte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Sessió tancada correctament
 *       401:
 *         description: No autoritzat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/logout', logout);      // POST /api/auth/logout

// ─── Exemple de ruta protegida (usuari autenticat) ──────────────────────────

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Retorna el perfil de l'usuari autenticat
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil de l'usuari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Perfil accessible
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token invàlid o absent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ status: 'success', message: 'Perfil accessible', user: req.user });
});

// ─── Exemple de ruta protegida amb RBAC (només admin) ───────────────────────

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Àrea d'administració (només rol admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accés concedit a l'àrea d'administració
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Area d'administració accessible
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token invàlid o absent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Accés denegat (no és admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ status: 'success', message: "Area d'administració accessible", user: req.user });
});

module.exports = router;
