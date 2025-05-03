const fs = require('fs')
const SocketManager = require('./socket')
const path = require('path')

class chat extends SocketManager {  
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
        const content = await fs.promises.readFile(path.join('data', 'conversation', 'content', this.conversation))
        const JSONfile = JSON.parse(content)

        JSONfile.content.push({msg: this.message, when: this.time, by: this.who})

        await fs.promises.writeFile(path.join('data', 'conversation', 'content', this.conversation), JSONfile, )
    }
}

module.exports = chat 