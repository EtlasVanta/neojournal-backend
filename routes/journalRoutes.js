// /routes/journalRoutes.js

const express = require('express');
const router = express.Router();
const {
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry,
} = require('../controllers/journalController');
const { protect } = require('../middlewares/authMiddleware');
const { generateAISummary } = require("../utils/aiService");
const JournalEntry = require('../models/JournalEntry'); // ✅ Ton vrai modèle


// Routes protégées pour les entrées du journal
router.post('/', protect, createEntry);
router.get('/', protect, getEntries);
router.put('/:id', protect, updateEntry);
router.delete('/:id', protect, deleteEntry);

// ✅ Nouvelle route résumé IA
router.post("/:id/generate-summary", protect, async(req, res) => {
    try {
        const entry = await JournalEntry.findOne({ _id: req.params.id, userId: req.user.id });

        if (!entry) {
            return res.status(404).json({ success: false, message: "Entrée introuvable." });
        }

        if (typeof entry.summary === 'string' && entry.summary.trim().length > 0) {
            return res.json({ success: true, summary: entry.summary });
        }


        const summary = await generateAISummary(entry.content);

        entry.summary = summary;
        await entry.save();

        res.json({ success: true, summary });
    } catch (err) {
        console.error("Erreur backend résumé IA :", err);
        res.status(500).json({ success: false, message: "Erreur serveur." });
    }
});


module.exports = router;
// ✅ Ajout essentiel : Import du modèle Entry pour la nouvelle route résumé IA