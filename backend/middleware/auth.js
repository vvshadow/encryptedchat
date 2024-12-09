// Dans auth.js (middleware)
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le token des headers

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token avec la clé secrète
    req.user = decoded; // Ajoute les infos utilisateur au `req`
    next();
  } catch (error) {
    res.status(401).json({ message: 'Non autorisé, token invalide.' });
  }
};

module.exports = { protect };

