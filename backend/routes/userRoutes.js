const express = require('express');
const upload = require('../middleware/upload');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const User = require('../models/User');  // Assure-toi que le chemin vers le modèle est correct
const { protect } = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcrypt')
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect , getProfile);


router.put('/profile/picture', protect, upload.single('profileImage'), async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Trouver l'utilisateur via le token
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Mettre à jour le champ profileImage avec le chemin du fichier téléchargé
      user.profileImage = `/uploads/${req.file.filename}`; // Le chemin vers le fichier téléchargé dans le dossier 'uploads/'
  
      await user.save(); // Sauvegarder les modifications
  
      res.status(200).json({ message: 'Photo de profil mise à jour avec succès.', profileImage: user.profileImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo de profil' });
    }
  });


/*
  router.put('/profile/username', protect, async (req, res) => {
    try {
      const { username } = req.body; // Récupère le pseudo depuis le corps de la requête
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      if (!username || username.trim().length === 0) {
        return res.status(400).json({ message: 'Le pseudo ne peut pas être vide.' });
      }
  
      user.username = username; // Mettre à jour le pseudo
      await user.save();
  
      res.status(200).json({
        message: 'Pseudo mis à jour avec succès.',
        username: user.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du pseudo.' });
    }
  });
*/


  router.put("/profile/password", protect, async (req, res) => {
    try {
      const { password } = req.body;
      console.log("Requête reçue pour mise à jour du mot de passe", req.body);
  
      if (!password || password.trim().length < 12 || (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length < 2) {
        console.log("Mot de passe invalide :", password);
        return res.status(400).json({
          message: "Le mot de passe doit contenir au moins 12 caractères est 2 caractère spéciaux.",
        });
      }
  
      const user = await User.findById(req.user.id);
  
      if (!user) {
        console.log("Utilisateur non trouvé pour l'ID :", req.user.id);
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      console.log("Mot de passe hashé :", user.password);
  
      await user.save();
  
      res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
      console.error("Erreur serveur :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  });
  

module.exports = router;
