const express = require('express');
const cors = require('cors')
const {EULA, PORT} = require('./file/config');
const {log} = require('./file/logger')
const {auth} = require('./file/auth')
const {app, server} = require('./file/app')
const {get} = require('./file/routes')
const SocketManager = require('./file/socket')

app.use(express.json());
app.use(cors({origin: `localhost:${PORT}`}));
new auth().load()
new get()
const socketManager = new SocketManager(server);

if (EULA) {
  server.listen(PORT, '0.0.0.0', () => {
  new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
} else {
  throw new Error('EULA non acceptée. Serveur non démarré.');
}
