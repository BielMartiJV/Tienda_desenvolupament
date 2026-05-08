// src/models/Comanda.js
const mongoose = require('mongoose');

const ComandaSchema = new mongoose.Schema({
  usuariId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuari', required: true },
  dataComanda: { type: Date, default: Date.now },
  estat: { 
    type: String, 
    enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  total: { type: Number, required: true, min: 0 },
  stripeSessionId: { type: String },
  
  // Dades d'enviament
  enviament: {
    nom: { type: String },
    adreca: { type: String },
    ciutat: { type: String },
    codiPostal: { type: String },
    pais: { type: String, default: 'Espanya' }
  },

  espases: [
    {
      espasaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Espada', required: true },
      quantitat: { type: Number, required: true, min: 1 }
    }
  ]
});

module.exports = mongoose.model('Comanda', ComandaSchema);