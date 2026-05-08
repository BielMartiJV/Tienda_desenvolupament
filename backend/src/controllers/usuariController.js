// src/controllers/usuariController.js
const usuariService = require('../services/usuariService');

// --- CRUD EXISTENT ---
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
// --- Fi CRUD EXISTENT ---

// --- FUNCIONALITAT NOVA: REGISTRE I LOGIN (Sessió 7) ---
const registrarUsuari = async (req, res) => {
  try {
    // 1. Crida al servei per registrar l'usuari
    const resultat = await usuariService.registrarUsuari(req.body);
    // 2. Retorna un token i info de l'usuari
    res.status(201).json({
      status: 'success',
      message: 'Usuari registrat correctament',
      data: {
        token: resultat.token,
        usuari: resultat.usuari
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const loginUsuari = async (req, res) => {
  try {
    // 1. Crida al servei per fer login
    const resultat = await usuariService.loginUsuari(req.body);
    // 2. Retorna un token i info de l'usuari
    res.status(200).json({
      status: 'success',
      message: 'Login correcte',
      data: {
        token: resultat.token,
        usuari: resultat.usuari
      }
    });
  } catch (error) {
    // 401 Unauthorized per credencials incorrectes
    res.status(401).json({ status: 'error', message: error.message });
  }
};
// --- Fi FUNCIONALITAT NOVA ---

// Exporta TOTS els mètodes, tant els antics com els nous
module.exports = {
  createUsuari,
  getAllUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari,
  // Afegeix els nous:
  registrarUsuari,
  loginUsuari
};