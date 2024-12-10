// backend/models/User.js
const mongoose = require('mongoose');

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now },

  profileImage: {
    type: String,
    required: false, },
}
);

// Modèle User
module.exports = mongoose.model('User', userSchema);
