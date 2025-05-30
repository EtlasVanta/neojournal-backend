// /controllers/journalController.js

const JournalEntry = require('../models/JournalEntry');

// Créer une entrée
const createEntry = async(req, res) => {
    try {
        const { title, content } = req.body;

        const newEntry = await JournalEntry.create({
            title,
            content,
            userId: req.user.id,
        });

        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l’entrée.', error: error.message });
    }
};

// Récupérer les entrées de l'utilisateur
const getEntries = async(req, res) => {
    try {
        const entries = await JournalEntry.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des entrées.', error: error.message });
    }
};

// Mettre à jour une entrée
const updateEntry = async(req, res) => {
    try {
        const entry = await JournalEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entrée non trouvée.' });
        }

        if (entry.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        const oldTitle = entry.title;
        const oldContent = entry.content;

        entry.title = req.body.title || entry.title;
        entry.content = req.body.content || entry.content;

        if (req.body.title !== oldTitle || req.body.content !== oldContent) {
            entry.summary = "";
        }

        const updatedEntry = await entry.save();
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l’entrée.', error: error.message });
    }
};

// Supprimer une entrée
const deleteEntry = async(req, res) => {
    try {
        const entry = await JournalEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ message: 'Entrée non trouvée.' });
        }

        if (entry.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Accès refusé.' });
        }

        await entry.deleteOne(); // ✅ remplacement ici
        res.status(200).json({ message: 'Entrée supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l’entrée.', error: error.message });
    }
};


module.exports = {
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry,
};