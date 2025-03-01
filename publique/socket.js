const { logEvent } = require('./logger');

function setupSocket(io) {
  io.on('connection', (socket) => {
    logEvent('Client connecté');

    socket.on('message', (data) => {
      logEvent(`Message reçu: ${data}`);
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      logEvent('Client déconnecté');
    });
  });
}

module.exports = { setupSocket };
