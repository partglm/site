const startback = require('../backend/MAIN.js')
const express = require('express');
const cors = require('cors')
const {EULA, PORT} = require('./file/config');
const {log} = require('./file/logger.js')
const {app, server} = require('./file/app')
const {get} = require('./file/routes');
const cookieParser = require('cookie-parser')
const proxyFetchMiddleware = require('./file/proxy.js');
const SocketFront = require('./file/socket.js');

startback()
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: `localhost:${PORT}`, methods: 'POST'}));
app.use(proxyFetchMiddleware);
new get()
new SocketFront()

if (process.argv.includes('--no-start')) return
if(EULA) {
  server.listen(PORT, '0.0.0.0', () => {

  if (process.argv.includes('--no-log')) console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  else new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);

  });
} else {
  throw new Error('EULA non acceptée. Serveur non démarré.');
}
