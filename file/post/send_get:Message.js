const chat = require('../chat')
const app = require('../app')
const { log } = require('../logger')

const routersendMessage = app.express.Router()
const routergetMessage = app.express.Router()

let TEMPcontent = {}

routersendMessage.post('/', async (req,res) => {
    chat.sendMessage(req.body.conv, null)
    const ch = new chat(req.body.msg, req.body.who, req.body.conv)
    const content = await ch.sendMessage()

    const conv = req.body.conv
    TEMPcontent[conv] = content

    res.status(200).sendStatus(200)
})

routergetMessage.post('/', async (req,res) => {
    const conv = req.body.conv
    const content = TEMPcontent[conv]
    res.json(content)
})

module.exports.send = routersendMessage
module.exports.get = routergetMessage