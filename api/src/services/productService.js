const Product = require('../models/product');

// CREATE - Crear un nou producte
const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

// GET - Obtenir tots els productes
const getAllProducts = async () => {
  return await Product.find();
};

// GET - Obtenir un producte per ID
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Producte no trobat');
  }
  return product;
};

// UPDATE - Actualitzar un producte
const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    productData,
    { new: true, runValidators: true } // Retorna el producte actualitzat i valida
  );
  if (!product) {
    throw new Error('Producte no trobat');
  }
  return product;
};

// DELETE - Esborrar un producte
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Producte no trobat');
  }
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};