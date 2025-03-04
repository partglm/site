const path = require('path');
const app = require('./app')
const { log, logip } = require('./logger');

class get {
  setup () {

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'home.html'));
      logip(req);
    });

  
}}
module.exports = {get}