require('dotenv').config();
const mongoose = require('mongoose');
const Espada = require('./src/models/Espada');
const Usuari = require('./src/models/Usuari');
const connectDB = require('./src/config/db');

const seedData = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing data
        await Espada.deleteMany({});
        await Usuari.deleteMany({});
        console.log('Cleared existing data');

        // Create Default User
        const user = await Usuari.create({
            nom: "Luke",
            cognom: "Skywalker",
            email: "luke@cedi.cat",
            password: "theforce"
        });
        console.log('User created:', user._id);

        // Create Swords
        const swords = [
            {
                nom: "Espasa de Darth Vader",
                colorFulla: "vermell",
                preu: 299.99,
                estoc: 5,
                descripcio: "L'espasa làser icònica del Senyor Fosc dels Sith. Cristall Kyber sagnós."
            },
            {
                nom: "Espasa de Luke Skywalker",
                colorFulla: "verd",
                preu: 349.99,
                estoc: 3,
                descripcio: "L'espasa llegendària del Jedi més poderós. Construïda a Tatooine."
            },
            {
                nom: "Espasa d'Obi-Wan Kenobi",
                colorFulla: "blau",
                preu: 329.99,
                estoc: 7,
                descripcio: "L'arma elegant d'un temps més civilitzat. Herència Jedi."
            },
            {
                nom: "Espasa de Mace Windu",
                colorFulla: "porpra",
                preu: 399.99,
                estoc: 2,
                descripcio: "L'única espasa porpra del Consell Jedi. Vapaad Master."
            },
            {
                nom: "Espasa del Temple Jedi",
                colorFulla: "groc",
                preu: 279.99,
                estoc: 10,
                descripcio: "Espasa d'entrenament dels Guardians del Temple."
            },
            {
                nom: "Espasa de Kylo Ren",
                colorFulla: "vermell",
                preu: 379.99,
                estoc: 4,
                descripcio: "Disseny inestable amb guarda creuada. Cristall esquinçat."
            }
        ];

        await Espada.insertMany(swords);
        console.log('Swords seeded');

        console.log('SEEDING COMPLETE. Use this User ID in frontend:', user._id);
        process.exit(0);

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
