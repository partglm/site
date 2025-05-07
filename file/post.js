const app = require("./app");
const { log } = require("./logger");

const routerAuth = require('./post/auth')
const routergetConv = require('./post/getconv')
const registerRouter = require('./post/register')
const routergetContentConv = require('./post/getContentConv')
const routersendMessage = require('./post/send_get:Message').send
const routergetMessage = require('./post/send_get:Message').get
const routercreateCONV = require('./post/createCONV')

const router = app.express.Router()
new log("router post loaded")

router.use('/getconv', routergetConv)
router.use('/auth', routerAuth)
router.use('/register', registerRouter)
router.use('/getContentConv', routergetContentConv)
router.use('/getMessage', routergetMessage)
router.use('/sendMessage', routersendMessage)
router.use('/createCONV', routercreateCONV)

module.exports = router