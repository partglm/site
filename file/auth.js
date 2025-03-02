const fs = require('fs');
const { log } = require('./logger');
const { ADMIN_USER, ADMIN_PASS } = require('./config');

let accounts = {};

fs.readFile('./data/account.json', (error, data) => {
  if (!error) {
    accounts = JSON.parse(data);
    console.table(Object.keys(accounts))
  } else {
    new log('Erreur lecture account.json:', error);
  }
});

class auth {
  constructor (username, password) {
    this.user = username
    this.mdp = password
  }

  auth () {
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
}

class load {
  load () {
    try {
      const result = fs.promises.readFile('./data/account.json')
      accounts = JSON.parse(result)
    }
    catch(err) {
      new Error(err)
      return false
    }
    return true
  }
}
module.exports = { auth, load };