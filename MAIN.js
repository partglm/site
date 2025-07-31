const startback = require('../backend/MAIN.js')
const express = require('express');
const cors = require('cors')
const {EULA, PORT} = require('./file/config');
const {log} = require('./file/logger.js')
const {app, server} = require('./file/app')
const {get} = require('./file/routes');

startback()
app.use(express.json());
app.use(cors({origin: `localhost:${PORT}`, methods: 'POST'}));
new get()

if (process.argv.includes('--no-start')) return
if(EULA) {
  server.listen(PORT, '0.0.0.0', () => {
  new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
} else {
  throw new Error('EULA non acceptée. Serveur non démarré.');
}
