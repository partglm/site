const express = require('express');
const http = require('http');
const { setupRoutes } = require('./file/routes');
const { EULA, PORT} = require('./file/config');
const {log} = require('./file/logger')
const {load} = require('./file/auth')

const app = express();
const server = http.createServer(app);

app.use(express.json());
setupRoutes(app);
new load

if (EULA) {
  server.listen(PORT, '0.0.0.0', () => {
  new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
} else {
  new log('EULA non acceptée. Serveur non démarré.');
}
