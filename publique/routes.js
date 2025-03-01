const path = require('path');
const { logEvent, logAccess } = require('./logger');

function setupRoutes(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
    logAccess(req);
  });
}

module.exports = { setupRoutes };
