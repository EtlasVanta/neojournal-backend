// backend/loadEnv.js
const dotenv = require('dotenv');
const result = dotenv.config();

console.log("📦 .env chargé ?", !result.error);
if (process.env.NODE_ENV !== 'production') {
    console.log("🔑 Clé IA GEMINI chargée :", !!process.env.GEMINI_API_KEY);
}