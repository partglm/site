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
        const contentFile = await fs.promises.readFile(path.join('data','conversation','whoparticipewhere', `${id}.json`))
        const listOfId = contentFile.listconv 
        return listOfId
    }
}

module.exports = conversation