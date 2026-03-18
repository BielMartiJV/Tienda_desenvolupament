// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuari = require('../models/Usuari');

// ─── Helpers ───────────────────────────────────────────────────────────────
const generateAccessToken = (usuari) => {
  return jwt.sign(
    { id: usuari._id, email: usuari.email, role: usuari.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // Access token curt: 15 minuts
  );
};

const generateRefreshToken = (usuari) => {
  return jwt.sign(
    { id: usuari._id, email: usuari.email, role: usuari.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // Refresh token llarg: 7 dies
  );
};

// ─── POST /api/auth/register ────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { nom, cognom, email, password, role } = req.body;

    // 1. Verificar que l'email no existeixi ja
    const usuariExistent = await Usuari.findOne({ email });
    if (usuariExistent) {
      return res.status(400).json({ message: 'Ja existeix un usuari amb aquest email' });
    }

    // 2. Crear l'usuari (el pre-save del model fa el hash de la contrasenya)
    const nouUsuari = new Usuari({ nom, cognom, email, password, role });

    // 3. Generar tokens
    const accessToken = generateAccessToken(nouUsuari);
    const refreshToken = generateRefreshToken(nouUsuari);
    nouUsuari.refreshToken = refreshToken;

    await nouUsuari.save();

    // 4. Retornar tokens i info de l'usuari
    res.status(201).json({
      status: 'success',
      message: 'Usuari registrat correctament',
      data: {
        accessToken,
        refreshToken,
        usuari: {
          id: nouUsuari._id,
          nom: nouUsuari.nom,
          cognom: nouUsuari.cognom,
          email: nouUsuari.email,
          role: nouUsuari.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── POST /api/auth/login ───────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar l'usuari per email
    const usuari = await Usuari.findOne({ email });
    if (!usuari) {
      return res.status(401).json({ message: 'Credencials incorrectes' });
    }

    // 2. Comparar la contrasenya amb bcrypt
    const contrasenyaCorrecta = await bcrypt.compare(password, usuari.password);
    if (!contrasenyaCorrecta) {
      return res.status(401).json({ message: 'Credencials incorrectes' });
    }

    // 3. Generar tokens
    const accessToken = generateAccessToken(usuari);
    const refreshToken = generateRefreshToken(usuari);

    // 4. Guardar el refresh token a la BD (per poder invalidar-lo al logout)
    usuari.refreshToken = refreshToken;
    await usuari.save();

    // 5. Retornar tokens
    res.status(200).json({
      status: 'success',
      message: 'Login correcte',
      data: {
        accessToken,
        refreshToken,
        usuari: {
          id: usuari._id,
          nom: usuari.nom,
          cognom: usuari.cognom,
          email: usuari.email,
          role: usuari.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── POST /api/auth/refresh ─────────────────────────────────────────────────
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No s\'ha proporcionat el refresh token' });
    }

    // 1. Verificar el refresh token amb jwt.verify()
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Refresh token invàlid o expirat' });
    }

    // 2. Comprovar que el token coincideix amb el de la BD
    const usuari = await Usuari.findById(decoded.id);
    if (!usuari || usuari.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Refresh token no vàlid' });
    }

    // 3. Generar nou access token
    const newAccessToken = generateAccessToken(usuari);

    res.status(200).json({
      status: 'success',
      data: { accessToken: newAccessToken }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ─── POST /api/auth/logout ──────────────────────────────────────────────────
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'No s\'ha proporcionat el refresh token' });
    }

    // Eliminar el refresh token de la BD (invalida la sessió)
    const usuari = await Usuari.findOneAndUpdate(
      { refreshToken },
      { refreshToken: null },
      { new: true }
    );

    if (!usuari) {
      return res.status(404).json({ message: 'Token no trobat' });
    }

    res.status(200).json({ status: 'success', message: 'Sessió tancada correctament' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { register, login, refresh, logout };
