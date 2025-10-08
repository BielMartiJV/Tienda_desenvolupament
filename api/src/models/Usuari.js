// src/models/Usuari.js
const mongoose = require('mongoose');

const usuariSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  correu: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'El correu no té un format vàlid']
  },
  contrasenya: { type: String, required: true, minlength: 6 },
  rol: { type: String, enum: ['client', 'admin'], default: 'client' }
});

module.exports = mongoose.model('Usuari', usuariSchema);
