// backend/models/entryModel.js
const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    summary: { type: String }, // ✅ Résumé IA
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;