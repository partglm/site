const {signIN} = require('../auth')
const app = require('../app')
const { log } = require('../logger')

const registerRouter = app.express.Router()

registerRouter.post('/', (req, res) => {
    const {mail, pass, user} = req.body
    new log(mail, user, pass)
    const registering = new signIN(user).register(pass,mail)
    if (registering == 'good') return res.json({good: 'good'})
    res.json({err: registering})
})

module.exports = registerRouter