const fs = require('fs')
const {auth} = require('./auth')
const path = require('path')
const { log, logChat } = require('./logger')

class conversation extends auth{
    constructor(user, mdp) {
        super(user,mdp)
        this.user = user
        this.mdp = mdp
    }

    async getconversationForUser () {
        const contentFilebrut = await fs.promises.readFile(path.join(__dirname, 'data','conversation','whoparticipewhere', `${this.user}.json`))
        const contentFile = JSON.parse(contentFilebrut)
        const listOfId = contentFile.listconv 
        
        return listOfId
    }

    async getconversationContentWithNameOfIt (nameOFtheConv) {
        new log("loading content for " + nameOFtheConv)
        const contentFilebrut = await fs.promises.readFile(path.join(__dirname, 'data', 'conversation', 'content', `${nameOFtheConv}.json`))
        const contentFile = JSON.parse(contentFilebrut)

        return contentFile.content
    }
}

module.exports = conversation