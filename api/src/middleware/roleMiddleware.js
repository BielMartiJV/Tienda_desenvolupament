// src/middleware/roleMiddleware.js

// Retorna un middleware que comprova si req.user té un dels rols permesos
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accés prohibit: no tens permís per accedir a aquest recurs' });
    }
    next();
  };
};
