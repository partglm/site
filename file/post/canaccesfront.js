const app = require("../app");
const ADMIN = require('../admin');
const { log } = require("../logger");
const routercanacessfront = app.express.Router()


routercanacessfront.post('/', async(req,res) => {
    const {spec = []} = req
    
    if (!ADMIN.canacess(req.body.oneSessionID, ...spec)) return res.status(403).json({err: false})

    res.status(200).json({bool: true})
})

module.exports = routercanacessfront