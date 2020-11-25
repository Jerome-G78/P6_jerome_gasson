// Activation du mode STRICT de Javascript
"use strict";

// import des packages
const Sauces = require('../models/sauces');
const fs = require('fs');

// Fonction de création d'une sauce [C]
/*
Dans cette fonction createSauces :

Nous commençons par utiliser la fonction parse de JSON pour récupérer les données envoyées par l'utilisateur depuis le "frontend" pour construire un objet.
Nous supprimons l'ID reçu, car celui-ci sera créer automatiquement par MongoDB
Ensuite, nous appelons le constructeur Sauces qui se trouve dans les modèles pour construire l'objet en récupérant tous les paramètres qui sont présent dans la constante sauce
Finalement, nous utilisons la fonction save pour enregistrer l'objet dans la collection Sauces de la base de données MongoDB.

En retournant des erreurs avec le code d'erreur en cas d'échec.
*/
exports.createSauces = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  delete sauce._id;
  const Sauce = new Sauces({
    name: sauce.name,
    manufacturer: sauce.manufacturer,
    description: sauce.description,
    mainPepper: sauce.mainPepper,
    heat: sauce.heat,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: sauce.userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });

  Sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));

};

// Fonction de récupération d'une sauce [R]
/*
Dans cette fonction getOneSauces :

Nous récupérons via findOne la sauce correspondant à l'ID liée dans la base de données.
En retournant des erreurs avec le code d'erreur en cas d'échec.
*/
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({_id: req.params.id,})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};

// Fonction de modification d'une sauce [U]
/*
Dans cette fonction modifySauces :

Nous commençons par utiliser la fonction parse de JSON pour récupérer les données envoyées par l'utilisateur depuis le "frontend" pour modifier un objet.

*/
exports.modifySauces = (req, res, next) => {
  const sauce = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

// Fonction de suppression d'une sauce [D]
/*
Dans cette fonction deleteSauces :

Nous appelons la fonction findOne pour récupérer l'ID unique de la sauce créé par l'utilisateur,

Dans notre bloc then, nous récupérons le fichier image dans une constante "filename" depuis l'URL "splitté",
Ensuite avec le package fs, nous allons chercher le ficher immage correspondant dans l'arbre du serveur et nous le supprimons

Enfin, via deleteOne nous supprimons l'objet dans la base de données.

Le tout en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec ;
*/
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
    Sauces.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

// Fonction de récupération de la liste des Sauces
/*
Dans cette fonction getAllSauces :

Nous allons récupérer tout les éléments de la "Table/Collection" Sauce de la base de donnée,
En retournant des erreurs avec le code d'erreur en cas d'échec.
*/
exports.getAllSauces = (req, res, next) => {
  Sauces.find().then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(400).json({error: error});});
};

// Fonction Like/Dislike
/*
Dans cette fonction likeSauces :

*/
exports.likeSauces = (req, res, next) => {
  let uid = req.body.userId, like = req.body.like;
  
  Sauces.findOne({ _id: req.params.id }).exec(function (error, sauce){
    let msg = "", uiL = sauce.usersLiked.indexOf(uid), uiD = sauce.usersDisliked.indexOf(uid);
    
    if(like == 0 && uiL >-1){

      sauce.likes--;
      sauce.usersLiked.splice(uiL,1);
      msg = "Unliked !";
  
    } else if(like == 0 && uiD >-1){

      sauce.dislikes--;
      sauce.usersDisliked.splice(uiD,1);
      msg = "Undisliked !";

    };

    if(like == 1){

      sauce.likes++;
      if (sauce.usersLiked.length > 0){
        sauce.usersLiked=[uid];
        
      } else{
        sauce.usersLiked.push(uid);
      }
      msg = "Like pris en compte !";
    };

    if(like == -1){

      sauce.dislikes++;
      if (sauce.usersDisliked.length > 0){
        sauce.usersDisliked=[uid];
      } else{
        sauce.usersDisliked.push(uid);
      }
      msg = "Disike pris en compte !";

    };

    sauce.save()
      .then(() => res.status(201).json({ message: msg}))
      .catch(error => res.status(400).json({ error }));
    
    console.log("%s", sauce);
  });
};