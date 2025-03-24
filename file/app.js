const express = require('express');
const app = express()
const router = express.Router()
const http = require('http');
const server = http.createServer(app);
module.exports = {app, server, router}