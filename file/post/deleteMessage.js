const {log} = require('../logger')
const app = require("../app");
const ADMIN = require('../admin');
const chat = require('../chat');
const { ADMIN_USER } = require('../config');
const routerDeleteMessage = app.express.Router()

function getCookieFromHeader(cookieHeader, cookieName) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const found = cookies.find(c => c.startsWith(cookieName + '='));
  return found ? decodeURIComponent(found.split('=')[1]) : null;
}

routerDeleteMessage.post('/', async(req,res) => {
    const {time, who, message, conv, id, whowant} = req.body

    
    const rawCookie = req.headers.cookie;
    const oneSessionID = getCookieFromHeader(rawCookie, 'oneSessionID');

    const result = new chat(message, who, conv).deleteMessage(time, whowant, oneSessionID)
    if (result != 'good') return res.status(403).json({err: result})

    app.socketManager.toALLDelete({conv: conv, id: id})

    res.status(201).json({err: 'good'})
})

module.exports = routerDeleteMessage