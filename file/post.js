const app = require("./app");
const { log } = require("./logger");

const routerAuth = require('./post/auth')
const routergetConv = require('./post/getconv')
const registerRouter = require('./post/register')
const routergetContentConv = require('./post/getContentConv')
const routersendMessage = require('./post/send_getMessage').send
const routergetMessage = require('./post/send_getMessage').get
const routercreateCONV = require('./post/createCONV')
const routerconvacess = require('./post/convaccess')
const routerLinux = require('./post/linux')
const routerDeleteMessage = require('./post/deleteMessage')

const router = app.express.Router()

class post {
    constructor() {
        router.use('/getconv', routergetConv)
        router.use('/auth', routerAuth)
        router.use('/register', registerRouter)
        router.use('/getContentConv', routergetContentConv)
        router.use('/getMessage', routergetMessage)
        router.use('/sendMessage', routersendMessage)
        router.use('/createCONV', routercreateCONV)
        router.use('/convAcess', routerconvacess)
        router.use('/linux', routerLinux)
        router.use('/deleteMessage', routerDeleteMessage)

        app.app.use('/api', router)
        
        new log("router post loaded")
    }
}

module.exports = post