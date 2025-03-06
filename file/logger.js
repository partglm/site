const fs = require('fs');
const path = require('path')

class log {
  constructor(input) {
    this.input = input

    console.log(this.input)
    return this.input
  }
}



function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}`;
  fs.appendFileSync(path.join(__dirname, 'data/data.txt'), `${logEntry}\n`, 'utf8');
  console.log(logEntry);
}

function logip(req) {
  const clientIp = req.socket.remoteAddress;
  logEvent(`Accès depuis ${clientIp} à ${req.path}`);
}

module.exports = { log, logip };
