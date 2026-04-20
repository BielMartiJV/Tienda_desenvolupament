// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// Middleware per parsejar el body
// Middleware global
app.use(require('cors')());

// 1. Ruta del Webhook (HA D'ANAR ABANS de express.json)
const checkoutController = require('./controllers/checkoutController');
app.post('/api/checkout/webhook', express.raw({ type: 'application/json' }), checkoutController.handleWebhook);

// 2. Global JSON parsing (per a tota la resta)
app.use(express.json());

// 3. Altres rutes de Checkout (creació de sessió, etc.)
const checkoutRoutes = require('./routes/checkoutRoutes');
app.use('/api/checkout', checkoutRoutes);

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
app.use('/api/orders', comandaRoutes);        // Brief 4.2: POST /api/orders

// --- Swagger UI ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Accés a l'especificació JSON: GET /api-docs.json
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// --- Inici del Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
