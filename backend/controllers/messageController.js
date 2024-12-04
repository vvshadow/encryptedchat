const Message = require('../models/Message');
const CryptoJS = require('crypto-js');

// Envoyer un message
exports.sendMessage = async (req, res) => {
  const { from, to, message } = req.body;

  try {
    // Chiffrer le message
    const encryptedMessage = CryptoJS.AES.encrypt(message, process.env.MESSAGE_SECRET).toString();

    // Sauvegarder le message
    const newMessage = new Message({ from, to, message: encryptedMessage });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les messages entre deux utilisateurs
exports.getMessages = async (req, res) => {
  const { from, to } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    });

    // Déchiffrer les messages
    const decryptedMessages = messages.map((msg) => {
      const decryptedMessage = CryptoJS.AES.decrypt(msg.message, process.env.MESSAGE_SECRET).toString(CryptoJS.enc.Utf8);
      return { ...msg._doc, message: decryptedMessage };
    });

    res.status(200).json(decryptedMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
