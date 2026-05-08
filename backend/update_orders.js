require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Comanda = require('./src/models/Comanda');

const updatePending = async () => {
    await connectDB();
    const result = await Comanda.updateMany({ estat: 'pending' }, { estat: 'paid' });
    console.log(`Comandes actualitzades: ${result.modifiedCount}`);
    process.exit(0);
};

updatePending();
