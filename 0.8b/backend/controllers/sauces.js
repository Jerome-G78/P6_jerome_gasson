// Activation du mode STRICT de Javascript
"use strict";

// import des packages
const Sauces = require('../models/sauces');
const fs = require('fs');

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

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({_id: req.params.id,})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};

exports.modifySauces = (req, res, next) => {
  const thingObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

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

exports.getAllSauces = (req, res, next) => {
  Sauces.find().then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(400).json({error: error});});
};

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