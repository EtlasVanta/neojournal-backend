// /controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Inscription d’un nouvel utilisateur
const register = async(req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Créer le nouvel utilisateur (le mot de passe sera hashé via le middleware Mongoose)
        const user = await User.create({ username, email, password });

        // Générer le token
        const token = generateToken(user._id);

        res.status(201).json({
            token,
            userId: user._id,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l’inscription.', error: error.message });
    }
};

// Connexion d’un utilisateur existant
const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
        }

        // Générer le token
        const token = generateToken(user._id);

        res.status(200).json({
            token,
            userId: user._id,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion.', error: error.message });
    }
};

module.exports = {
    register,
    login,
};