const fs = require('fs');
const path = require('path')
const { log, logTable } = require('./logger');
const { ADMIN_USER, ADMIN_PASS, ADMIN_ID } = require('./config');

let accounts = {};

class auth {
  constructor (username, password) {
    this.user = username
    this.mdp = password
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
    new log("admin account: "+ ADMIN_PASS +" "+ ADMIN_USER)
    return Array.from(accounts)
  }

  authentication () {
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
  
  getID () {
    if (this.user === ADMIN_USER) return ADMIN_ID;
    return accounts[this.user].id
  }
}

module.exports = { auth };