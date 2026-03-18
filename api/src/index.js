// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware per parsejar el body
app.use(express.json());
app.use(require('cors')());

// Connexió a la base de dades
connectDB();

// Ruta d'inici
app.get('/', (req, res) => res.send('API Ecommerce en marxa 🚀'));

// TEMPORARY SEED ROUTE
const Espada = require('./models/Espada');
const Usuari = require('./models/Usuari');
const bcrypt = require('bcrypt');

app.get('/seed', async (req, res) => {
    try {
        await Espada.deleteMany({});
        await Usuari.deleteMany({});

        const hashedPassword = await bcrypt.hash("theforce", 10);
        const user = await Usuari.create({
            nom: "Luke",
            cognom: "Skywalker",
            email: "luke@cedi.cat",
            password: hashedPassword // Manually hashed to avoid middleware issues if any
        });

        const swords = [
            { nom: "Espasa de Darth Vader", colorFulla: "vermell", preu: 299.99, estoc: 5, descripcio: "L'espasa làser icònica del Senyor Fosc dels Sith." },
            { nom: "Espasa de Luke Skywalker", colorFulla: "verd", preu: 349.99, estoc: 3, descripcio: "L'espasa llegendària del Jedi més poderós." },
            { nom: "Espasa d'Obi-Wan Kenobi", colorFulla: "blau", preu: 329.99, estoc: 7, descripcio: "L'arma elegant d'un temps més civilitzat." },
            { nom: "Espasa de Mace Windu", colorFulla: "porpra", preu: 399.99, estoc: 2, descripcio: "L'única espasa porpra del Consell Jedi." },
            { nom: "Espasa del Temple Jedi", colorFulla: "groc", preu: 279.99, estoc: 10, descripcio: "Espasa d'entrenament dels Guardians del Temple." },
            { nom: "Espasa de Kylo Ren", colorFulla: "vermell", preu: 379.99, estoc: 4, descripcio: "Disseny inestable amb guarda creuada." }
        ];

        await Espada.insertMany(swords);
        res.json({ message: "Seeding complete!", userId: user._id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// --- Importació de les Rutes ---
const authRoutes = require('./routes/authRoutes');       // Sessió 9: JWT Auth
const productRoutes = require('./routes/productRoutes');
const usuariRoutes = require('./routes/usuariRoutes');
const comandaRoutes = require('./routes/comandaRoutes');
const pagamentRoutes = require('./routes/pagamentRoutes');

// --- Muntatge de les Rutes amb prefixos ---
app.use('/api/auth', authRoutes);            // Ex: POST /api/auth/login
app.use('/api/products', productRoutes);      // Ex: GET /api/products/
app.use('/api/usuaris', usuariRoutes);        // Ex: GET /api/usuaris/
app.use('/api/comandes', comandaRoutes);      // Ex: GET /api/comandes/
app.use('/api/pagaments', pagamentRoutes);    // Ex: GET /api/pagaments/

// --- Inici del Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
