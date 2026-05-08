// src/services/pagamentService.js
const Pagament = require('../models/pagament');

const createPagament = async (pagamentData) => {
  const newPagament = new Pagament(pagamentData);
  return await newPagament.save();
};

const getAllPagaments = async () => {
  return await Pagament.find().populate('comandaId').populate('usuariId');
};

const getPagamentById = async (id) => {
  const pagament = await Pagament.findById(id).populate('comandaId').populate('usuariId');
  if (!pagament) {
    throw new Error('Pagament no trobat');
  }
  return pagament;
};

const updatePagament = async (id, pagamentData) => {
  const pagament = await Pagament.findByIdAndUpdate(
    id,
    pagamentData,
    { new: true, runValidators: true }
  ).populate('comandaId').populate('usuariId');
  if (!pagament) {
    throw new Error('Pagament no trobat');
  }
  return pagament;
};

const deletePagament = async (id) => {
  const pagament = await Pagament.findByIdAndDelete(id);
  if (!pagament) {
    throw new Error('Pagament no trobat');
  }
  return pagament;
};

module.exports = {
  createPagament,
  getAllPagaments,
  getPagamentById,
  updatePagament,
  deletePagament
};