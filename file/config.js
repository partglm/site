const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnvFile(filepath) {
  const full = path.resolve(filepath);
  if (!fs.existsSync(full)) throw new Error(`${full} missing`);
  return dotenv.parse(fs.readFileSync(full));
}
const backend = loadEnvFile('../backend/.back.env');

module.exports = {
  EULA: backend.EULA === 'true', // Convertir en booléen
  DEV_TOOLS: backend.DEV_TOOLS === 'true', // Convertir en booléen
  ADMIN_PANNEL: backend.ADMIN_PANNEL === 'true', // Convertir en booléen
  CONV_ADMIN: backend.CONV_ADMIN === 'true', // Convertir en booléen
  PORT: backend.PORT || 8080,
  ADMIN_USER: backend.ADMIN_USER,
  ADMIN_PASS: backend.ADMIN_PASS,
  TOOLS_TERMINAL: backend.TOOLS_TERMINAL === 'true'
};