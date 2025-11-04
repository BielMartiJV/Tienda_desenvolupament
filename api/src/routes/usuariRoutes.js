// src/routes/usuariRoutes.js
const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/usuariController');

router.post('/', usuariController.createUsuari);
router.get('/', usuariController.getAllUsuaris);
router.get('/:id', usuariController.getUsuariById);
router.put('/:id', usuariController.updateUsuari);
router.delete('/:id', usuariController.deleteUsuari);

module.exports = router;