const { Server } = require("socket.io");
const { log } = require("./logger")
const {PORT} = require('./config')

class SocketManager {
    constructor(server) {
        // Initialiser Socket.io avec le serveur HTTP
        this.io = new Server(server, {
            cors: {
                origin: `localhost:${PORT}`, // Autoriser tous les clients (à adapter)
                methods: ["GET", "POST"]
            }
        });

        this.io.on("connection", (socket) => {
            new log(`Client connecté: ${socket.id}`);
            socket.on("disconnect", () => {
                new log(`Client déconnecté: ${socket.id}`);
            });
        });
    }

    // Méthode personnalisée pour envoyer un message à tous les clients
    static sendMessage(message, id) {
        new log(`Envoi du message à tous les clients: ${message}`);
        this.io.emit("message", (message, id));
    }
}

module.exports = SocketManager;