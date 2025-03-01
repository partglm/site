const fs = require('fs');

function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync('log.txt', logEntry, 'utf8');
  console.log(logEntry);
}

function logAccess(req) {
  const clientIp = req.socket.remoteAddress;
  logEvent(`Accès depuis ${clientIp} à ${req.path}`);
}

module.exports = { logEvent, logAccess };
