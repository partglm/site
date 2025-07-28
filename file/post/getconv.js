const app = require('../app')
const {log} = require('../logger')
const conversation = require('../conv')
const ADMIN = require('../admin')
const { ADMIN_USER, ADMIN_PASS } = require('../config')

const routergetConv = app.express.Router()

routergetConv.post('/', async (req,res) => {
    let {name, mdp} = req.body 

    if (ADMIN.canacess(req)) {name = ADMIN_USER; mdp = ADMIN_PASS}

    const conversationClass = new conversation(name, mdp)
    const listOfConv = await conversationClass.getconversationForUser()
    res.json({ ListOfConversation: listOfConv})
})

module.exports = routergetConv