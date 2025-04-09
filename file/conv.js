const fs = require('fs')
const {auth} = require('./auth')
const path = require('path')

class conversation extends auth{
    constructor(user, mdp) {
        super(user,mdp)
        this.user = user
        this.mdp = mdp
    }

    async getconversationForUser () {
        const id = this.getID(this.user)
        const contentFilebrut = await fs.promises.readFile(path.join(__dirname, 'data','conversation','whoparticipewhere', `${id}.json`))
        const contentFile = JSON.parse(contentFilebrut)
        const listOfId = contentFile.listconv 
        
        return listOfId
    }
}

module.exports = conversation