const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { setupRoutes } = require('./publique/routes');
const { setupSocket } = require('./publique/socket');
const { EULA, PORT } = require('./publique/config');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

// Configuration des routes
setupRoutes(app);

// Configuration de Socket.IO
setupSocket(io);

// Lancement du serveur
if (EULA) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  });
} else {
  console.log('EULA non acceptée. Serveur non démarré.');
}
