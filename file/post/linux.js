const {log} = require('../logger')
const app = require("../app");
const ADMIN = require('../admin');
const { ADMIN_PANNEL } = require('../config');
const routerLinux = app.express.Router()

new log("post method auth loaded success")
routerLinux.post('/', async(req,res) => {
    const {cmd} = req.body
    if (!ADMIN_PANNEL || ADMIN.oneSessionIDauth(req.cookies.oneSessionID) !== true) return req.status(403).json({err: "you can't access to this"})

    if (!app.terminal._ready) {
        res.status(401).json({err: 'please wait a few second'})
    }
    const result = await app.terminal.runCommand(cmd)
    if(!result) {
        return res.status(200).json({result: true})
    }
    res.status(200).json({result: result})
})

module.exports = routerLinux