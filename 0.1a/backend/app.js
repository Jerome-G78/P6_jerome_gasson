// importez les packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Ajout des routes pour l'identification & l'authentification
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// initialisez la variable app qui contiendra 'express'
const app = express();
app.use(cors());
// Connexion a la base de données MongoDB
mongoose.connect('mongodb+srv://PoppY:U0gh9JQ5vF1dtykS@cluster0.6rjyj.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

console.log (app._router);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());                     // définissez sa fonction json comme middleware global pour votre application

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);             // enregistrez le routeur pour toutes les demandes effectuées vers /api/stuff.
app.use('/api/auth', userRoutes);               // enregistrez le routeur pour toutes les demandes effectuées vers /api/auth.

module.exports = app;                           // Permet d'exporter l'application créer ( en l'occurence, elle devient accesible pour serveur.js)