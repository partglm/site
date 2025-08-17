const {log} = require('../logger')
const app = require("../app");
const ADMIN = require('../admin');
const routerLinux = app.express.Router()

function getCookieFromHeader(cookieHeader, cookieName) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const found = cookies.find(c => c.startsWith(cookieName + '='));
  return found ? decodeURIComponent(found.split('=')[1]) : null;
}

routerLinux.post('/', async(req,res) => {
    const {cmd} = req.body

    const rawCookie = req.headers.cookie;
    const oneSessionID = getCookieFromHeader(rawCookie, 'oneSessionID');

    if (!ADMIN.canacess(oneSessionID)) return res.status(403).json({err: "you can't access to this"})

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