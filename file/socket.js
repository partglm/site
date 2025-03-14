const { Server } = require("socket.io");
const { log } = require("./logger")

class SocketManager {
    constructor(server) {
        // Initialiser Socket.io avec le serveur HTTP
        this.io = new Server(server, {
            cors: {
                origin: "*", // Autoriser tous les clients (à adapter)
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
    myWish(message) {
        new log(`Envoi du message à tous les clients: ${message}`);
        this.io.emit("message", message);
    }
}

module.exports = SocketManager;