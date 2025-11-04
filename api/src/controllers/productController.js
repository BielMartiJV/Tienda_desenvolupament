const productService = require('../services/productService');

// CREATE - Crear producte
const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ 
      status: 'success', 
      data: product 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// GET - Obtenir tots els productes
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ 
      status: 'success', 
      results: products.length,
      data: products 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// GET - Obtenir un producte per ID
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ 
      status: 'success', 
      data: product 
    });
  } catch (error) {
    res.status(404).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// UPDATE - Actualitzar producte
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ 
      status: 'success', 
      data: product 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

// DELETE - Esborrar producte
const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ 
      status: 'success', 
      message: 'Producte esborrat correctament' 
    });
  } catch (error) {
    res.status(404).json({ 
      status: 'error', 
      message: error.message 
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};