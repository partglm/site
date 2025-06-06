const express = require('express');
const app = express()

const http = require('http');
const server = http.createServer(app);

const SocketManager = require('./socket')
const socketManager = new SocketManager(server);

const terminalCLass = require('./dockerTerminal')
const terminal = new terminalCLass()

module.exports = {app, server, express, socketManager, terminal}