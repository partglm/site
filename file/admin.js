const {log} = require('./logger')
const {auth} = require('./auth')
const { ADMIN_PANNEL, DEV_TOOLS, TOOLS_TERMINAL, CONV_ADMIN } = require('./config')
const crypto = require("crypto");

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

      generatorOneSessionID(adminId, length = 64, ttl = 1000 * 60) {
      if (!this.admin) return "you need to be an admin to do that";

      const rawToken = crypto.randomBytes(length).toString("base64url");
      const hashed = crypto.createHash("sha256").update(rawToken).digest("hex");

      const apiKey = {
        key: hashed,
        adminId,
        createdAt: Date.now(),
        expiresAt: Date.now() + ttl,
      };
    
      for (let i = oneSessionIDlist.length - 1; i >= 0; i--) {
        if (oneSessionIDlist[i].adminId === adminId) {
          oneSessionIDlist.splice(i, 1);
        }
      }

      oneSessionIDlist.push(apiKey);

      return rawToken;
    }

    static auth(req) {
      const token = req.cookies.oneSessionID;
      if (!token) return false;

      const hashed = crypto.createHash("sha256").update(token).digest("hex");
      const now = Date.now();

      for (let i = oneSessionIDlist.length - 1; i >= 0; i--) {
        if (oneSessionIDlist[i].expiresAt <= now) {
          oneSessionIDlist.splice(i, 1);
        }
      }

      return oneSessionIDlist.some((k) => k.key === hashed);
    }

    static canacess (oneSessionID, ...where) {
      if (!oneSessionIDlist.includes(oneSessionID)) return false

      let a = true
      where.forEach(value => {
        if (!ADMIN_PANNEL) return a = false

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

          case 'conv_admin':
            if (!CONV_ADMIN) return a = false
            break;

          default:
            if (!a) return a = true 
        }
      })
      if (!a) new log('please activate it in the .env file: ' + a + " it's one of this:  " + where)
      return a  
    }
}

module.exports = ADMIN
module.exports.IDlist = oneSessionIDlist