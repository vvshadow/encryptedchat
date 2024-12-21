const Friend = require('../models/Friend');

// Envoi d'une demande d'ami
const sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    const newRequest = new Friend({
      userId,
      friendId,
      status: 'pending',
    });

    await newRequest.save();
    res.status(200).json({ message: 'Demande d\'ami envoyée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de la demande d\'ami.' });
  }
};

// Accepter une demande d'ami
const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const request = await Friend.findOne({ userId, friendId, status: 'pending' });
    if (!request) return res.status(404).json({ message: 'Demande non trouvée ou déjà traitée.' });

    request.status = 'accepted';
    await request.save();
    res.status(200).json({ message: 'Demande d\'ami acceptée.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'acceptation de la demande d\'ami.' });
  }
};

// Refuser une demande d'ami
const rejectFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const request = await Friend.findOne({ userId, friendId, status: 'pending' });
    if (!request) return res.status(404).json({ message: 'Demande non trouvée.' });

    await request.delete();
    res.status(200).json({ message: 'Demande d\'ami refusée.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du refus de la demande d\'ami.' });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
