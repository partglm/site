const path = require('path');
const { logAccess } = require('./logger');

function setupRoutes(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
    logAccess(req);
  });

  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
    logAccess(req);
  });

  app.get('/kick', (req, res) => {
    res.sendFile(path.join(__dirname, 'kick.html'));
    logAccess(req);
  });

  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
    logAccess(req);
  });

  app.use((req, res) => {
    res.status(404).sendFile('featured_404.jpg', { root: __dirname });
    console.log('Erreur 404 détectée');
  });
}

module.exports = { setupRoutes };
