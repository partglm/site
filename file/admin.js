const {log} = require('./logger')
const {auth} = require('./auth')
const { ADMIN_PANNEL, DEV_TOOLS, TOOLS_TERMINAL } = require('./config')

const oneSessionIDlist = []
let key = {}

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
      oneSessionIDlist.forEach((id) => {
        oneSessionIDlist.pop()
      })
      oneSessionIDlist.push(resultat)
      return resultat;
    }

    static oneSessionIDauth (ID) {
      if(new auth(key.user, key.mdp).authentication()!= 'ADMIN') return 'you need to be an admin to do that'
      if(ID == null) return false

      if (oneSessionIDlist.includes(ID)) return true
      return false
    }

    static canacess (req, ...where) {
      if (this.oneSessionIDauth(req.cookies.oneSessionID) !== true) return false

      let a = true
      where.forEach(value => {
        switch (value) {
          case 'admin_pannel':
            if (!ADMIN_PANNEL) return a = false
            break;

          case 'dev_tools':
            if (!DEV_TOOLS) return a = false
            break;

          case 'tools_terminal':
            if (!TOOLS_TERMINAL) return a = false
            break;

          default:
             return a = true 
        }
      })
      if (!a) new log('please activate it in the .env file: ' + a + " it's one of this:  " + where)
      return a  
    }
}

module.exports = ADMIN
module.exports.IDlist = oneSessionIDlist