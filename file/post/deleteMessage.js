const {log} = require('../logger')
const app = require("../app");
const ADMIN = require('../admin');
const chat = require('../chat')
const routerDeleteMessage = app.express.Router()


routerDeleteMessage.post('/', async(req,res) => {
    const {time, who, message, conv} = req.body
    if (!ADMIN.canacess(req)) return res.status(403).json({err: "you can't access to this"})

    new chat(message, who, conv).deleteMessage(time)

    res.status(201).json({err: 'good'})
})

module.exports = routerDeleteMessage