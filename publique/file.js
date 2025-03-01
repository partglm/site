const fs = require('fs');
const path = require('path');

function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur de lecture ${filePath}:`, error);
    return {};
  }
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Données sauvegardées dans ${filePath}`);
  } catch (error) {
    console.error(`Erreur d'écriture ${filePath}:`, error);
  }
}

module.exports = { readJsonFile, writeJsonFile };
