// src/models/Usuari.js
const mongoose = require('mongoose');

const UsuariSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  cognom: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true, minlength: 6 }, // Considera hash aquí o al controlador
  dataRegistre: { type: Date, default: Date.now },
  actiu: { type: Boolean, default: true }
});

module.exports = mongoose.model('Usuari', UsuariSchema);