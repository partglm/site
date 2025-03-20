const app = require("./app");
const {auth} = require('./auth')

class post {
    constructor () {
        const app2 = app.app
        
        app2.post('/auth', (req,res) => {
            const {mdp, name} = req.body
            const authentified = new auth(name, mdp)
            
            if (authentified == 'ADMIN') {
                res.status(200).json({ securitynum : 0, message: '/admin'})
               return}

            if (authentified == 'USER') {
                res.status(200).json({ securitynum : 1, message: 'ok'})
                return}

            res.status(401).json({securitynum : 2, message: authentified})
        })
    }
}
module.exports = post 