const app = require('../app')
const {log} = require('../logger')
const conversation = require('../conv')
const ADMIN = require('../admin')
const { ADMIN_USER, ADMIN_PASS } = require('../config')

const routergetConv = app.express.Router()

function getCookieFromHeader(cookieHeader, cookieName) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const found = cookies.find(c => c.startsWith(cookieName + '='));
  return found ? decodeURIComponent(found.split('=')[1]) : null;
}

routergetConv.post('/', async (req,res) => {
    const { name, mdp } = req.body;
    let name2 = name, mdp2 = mdp

    const rawCookie = req.headers.cookie;
    const oneSessionID = getCookieFromHeader(rawCookie, 'oneSessionID');
    
    if (ADMIN.canacess(oneSessionID)) {name2 = ADMIN_USER; mdp2 = ADMIN_PASS}

    const conversationClass = new conversation(name2, mdp2)
    const listOfConv = await conversationClass.getconversationForUser()
    
    res.json({ ListOfConversation: listOfConv})
})

module.exports = routergetConv