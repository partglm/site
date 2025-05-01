const app = require("./app");
const { log } = require("./logger");

const routerAuth = require('./post/auth')
const routergetConv = require('./post/getconv')
const registerRouter = require('./post/register')
const routergetContentConv = require('./post/getContentConv')

const router = app.express.Router()
new log("router post loaded")

router.use('/getconv', routergetConv)
router.use('/auth', routerAuth)
router.use('/register', registerRouter)
router.use('/getContentConv', routergetContentConv)

module.exports = router