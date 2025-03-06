const express = require('express');
const http = require('http');
const { EULA, PORT} = require('./file/config');
const {log} = require('./file/logger')
const {auth} = require('./file/auth')
const {app} = require('./file/app')
const {get} = require('./file/routes')

const server = http.createServer(app);
app.use(express.json());
new auth().load()
new get()

if (EULA) {
  server.listen(PORT, '0.0.0.0', () => {
  new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
} else {
  new Error('EULA non acceptée. Serveur non démarré.');
}
