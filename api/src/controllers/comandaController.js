// src/controllers/ComandaController.js
const comandaService = require('../services/comandaService');

const createComanda = async (req, res) => {
  try {
    const Comanda = await ComandaService.createComanda(req.body);
    res.status(201).json({ status: 'success', data: Comanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getAllComandas = async (req, res) => {
  try {
    const Comandas = await ComandaService.getAllComandas();
    res.status(200).json({ status: 'success', results: Comandas.length, data: Comandas });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getComandaById = async (req, res) => {
  try {
    const Comanda = await ComandaService.getComandaById(req.params.id);
    res.status(200).json({ status: 'success', data: Comanda });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const updateComanda = async (req, res) => {
  try {
    const Comanda = await ComandaService.updateComanda(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: Comanda });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteComanda = async (req, res) => {
  try {
    await ComandaService.deleteComanda(req.params.id);
    res.status(200).json({ status: 'success', message: 'Comanda esborrat correctament' });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createComanda,
  getAllComandas,
  getComandaById,
  updateComanda,
  deleteComanda
};