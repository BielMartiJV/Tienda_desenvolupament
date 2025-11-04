// src/controllers/usuariController.js
const usuariService = require('../services/usuariService');

const createUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.createUsuari(req.body);
    res.status(201).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getAllUsuaris = async (req, res) => {
  try {
    const usuaris = await usuariService.getAllUsuaris();
    res.status(200).json({ status: 'success', results: usuaris.length, data: usuaris });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getUsuariById = async (req, res) => {
  try {
    const usuari = await usuariService.getUsuariById(req.params.id);
    res.status(200).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const updateUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.updateUsuari(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: usuari });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteUsuari = async (req, res) => {
  try {
    await usuariService.deleteUsuari(req.params.id);
    res.status(200).json({ status: 'success', message: 'Usuari esborrat correctament' });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createUsuari,
  getAllUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari
};