const fs = require('fs');

class log {
  constructor(input) {
    this.input = input
  }
  logger() {
    console.log(this.input)
    return this.input
  }
}



function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFileSync('log.txt', logEntry, 'utf8');
  console.log(logEntry);
}

function logip(req) {
  const clientIp = req.socket.remoteAddress;
  logEvent(`Accès depuis ${clientIp} à ${req.path}`);
}

module.exports = { log, logip };
