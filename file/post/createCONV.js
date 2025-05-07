const conv = require('../conv')
const app = require('../app')
const { log } = require('../logger')

const routercreateCONV = app.express.Router()

routercreateCONV.post('/', async (req,res) => {
    const convData = new conv(req.body.user, null)
    const contentConv = await convData.createconversation(req.body.name)
    new log("the conversation: " + req.body.param + " has been created successfuly")
    res.json({content: contentConv})
})

module.exports = routercreateCONV