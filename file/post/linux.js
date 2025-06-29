const {log} = require('../logger')
const app = require("../app");
const ADMIN = require('../admin');
const routerLinux = app.express.Router()


routerLinux.post('/', async(req,res) => {
    const {cmd} = req.body

    if (!ADMIN.canacess(req)) return res.status(403).json({err: "you can't access to this"})

    if (!app.terminal._ready) {
        return res.status(401).json({err: 'please wait a few second'})
    }
    new log("acces granted to the terminal")

    if (cmd == 'npm stop') {new Error('process aborted'); process.abort()}

    const result = await app.terminal.runCommand(cmd)
    if(!result) {
        return res.status(200).json({result: true})
    }
    res.status(200).json({result: result})
})

module.exports = routerLinux