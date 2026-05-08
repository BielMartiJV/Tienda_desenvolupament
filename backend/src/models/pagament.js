// src/models/Pagament.js
const mongoose = require('mongoose');

const PagamentSchema = new mongoose.Schema({
  comandaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comanda', required: true },
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  dataPagament: { type: Date, default: Date.now },
  estat: { type: String, enum: ['pendent', 'realitzat', 'fallit', 'reemborsat'], default: 'pendent' },
  import: { type: Number, required: true, min: 0 },
  metode: { type: String, enum: ['targeta', 'paypal', 'transferencia'], required: true }
});

module.exports = mongoose.model('Pagament', PagamentSchema);