const path = require('path');
const {DEV_TOOLS, ADMIN_PANNEL}= require('./config')
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

    app2.get('/register', (req, res) => {
      res.sendFile(path.join(prepath, 'register.html'))
      logip(req)
    })

    app2.get('/conversation', (req,res) => {
      res.sendFile(path.join(prepath, 'conversation.html'))
    })

    app2.get('/admin', (req,res) => {
      if (!ADMIN_PANNEL) return
      res.sendFile(path.join(prepath, 'authAdmin.html'))
    })

    app2.get('/terminal', (req,res) => {
      if (!DEV_TOOLS) return
      res.sendFile(path.join(__dirname, 'html','private','dev.html'))
    })

    app2.get('/js/terminale', (req,res) => {
      if (!DEV_TOOLS) return
      res.sendFile(path.join(__dirname, 'html', 'private', 'dev.js'))
      new log('js terminal script send')
    })

    app2.use('/api', router)

    app2.use((req, res) => {
      res.status(404).sendFile('img/featured_404.jpg', { root: __dirname });
      new log('error 404 detected for ' + req.url);
    })
    
}}
module.exports = {get}