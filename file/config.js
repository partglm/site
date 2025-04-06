require('dotenv').config(); // Charge le fichier .env

module.exports = {
  EULA: process.env.EULA === 'true', // Convertir en booléen
  PORT: process.env.PORT || 8080,
  ADMIN_USER: process.env.ADMIN_USER,
  ADMIN_PASS: process.env.ADMIN_PASS,
  ADMIN_ID: process.env.ADMIN_ID
};
