const express = require('express');
const app = express()
const http = require('http');
const server = http.createServer(app);
const SocketManager = require('./socket')
const socketManager = new SocketManager(server);
module.exports = {app, server, express, socketManager}