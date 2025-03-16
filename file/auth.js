const fs = require('fs');
const path = require('path')
const { log, logTable } = require('./logger');
const { ADMIN_USER, ADMIN_PASS } = require('./config');

let accounts = {};

class auth {
  constructor (username, password) {
    this.user = username
    this.mdp = password

    if (this.user === ADMIN_USER && this.mdp === ADMIN_PASS) {
      return 'ADMIN';
    }
    if (accounts[this.user] && accounts[this.user].mdp === this.mdp) {
      return 'USER';
    }
    if (accounts[this.user]) {
      return `the password for ${this.user} is incorrect`
    }
    return `the account: ${this.user} does not exist`;
  }

  async load () {    
    try {
      const result = await fs.promises.readFile(path.join(__dirname, 'data', 'account.json'))
      accounts = JSON.parse(result)
    }
    catch(err) {
     throw err
    }
    new log("accounts loaded:")
    new logTable(accounts)
    return Array.from(accounts)
  }
}

module.exports = { auth };