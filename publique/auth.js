const fs = require('fs');
const { logEvent } = require('./logger');
const { ADMIN_USER, ADMIN_PASS } = require('./config');

let accounts = {};

fs.readFile('account.json', (error, data) => {
  if (!error) {
    accounts = JSON.parse(data);
    console.log('Comptes chargés:', Object.keys(accounts));
  } else {
    console.log('Erreur lecture account.json:', error);
  }
});

function authenticate(username, password) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return 'ADMIN';
  }
  if (accounts[username] && accounts[username].mdp === password) {
    return 'USER';
  }
  return null;
}

module.exports = { authenticate };
