// src/routes/ComandaRoutes.js
const express = require('express');
const router = express.Router();
const ComandaController = require('../controllers/comandaController');

router.post('/', ComandaController.createComanda);
router.get('/', ComandaController.getAllComandas);
router.get('/:id', ComandaController.getComandaById);
router.put('/:id', ComandaController.updateComanda);
router.delete('/:id', ComandaController.deleteComanda);

module.exports = router;