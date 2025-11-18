// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/DB');

const app = express();

// Middleware per parsejar el body
app.use(express.json());

// Connexió a la base de dades
connectDB();

// Ruta d'inici
app.get('/', (req, res) => res.send('API Ecommerce en marxa 🚀'));

// --- Importació de les Rutes ---
const productRoutes = require('./src/routes/productRoutes'); // Espasa Laser
const usuariRoutes = require('./src/routes/usuariRoutes');
const comandaRoutes = require('./src/routes/comandaRoutes');
const pagamentRoutes = require('./src/routes/pagamentRoutes');

// --- Muntatge de les Rutes amb prefixos ---
app.use('/api/products', productRoutes);      // Ex: GET /api/products/
app.use('/api/usuaris', usuariRoutes);       // Ex: GET /api/usuaris/
app.use('/api/comandes', comandaRoutes);     // Ex: GET /api/comandes/
app.use('/api/pagaments', pagamentRoutes);   // Ex: GET /api/pagaments/

// --- Inici del Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
