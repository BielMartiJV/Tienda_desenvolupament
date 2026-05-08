// src/routes/usuariRoutes.js
const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

// Rutes per a CRUD bàsic (ja existents)
router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getAllUsuaris);
router.get('/:id', usuariController.getUsuariById);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

// Rutes per a Registre i Login (noves per a la Sessió 7)
router.post('/registrar', usuariController.registrarUsuari);
router.post('/login', usuariController.loginUsuari);

module.exports = router;