const app = require('../app')
const {log} = require('../logger')
const conversation = require('../conv')

const routergetConv = app.express.Router()

routergetConv.post('/', async (req,res) => {
    const {name, mdp} = req.body
    const conversationClass = new conversation(name, mdp)
    const listOfConv = await conversationClass.getconversationForUser()
    res.json({ ListOfConversation: listOfConv})
})

module.exports = routergetConv