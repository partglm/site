const path = require('path');
const app = require('./app')
const router = require('./post')
const { log, logip } = require('./logger');

class get {
  constructor() {
    const app2 = app.app
    const prepath = path.join(__dirname, 'html/publique')

    app2.get('/', (req, res) => {
      res.sendFile(path.join(prepath, 'home.html'));
      logip(req);
    });

    app2.get('/conversation', (req, res) => {
      res.sendFile(path.join(prepath, 'register.html'))
      logip(req)
    })

    app2.use('/api', router)

    app2.use((req, res) => {
      res.status(404).sendFile('img/featured_404.jpg', { root: __dirname });
      new log('error 404 detected');
    })
    
}}
module.exports = {get}