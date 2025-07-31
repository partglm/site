const fs = require('fs')

if (!fs.existsSync('../backend/.back.env')) {
    console.error("\x1b[31m!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\x1b[0m");
    console.error("\x1b[31m!!!               ERREUR : DOSSIER 'BACKEND' INTROUVABLE OU MAL NOMMÉ                !!!\x1b[0m");
    console.error("\x1b[31m!!!     ERREUR : ASSURE-TOI D'AVOIR CLONÉ LE BACKEND DEPUIS LA BRANCHE 'BACKEND'     !!!\x1b[0m");
    console.error("\x1b[31m!!!                  ERREUR : FICHIER .ENV MANQUANT OU MAL CONFIGURÉ                 !!!\x1b[0m");
    console.error("\x1b[31m!!!                            ERREUR : LANCE 'NPM INSTALL'                          !!!\x1b[0m");
    console.error("\x1b[31m!!!          BACKEND NON CONFIGURÉ : CORRIGE LES ERREURS AVANT DE CONTINUER          !!!\x1b[0m");
    console.error("\x1b[31m!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\x1b[0m\n");

    process.abort()
}