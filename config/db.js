// /config/db.js

const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);


        console.log(`🟢 MongoDB connecté : ${conn.connection.host}`);
    } catch (error) {
        console.error('🔴 Erreur de connexion à MongoDB :', error.message);
        process.exit(1); // Arrête le processus avec une erreur
    }
};

module.exports = connectDB;