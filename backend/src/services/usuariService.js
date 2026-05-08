// src/services/usuariService.js
const Usuari = require('../models/Usuari');
const bcrypt = require('bcrypt'); // Importa bcrypt
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken
require('dotenv').config(); // Carrega les variables d'entorn

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_si_no_te_definida'; // Defineix la clau secreta

// --- CRUD EXISTENT ---
const createUsuari = async (usuariData) => {
  const newUsuari = new Usuari(usuariData);
  return await newUsuari.save();
};

const getAllUsuaris = async () => {
  return await Usuari.find();
};

const getUsuariById = async (id) => {
  const usuari = await Usuari.findById(id);
  if (!usuari) {
    throw new Error('Usuari no trobat');
  }
  return usuari;
};

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

const deleteUsuari = async (id) => {
  const usuari = await Usuari.findByIdAndDelete(id);
  if (!usuari) {
    throw new Error('Usuari no trobat');
  }
  return usuari;
};
// --- Fi CRUD EXISTENT ---

// --- FUNCIONALITAT NOVA: REGISTRE I LOGIN (Sessió 7) ---

const registrarUsuari = async (usuariData) => {
  const { email, password } = usuariData;

  // 1. Comprova si l'usuari ja existeix
  const usuariExistent = await Usuari.findOne({ email });
  if (usuariExistent) {
    throw new Error('Ja existeix un usuari amb aquest email.');
  }

  // 2. Crea el nou usuari. El middleware de 'save' al model Usuari ja fa el hash de la contrasenya.
  const nouUsuari = new Usuari(usuariData);
  const usuariDesat = await nouUsuari.save();

  // 3. Genera el token JWT
  const token = jwt.sign(
    { id: usuariDesat._id, email: usuariDesat.email }, // Payload
    JWT_SECRET, // Clau secreta
    { expiresIn: '1h' } // Opcional: temps d'expiració
  );

  // 4. Retorna token i info de l'usuari (excepte la contrasenya)
  return {
    token,
    usuari: {
      id: usuariDesat._id,
      nom: usuariDesat.nom,
      cognom: usuariDesat.cognom,
      email: usuariDesat.email
      // No retornis la contrasenya mai
    }
  };
};

const loginUsuari = async ({ email, password }) => {
  // 1. Busca l'usuari per email
  const usuari = await Usuari.findOne({ email });
  if (!usuari) {
    // Per seguretat, no revelis si l'email no existeix o la contrasenya és incorrecta
    throw new Error('Credencials incorrectes');
  }

  // 2. Compara la contrasenya proporcionada amb el hash de la base de dades
  const contrasenyaCorrecta = await bcrypt.compare(password, usuari.password);
  if (!contrasenyaCorrecta) {
    throw new Error('Credencials incorrectes');
  }

  // 3. Si és correcte, genera el token JWT
  const token = jwt.sign(
    { id: usuari._id, email: usuari.email }, // Payload
    JWT_SECRET, // Clau secreta
    { expiresIn: '1h' } // Opcional: temps d'expiració
  );

  // 4. Retorna token i info de l'usuari (excepte la contrasenya)
  return {
    token,
    usuari: {
      id: usuari._id,
      nom: usuari.nom,
      cognom: usuari.cognom,
      email: usuari.email
      // No retornis la contrasenya mai
    }
  };
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