const app = require('../app')
const {logChat} = require('../logger')
const socketManager = require('../socket')

const routerChat = app.express.Router()

const messageHistory = []
let counterOfMessage = 0

routerChat.post('/', (req,res) => {
    const {who, page, message} = req.body
    new logChat(message, who)

    counterOfMessage = counterOfMessage + 1

    if (page == '/') {
        messageHistory.push({content: `${who}:  ${message}`, id : `0${counterOfMessage}`})
        socketManager.sendMessage(`${who}: ${message}`, `0${counterOfMessage}`)
    }
    if (page == '/admin') {
        messageHistory.push({content: `${who}:  ${message}`, id : `1${counterOfMessage}`})
        socketManager.sendMessage(`${who}: ${message}`, `1${counterOfMessage}`)
    }
})

module.exports = routerChat