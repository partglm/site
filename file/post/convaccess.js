const conv = require('../conv')
const app = require('../app')
const { log } = require('../logger')

const routerconvacess = app.express.Router()

routerconvacess.post('/', async (req,res) => {
    const convClass = new conv(req.body.user, req.body.mdp)
    const authorisation = await convClass.canAccess(req.body.name)
    new log("the user:  " + req.body.user + " can't access to the conversation: " + req.body.name)
    
    if (authorisation) res.json({res: false})
    if (!authorisation) res.json({res: true})
})

module.exports = routerconvacess