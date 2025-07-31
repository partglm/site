const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnvFile(filepath) {
  const full = path.resolve(filepath);
  if (!fs.existsSync(full)) throw new Error(`${full} missing`);
  return dotenv.parse(fs.readFileSync(full));
}
const frontendConfig = loadEnvFile('.front.env');

module.exports = {
  EULA: frontendConfig.EULA === 'true',
  PORT: frontendConfig.PORT || 8080,
};