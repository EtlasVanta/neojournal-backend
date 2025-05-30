// utils/aiService.js

//require('dotenv').config(); // ✅ AJOUT OBLIGATOIRE EN PREMIÈRE LIGNE

console.log("🔍 Clé IA détectée :", process.env.GEMINI_API_KEY);

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAISummary(content) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
Tu es un assistant IA. Résume le texte suivant en 3 phrases claires et concises. Voici le texte :
""" 
${content} 
"""`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response || typeof response.text !== 'function') {
            console.error("Réponse IA invalide :", response);
            throw new Error("Réponse IA invalide.");
        }

        const text = response.text();
        return text.trim();

    } catch (error) {
        console.error("Erreur dans generateAISummary :", error);
        throw new Error("Impossible de générer un résumé IA.");
    }
}

module.exports = { generateAISummary };