const {log} = require('../logger')
const app = require("../app");
const routerLinux = app.express.Router()

new log("post method auth loaded success")
routerLinux.post('/', async(req,res) => {
    const {cmd} = req.body
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