const fs = require('fs');
const { log } = require('./logger');
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
      const result = await fs.promises.readFile('./data/account.json')
      accounts = JSON.parse(result)
    }
    catch(err) {
      new Error(err)
      return false
    }
    new log("accounts loaded")
    return true
  }
}

module.exports = { auth };