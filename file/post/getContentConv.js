const conv = require('../conv')
const app = require('../app')
const { log } = require('../logger')

const routergetContentConv = app.express.Router()

routergetContentConv.post('/', async (req,res) => {
    const convData = new conv("a", "a")
    const contentConv = await convData.getconversationContentWithNameOfIt(req.body.param)
    new log("the content for " + req.body.param + " have loaded succesfully: ")
    res.json({content: contentConv})
})

module.exports = routergetContentConv