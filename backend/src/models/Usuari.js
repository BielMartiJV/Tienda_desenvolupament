// src/models/Usuari.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcryptjs (compatible amb la pràctica)

const UsuariSchema = new mongoose.Schema({
  nom:          { type: String, required: true },
  cognom:       { type: String, required: true },
  email:        { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password:     { type: String, required: true, minlength: 6 },
  role:         { type: String, enum: ['client', 'admin'], default: 'client' }, // RBAC
  refreshToken: { type: String, default: null }, // per a logout i refresc
  dataRegistre: { type: Date, default: Date.now },
  actiu:        { type: Boolean, default: true }
});

// Middleware de Mongoose: hash de la contrasenya abans de guardar
UsuariSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Usuari', UsuariSchema);