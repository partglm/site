const app = require("./app");
const { log } = require("./logger");

const routerAuth = require('./post/auth')

const router = app.router
new log("router post loaded")

router.use('/auth', routerAuth)

module.exports = router