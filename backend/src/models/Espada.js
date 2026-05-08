// src/models/Espada.js
const mongoose = require('mongoose');

const EspadaSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  colorFulla: {
    type: String,
    enum: ['vermell', 'blau', 'verd', 'groc', 'porpra'],
    required: true
  },
  preu: { type: Number, required: true, min: 0, max: 9999 },
  estoc: { type: Number, required: true, min: 0 },
  descripcio: { type: String }
});

module.exports = mongoose.model('Espada', EspadaSchema);
