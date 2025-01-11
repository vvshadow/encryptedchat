const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

// Initialisation de l'application
const app = express();

// Configuration de CORS
const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://zaydencryptedchat.vercel.app/' // Remplacez par l'URL de votre site en production
  : 'http://localhost:3000'; // URL du frontend en développement local

// Middleware
app.use(cors({
  origin: allowedOrigin, // Ajoutez la configuration pour les origines autorisées
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si vous avez des cookies ou des sessions
}));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/friends', require('./routes/friends'));

// Gestion des routes inexistantes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
