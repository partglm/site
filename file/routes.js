const path = require('path');
const {DEV_TOOLS, ADMIN_PANNEL}= require('./config')
const app = require('./app')
const router = require('./post')
const { log, logip } = require('./logger');
const ADMIN = require('./admin');


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
      logip(req);
    })

    app2.get('/admin', (req,res) => {
      new log(req.cookies)
      if (!ADMIN_PANNEL || ADMIN.oneSessionIDauth(req.cookies.oneSessionID) !== true) return
      res.sendFile(path.join(prepath, 'authAdmin.html'))
      logip(req);
    })

    app2.get('/terminal', (req,res) => {
      if (!ADMIN_PANNEL || ADMIN.oneSessionIDauth(req.cookies.oneSessionID) !== true) return
      if (!DEV_TOOLS) return res.status(403)
      res.sendFile(path.join(__dirname, 'html','private','terminal.html'))
      logip(req);
    })

    app2.get('/js/terminale', (req,res) => {
      if (!ADMIN_PANNEL || ADMIN.oneSessionIDauth(req.cookies.oneSessionID) !== true) return
      if (!DEV_TOOLS) return res.status(403)
      res.sendFile(path.join(__dirname, 'html', 'private', 'dev.js'))
      new log('js terminal script send')
      logip(req);
    })

    app2.use('/api', router)

    app2.use((req, res) => {
      const blacklist = ['/.well-known/appspecific/com.chrome.devtools.json']
      if (blacklist.includes(req.url)) return

      res.status(404).sendFile('img/featured_404.jpg', { root: __dirname });
      new log('error 404 detected for ' + req.url);
    })
    
}}
module.exports = {get}