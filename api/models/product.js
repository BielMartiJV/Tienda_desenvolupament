const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nom del producte és obligatori'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripció és obligatòria']
  },
  price: {
    type: Number,
    required: [true, 'El preu és obligatori'],
    min: [0, 'El preu no pot ser negatiu']
  },
  stock: {
    type: Number,
    required: [true, 'L\'stock és obligatori'],
    min: [0, 'L\'stock no pot ser negatiu'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'La categoria és obligatòria']
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Afegeix createdAt i updatedAt automàticament
});

module.exports = mongoose.model('Product', productSchema);