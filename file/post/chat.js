const app = require('../app')
const {logChat} = require('../logger')

const routerChat = app.router



routerChat.post('/', (req,res) => {
    const {who, page, message} = req.body
    new logChat(message, who)

    if (page == '/') {

    }
})

module.exports = routerChat