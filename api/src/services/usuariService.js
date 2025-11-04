// src/services/usuariService.js
const Usuari = require('../models/Usuari');

// CREATE
const createUsuari = async (usuariData) => {
  const newUsuari = new Usuari(usuariData);
  return await newUsuari.save();
};

// READ - Tots
const getAllUsuaris = async () => {
  return await Usuari.find();
};

// READ - Per ID
const getUsuariById = async (id) => {
  const usuari = await Usuari.findById(id);
  if (!usuari) {
    throw new Error('Usuari no trobat');
  }
  return usuari;
};

// UPDATE
const updateUsuari = async (id, usuariData) => {
  const usuari = await Usuari.findByIdAndUpdate(
    id,
    usuariData,
    { new: true, runValidators: true }
  );
  if (!usuari) {
    throw new Error('Usuari no trobat');
  }
  return usuari;
};

// DELETE
const deleteUsuari = async (id) => {
  const usuari = await Usuari.findByIdAndDelete(id);
  if (!usuari) {
    throw new Error('Usuari no trobat');
  }
  return usuari;
};

module.exports = {
  createUsuari,
  getAllUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari
};