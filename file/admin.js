const {log} = require('./logger')
const {auth} = require('./auth')

const oneSessionIDlist = []

class ADMIN extends auth {
    constructor(user, mdp) {
        super(user, mdp)
        this.user = user
        this.password = mdp

        if(this.authentication() !== 'ADMIN') {
          this.admin = false
        }
      }

    generatorOneSessionID(longueur = 200) {
      if(!this.admin) return 'you need to be an admin to do that'

      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&é!#{([-|è_/çà@)]=}';
      let resultat = '';
      for (let i = 0; i < longueur; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        resultat += caracteres[index];
      }
      oneSessionIDlist.push(resultat)
      return resultat;
    }

    oneSessionIDauth (ID) {
      if(!this.admin) return 'you need to be an admin to do that'
      
      if (oneSessionIDlist.includes(ID)) return true
      return false
    }
}

module.exports = ADMIN