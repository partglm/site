const {log} = require('./logger')
const {auth} = require('./auth')

const oneSessionIDlist = []
let key;

class ADMIN extends auth {
    constructor(user, mdp) {
        super(user, mdp)
        this.user = user
        this.password = mdp
        key.user = this.user
        key.mdp = this.password

        if(this.authentication() == 'ADMIN') {
          this.admin = true
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

    static oneSessionIDauth (ID) {
      if(new auth(key.user, key.mdp).authentication()!= 'ADMIN') return 'you need to be an admin to do that'

      if (oneSessionIDlist.includes(ID)) return true
      return false
    }
}

module.exports = ADMIN
module.exports.IDlist = oneSessionIDlist