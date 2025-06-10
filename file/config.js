require('dotenv').config(); // Charge le fichier .env

module.exports = {
  EULA: process.env.EULA === 'true', // Convertir en booléen
  DEV_TOOLS: process.env.DEV_TOOLS === 'true', // Convertir en booléen
  ADMIN_PANNEL: process.env.ADMIN_PANNEL === 'true', // Convertir en booléen
  PORT: process.env.PORT || 8080,
  ADMIN_USER: process.env.ADMIN_USER,
  ADMIN_PASS: process.env.ADMIN_PASS,
  ADMIN_ID: process.env.ADMIN_ID,
  TOOLS_TERMINAL: process.env.TOOLS_TERMINAL === 'true'
};
