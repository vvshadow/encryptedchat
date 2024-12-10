const multer = require('multer');
const path = require('path');

// Définir l'extension et la destination du fichier téléchargé
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Définir le répertoire de stockage des images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Vérifier le type de fichier (uniquement des images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier doit être une image (JPEG, PNG, JPG).'), false);
  }
};

// Création du middleware pour l'upload
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille à 5MB
  fileFilter
});

module.exports = upload;
