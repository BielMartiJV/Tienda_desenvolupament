// src/models/Usuari.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Importa bcrypt

const UsuariSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  cognom: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true, minlength: 6 }, // La contrasenya es xifrarà abans de guardar
  dataRegistre: { type: Date, default: Date.now },
  actiu: { type: Boolean, default: true }
});

// Middleware de Mongoose per aplicar hash a la contrasenya abans de guardar
UsuariSchema.pre('save', async function (next) {
  // 'this' fa referència al document que s'està guardant/modificant
  // Aquest codi només s'executa si el camp 'password' ha estat modificat o és nou
  if (!this.isModified('password')) {
    return next(); // Si no s'ha canviat la contrasenya, passa al següent middleware
  }

  try {
    // Genera el salt i aplica el hash
    const saltRounds = 10; // Nombre de rondes per generar el salt (10 és el recomanat)
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword; // Reemplaça la contrasenya original pel seu hash
    next(); // Continua amb el procés de guardat
  } catch (error) {
    next(error); // Captura i propaga qualsevol error durant el hash
  }
});

// Exporta el model
module.exports = mongoose.model('Usuari', UsuariSchema);