const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CREATE - POST /api/products
router.post('/', productController.createProduct);

// READ - GET /api/products (tots)
router.get('/', productController.getAllProducts);

// READ - GET /api/products/:id (un)
router.get('/:id', productController.getProductById);

// UPDATE - PUT /api/products/:id
router.put('/:id', productController.updateProduct);

// DELETE - DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;