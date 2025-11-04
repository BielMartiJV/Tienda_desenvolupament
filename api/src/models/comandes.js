// src/models/Comanda.js
const mongoose = require('mongoose');

const ComandaSchema = new mongoose.Schema({
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  dataComanda: { type: Date, default: Date.now },
  estat: { type: String, enum: ['pendent', 'processant', 'enviat', 'entregat', 'cancel·lat'], default: 'pendent' },
  total: { type: Number, required: true, min: 0 },
  espases: [
    {
      espasaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Espada', required: true },
      quantitat: { type: Number, required: true, min: 1 }
    }
  ]
});

module.exports = mongoose.model('Comanda', ComandaSchema);