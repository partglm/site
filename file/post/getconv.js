const app = require('../app')
const {log} = require('../logger')
const conversation = require('../conv')

const routergetConv = app.router

routergetConv.post('/', (req,res) => {
    const {name, mdp} = req.body
    const conversationClass = new conversation(name, mdp)
    const listOfConv = conversationClass.getconversationForUser()
    res.json({ ListOfConversation})
})

module.exports = routergetConv