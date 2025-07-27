const fs = require('fs')
const {auth} = require('./auth')
const path = require('path')
const { log, logChat } = require('./logger')
const { ADMIN_USER } = require('./config')

class conversation extends auth{
    constructor(user, mdp) {
        super(user,mdp)
        this.user = user
        this.mdp = mdp
    }

    async getconversationForUser () {
        const contentFile = await this.readWhoparticipewhere()
        const listOfId = contentFile.listconv 
        
        return listOfId
    }

    async readWhoparticipewhere () {
        const contentFilebrut = await fs.promises.readFile(path.join(__dirname, 'data','conversation','whoparticipewhere', `${this.user}.json`))
        const contentFile = JSON.parse(contentFilebrut)
        const listOfId = contentFile
        
        return listOfId
    }
    
    async canAccess (conv) {
        if (this.authentication() === 'ADMIN') return true

        const list = await this.readWhoparticipewhere()
        if (!list.listconv.some(a => a.name === conv)) return false 
        
        return true 
    }

    async getconversationContentWithNameOfIt (nameOFtheConv) {
        new log("loading content for " + nameOFtheConv)
        const contentFilebrut = await fs.promises.readFile(path.join(__dirname, 'data', 'conversation', 'content', `${nameOFtheConv}.json`))
        const contentFile = JSON.parse(contentFilebrut)

        return contentFile.content
    }

    async createconversation (nameOFtheConv) {
        const errorFile = await fs.promises.readFile(path.join(__dirname, 'data', 'conversation', 'content', `${nameOFtheConv}.json`))
        if(errorFile) return 'this name is already use'

        const JSONstring ={"creator": `${this.user}`,"content": []}
        
        await fs.promises.writeFile(path.join(__dirname, 'data', 'conversation', 'content', `${nameOFtheConv}.json`), JSON.stringify(JSONstring, null, 2))

        //add to the user account
        const participationBrut = await this.readWhoparticipewhere()
        participationBrut.listconv.push({"name": nameOFtheConv, "href": `/conversation/?conv=${nameOFtheConv}&user=${this.user}`})

        await fs.promises.writeFile(path.join(__dirname, 'data', 'conversation', 'whoparticipewhere', `${this.user}.json`), JSON.stringify(participationBrut, null, 2))

        //add to the admin account
        const contentFilebrut = await fs.promises.readFile(path.join(__dirname, 'data','conversation','whoparticipewhere', `${ADMIN_USER}.json`))
        const contentFile = JSON.parse(contentFilebrut)

        contentFile.listconv.push({"name": nameOFtheConv, "href": `/admin/conv/?conv=${nameOFtheConv}&user=${ADMIN_USER}`})

        await fs.promises.writeFile(path.join(__dirname, 'data', 'conversation', 'whoparticipewhere', `${ADMIN_USER}.json`), JSON.stringify(contentFile, null, 2))
        
        return 'good'
    } 
}

module.exports = conversation