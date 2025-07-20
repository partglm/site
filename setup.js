const fs = require('fs');
const path = require('path');
const readline = require('readline');

class env {
    constructor(file) {
        this.file = file
    }

    async majOfEnv (key, value) {
        const string = `${key}=${value}`
        const result = await fs.promises.appendFile(this.file, string)
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const keyOfEnv = [
    {key: 'ADMIN_PASS', name: 'password of the admin account', res: 'string'},
    {key: 'ADMIN_USER', name: 'user of the admin account', res: 'string'},
    {key: 'PORT', name: 'the port of the application', res: 'number'},

    {key: 'EULA', name: 'do you agree with the EULA ?', res: 'boolean'},
    {key: 'CONV_ADMIN', name: 'unable the conversation tools for admin', res: 'boolean'},
    {key: 'ADMIN_PANNEL', name: 'unable the admin pannel', res: 'boolean'},
    {key: 'DEV_TOOLS', name: 'unable the dev tools', res: 'boolean'},
    {key: 'TOOLS_TERMINAL', name: 'unable the terminal tools', res: 'boolean'},
]

for (obj in keyOfEnv) {

    rl.question(obj.name, (answer) => {
        if (!typeof answer == obj.res) {
            if (!obj.res == 'boolean') {
                if (!(answer == 'yes' || answer == 'no')) {

                    return console.log('the response is not the right type')
                }
            }
        }

        if (answer == 'yes') answer = true
        if (answer == 'no') answer = false

        new env('.env').majOfEnv(obj.key, answer)

    });
}

rl.close()