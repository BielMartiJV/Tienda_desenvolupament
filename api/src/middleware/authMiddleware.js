// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Llegim el token de la capçalera Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accés denegat: no s\'ha proporcionat cap token' });
  }

  // 2. Verifiquem el token amb jwt.verify()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Afegim el payload descodificat a req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invàlid o expirat' });
  }
};

module.exports = authMiddleware;
