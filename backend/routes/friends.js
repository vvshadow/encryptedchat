const express = require('express');
const router = express.Router();
const Friend = require('../models/Friend'); // Assurez-vous d'importer le modèle Friend
const User = require('../models/User'); // Assurez-vous d'importer le modèle User si nécessaire

// Récupérer les amis acceptés
// router.post('/accept', async (req, res) => {
//   const { userId, friendId } = req.body;

//   try {
//     // Trouvez et mettez à jour le statut de la relation
//     const friendRequest = await Friend.findOneAndUpdate(
//       { userId: friendId, friendId: userId, status: 'pending' },
//       { status: 'accepted' },
//       { new: true }
//     );

//     if (!friendRequest) {
//       return res.status(404).json({ message: 'Demande introuvable.' });
//     }

//     res.status(200).json({ message: 'Demande acceptée avec succès.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erreur lors de l’acceptation de la demande.' });
//   }
// });

router.get("/accepted", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "userId est requis." });
  }

  try {
    const friends = await Friend.find({ userId, status: "accepted" }).populate("friendId", "username email");
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});




router.post('/add', async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    // Vérifiez si une relation existe déjà
    const existingFriend = await Friend.findOne({ userId, friendId });
    if (existingFriend) {
      return res.status(400).json({ message: 'Demande déjà envoyée ou utilisateur déjà ami.' });
    }

    // Créez une demande d'ami
    const friendRequest = new Friend({ userId, friendId, status: 'pending' });
    await friendRequest.save();

    res.status(200).json({ message: 'Demande d’ami envoyée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l’envoi de la demande.' });
  }
});




// Récupérer les demandes d'amis en attente
// routes/friends.js
router.get('/pending', async (req, res) => {
  try {
    const userId = req.user.id; // ID de l'utilisateur depuis la session ou le token JWT
    console.log("userId: ", userId); // Débogage

    const pendingRequests = await Friend.find({ userId, status: 'pending' });
    
    console.log("pendingRequests: ", pendingRequests); // Débogage

    res.json(pendingRequests);
  } catch (err) {
    console.error('Erreur lors de la récupération des demandes en attente:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des demandes en attente' });
  }
});




module.exports = router;
