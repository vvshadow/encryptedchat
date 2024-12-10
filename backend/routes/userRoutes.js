const express = require('express');
const upload = require('../middleware/upload');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const User = require('../models/User');  // Assure-toi que le chemin vers le modèle est correct
const { protect } = require('../middleware/auth');
const router = express.Router();

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


module.exports = router;
