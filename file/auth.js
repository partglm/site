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

class signIN extends auth {
  constructor(user) {
    super(user)
    this.user = user
  }

  createID () {
    const randomNum = Math.random()
    const num = Math.floor(randomNum * 100000000000000)
    const listID = Object.values(accounts).map(account => Number(account.id));
    if (listID.includes(num)) return this.createID();
    return num
  }

  register (mdp, email) {
    if (accounts[this.user]) return "we are sorry but this username is already use"
    const ID = this.createID()

    accounts[this.user] = {
      "mdp": mdp,
      "id": ID,
      "email": email
    }

    fs.writeFile((path.join(__dirname, 'data', 'account.json')), accounts, (err) => {
      if (err) throw err;
      new log('The new acounnts has been saved!');
    })
    new log(`a new accounts has been created: name: ${this.user}`)
    return 'good'
  }
}

module.exports = { auth, signIN };