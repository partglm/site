const fs = require('fs');
const path = require('path')
const {table} = require('console')

class log {
  constructor(input) {
    this.input = input

    logEvent(this.input)
    return this.input
  }
}

class logChat extends log {
  constructor (message, who) {
    super(`${message} send by ${who}`)
    
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}]: ${message} send by ${who}`;
    fs.appendFileSync(path.join(__dirname, 'data/chat.txt'), `${logEntry}\n`, 'utf8');
  }
}

class logTable {
  constructor(input) {
    this.input = input

    
    if (process.argv.includes('--no-log'))  return
    console.table(this.input)
    return this.input
  }
}



function logEvent(message) {
  if (process.argv.includes('--no-log'))  return

  if(typeof message == 'object') {
    message = JSON.stringify(message)
  }
  if(typeof message == 'array') {
    message = Array.toString(message)
  }

  const timestamp = new Date().toLocaleString();
  const logEntry = `[${timestamp}]: ${message}`;
  fs.appendFileSync(path.join(__dirname, 'data/data.txt'), `${logEntry}\n`, 'utf8');
  console.log(logEntry);
}

function logip(req) {
  const clientIp = req.socket.remoteAddress;
  logEvent(`Accès depuis ${clientIp} à ${req.path}`);
}

module.exports = { log, logip, logTable, logChat };
