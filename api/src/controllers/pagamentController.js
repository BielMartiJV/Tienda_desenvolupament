// src/controllers/PagamentController.js
const PagamentService = require('../services/pagamentService');

const createPagament = async (req, res) => {
  try {
    const Pagament = await PagamentService.createPagament(req.body);
    res.status(201).json({ status: 'success', data: Pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getAllPagaments = async (req, res) => {
  try {
    const Pagaments = await PagamentService.getAllPagaments();
    res.status(200).json({ status: 'success', results: Pagaments.length, data: Pagaments });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getPagamentById = async (req, res) => {
  try {
    const Pagament = await PagamentService.getPagamentById(req.params.id);
    res.status(200).json({ status: 'success', data: Pagament });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const updatePagament = async (req, res) => {
  try {
    const Pagament = await PagamentService.updatePagament(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: Pagament });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deletePagament = async (req, res) => {
  try {
    await PagamentService.deletePagament(req.params.id);
    res.status(200).json({ status: 'success', message: 'Pagament esborrat correctament' });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createPagament,
  getAllPagaments,
  getPagamentById,
  updatePagament,
  deletePagament
};