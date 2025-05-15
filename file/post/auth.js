const {log} = require('../logger')
const app = require("../app");
const {auth} = require('../auth');
const routerAuth = app.express.Router()

new log("post method auth loaded success")
routerAuth.post('/', (req,res) => {
    const {mdp, name} = req.body
    const authentified = new auth(name, mdp).authentication()
    new log("authentification for" + JSON.stringify(new auth(name, mdp)))

    if (authentified == 'ADMIN') {
        res.status(200).json({ securitynum : 0, message: '/admin'})
        new log("admin conected")
       return}

    if (authentified == 'USER') {
        res.status(200).json({ securitynum : 1, message: 'ok', name: name})
        new log("user conected")
        return} 
     
    res.status(200).json({securitynum : 2, message: authentified})
    new log(authentified)
})

module.exports = routerAuth