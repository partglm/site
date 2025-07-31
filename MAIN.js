function startback () {

  const express = require('express');
  const cors = require('cors')
  const cookieParser = require('cookie-parser')
  const {EULA, PORT} = require('./file/config');
  const {log} = require('./file/logger')
  const {auth} = require('./file/auth')
  const {app, server} = require('./file/app')
  const post = require('./file/post');

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({origin: `localhost:8080`, methods: 'POST'}));
  new auth().load()
  new post()

  if (process.argv.includes('--no-start')) return
  if(EULA) {
    server.listen(PORT, '0.0.0.0', () => {
    new log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
  } else {
    throw new Error('EULA non acceptée. Serveur non démarré.');
  }

}
//startback()

module.exports = startback