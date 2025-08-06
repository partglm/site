const { Server } = require('socket.io');
const { io: ClientIO } = require('socket.io-client');
const {server} = require('./app');
const { log } = require('./logger');

const ioFrontend = new Server(server);

// Frontend se connecte au backend comme client
class SocketFront {
constructor() {
        const backendSocket = ClientIO('http://127.0.0.1:8081');

        backendSocket.on('connect', () => {
          new log("frontend websocket connecté au backend")
        });
    
        backendSocket.on('isThisYou?', (data) => {
          ioFrontend.emit('isThisYou?', data);
        });

        backendSocket.on('relaod', (data) => {
          ioFrontend.emit('reload', data)
        })

        backendSocket.on('thisyoudelete', (data) => {
          ioFrontend.emit('thisyoudelete', data);
        });
    }
}

module.exports = SocketFront