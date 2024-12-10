const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });

    // Hash du mdp & img de profil par defaut
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultProfileImage = "https://via.placeholder.com/150";
    // Créer un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword, createdAt: new Date(), profileImage: defaultProfileImage });
    await newUser.save();

    res.status(201).json({ message: 'enregistré c kre' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect.' });

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récup du profil
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Accède à l'ID de l'utilisateur à partir du token
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

