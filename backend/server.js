const http = require('http');                       // importez le package HTTP natif de Node (permet de créer un serveur)
const { type } = require('os');
const app = require('./app');                       // Ajouter l'application 'express'
/*
app.set('port', process.env.PORT || 3000);          // Définissez le port d'écoute de l'application 'express'
*/

// la fonction normalizePort renvoie un port valide, qu'il soit de type numérique ou chaîne
const normalizePort = val =>{
    const port = parseInt(val,10);
    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur.
const errorHandler = error =>{
    if (error.syscall !== 'listen'){
        throw error;
    }

    const adress = server.address();
    const bind = typeof adress === 'string' ? 'pipe' + adress : 'port: ' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.')
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);              // creation du serveur et Appel de l'application 'Express' pour envoie des arguments

// un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('error', errorHandler);
server.on('listening', ()=>{
    const adress = server.address();
    const bind = typeof adress === 'string' ? 'pipe ' + adress : 'port ' + port;
    console.log('listening on ' + bind);
});

server.listen(port);

/*
const server = http.createServer((req, res) => {    // passez une fonction qui sera exécutée à chaque appel effectué vers ce serveur
    res.end('Voilà la réponse du serveur !');       // La methode end permet de renvoyer une réponse de type String a l'appelant
});

server.listen(process.env.PORT || 3000);            // Configuration du port d'écoute du serveur avec la methode listen. Soit le port par défaut, soit le port 3000. (ici)
*/