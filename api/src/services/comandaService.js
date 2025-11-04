// src/services/comandaService.js
const Comanda = require('../models/Comanda');

const createComanda = async (comandaData) => {
  const newComanda = new Comanda(comandaData);
  return await newComanda.save();
};

const getAllComandes = async () => {
  return await Comanda.find().populate('usuariId').populate('espases.espasaId'); // Populate per veure dades relacionades
};

const getComandaById = async (id) => {
  const comanda = await Comanda.findById(id).populate('usuariId').populate('espases.espasaId');
  if (!comanda) {
    throw new Error('Comanda no trobada');
  }
  return comanda;
};

const updateComanda = async (id, comandaData) => {
  const comanda = await Comanda.findByIdAndUpdate(
    id,
    comandaData,
    { new: true, runValidators: true }
  ).populate('usuariId').populate('espases.espasaId');
  if (!comanda) {
    throw new Error('Comanda no trobada');
  }
  return comanda;
};

const deleteComanda = async (id) => {
  const comanda = await Comanda.findByIdAndDelete(id);
  if (!comanda) {
    throw new Error('Comanda no trobada');
  }
  return comanda;
};

module.exports = {
  createComanda,
  getAllComandes,
  getComandaById,
  updateComanda,
  deleteComanda
};