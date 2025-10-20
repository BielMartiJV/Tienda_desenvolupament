require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Connexió a la base de dades
connectDB();

// Ruta principal
app.get('/', (req, res) => {
  res.send('🚀 API E-commerce en marxa!');
});

// Rutes de productes
app.use('/api/products', productRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor escoltant al port ${PORT}`);
});