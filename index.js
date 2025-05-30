// /index.js
require('./loadEnv'); // Charge .env dès le début

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const journalRoutes = require('./routes/journalRoutes');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

// CORS configuré pour autoriser le frontend Vercel à communiquer avec le backend
app.use(cors({
    origin: 'https://neojournal-frontend.vercel.app', // remplace par ton URL frontend exacte
    credentials: true, // autorise les cookies et headers d’authentification
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});