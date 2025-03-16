const express = require('express');
const {EULA, PORT} = require('./file/config');
const {log} = require('./file/logger')
const {auth} = require('./file/auth')
const {app, server} = require('./file/app')
const {get} = require('./file/routes')
const SocketManager = require('./file/socket')
const post = require('./file/post')

app.use(express.json());
new auth().load()
new get()
new post()
const socketManager = new SocketManager(server);

if (EULA) {
  server.listen(PORT, '0.0.0.0', () => {
  new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
} else {
  throw new Error('EULA non acceptée. Serveur non démarré.');
}
