// src/routes/PagamentRoutes.js
const express = require('express');
const router = express.Router();
const PagamentController = require('../controllers/pagamentController');

router.post('/', PagamentController.createPagament);
router.get('/', PagamentController.getAllPagaments);
router.get('/:id', PagamentController.getPagamentById);
router.put('/:id', PagamentController.updatePagament);
router.delete('/:id', PagamentController.deletePagament);

module.exports = router;