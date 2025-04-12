const {signIN} = require('../auth')
const app = require('../app')
const { log } = require('../logger')

const registerRouter = app.express.Router()

registerRouter.post('/', (req, res) => {
    const {user, pass , mail} = req.body
    const registering = new signIN(user).register(pass,mail)
    if (registering == 'good') return res.json({good: 'good'})
    res.json({err: registering})
})

module.exports = registerRouter