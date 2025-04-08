const app = require("./app");
const { log } = require("./logger");

const routerAuth = require('./post/auth')
const routergetConv = require('./post/getconv')

const router = app.router
new log("router post loaded")

router.use('/getconv', routergetConv)
router.use('/auth', routerAuth)

module.exports = router