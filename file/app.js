const express = require('express');
const app = express()
const http = require('http');
const server = http.createServer(app);
module.exports = {app, server, express}