const conv = require('../conv')
const app = require('../app')

const routergetContentConv = app.express.Router()

routergetContentConv.post('/', (req,res) => {
    const convData = new conv("a", "a")
    const contentConv = convData.getconversationContentWithNameOfIt(req.body.param)

    res.json({content: contentConv})
})

module.exports = routergetContentConv