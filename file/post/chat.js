const app = require('../app')
const {logChat} = require('../logger')
const socketManager = require('../socket')

const routerChat = app.router

const messageHistory = []
let counterOfMessage = 0

routerChat.post('/', (req,res) => {
    const {who, page, message} = req.body
    new logChat(message, who)

    counterOfMessage = counterOfMessage + 1

    if (page == '/') {
        messageHistory.push({content: `${who}:  ${message}`, id : `0${counterOfMessage}`})
        socketManager.myWish(`${who}: ${message}`)
    }
})

module.exports = routerChat