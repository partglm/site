const fs = require('fs')
const path = require('path')
const a = require('./data/conversation/content/testONLY.json')

class chat {  
    constructor(message, who, conversation) {
        this.who = who
        this.message = message
        this.conversation = conversation
        this.time = new Date().toLocaleString()
    }

    async sendMessage () {
        await this.MAJofJSON()

        return {msg: this.message, when: this.time, by: this.who}
    }

    async MAJofJSON () {
        const content = await fs.promises.readFile(path.join(__dirname, 'data', 'conversation', 'content', `${this.conversation}.json`))
        const JSONfile = JSON.parse(content)

        JSONfile.content.push({msg: this.message, when: this.time, by: this.who})

        await fs.promises.writeFile(path.join(__dirname, 'data', 'conversation', 'content', `${this.conversation}.json`), JSON.stringify(JSONfile, null, 1), )
    }
}

module.exports = chat 