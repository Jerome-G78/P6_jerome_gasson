"use strict";
const Sauces = require('../models/sauces');
const mongo = require('mongodb');
const fs = require('fs');

exports.createSauces = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  delete sauce._id;
  const Sauce = new Sauces({
  //  ...thingObject, equivalent à :
    name: sauce.name,
    manufacturer: sauce.manufacturer,
    description: sauce.description,
    mainPepper: sauce.mainPepper,
    heat: sauce.heat,
    userId: sauce.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    usersLiked: 0,
    usersDisliked: 0
  });
  Sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id,
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({error: error});
    }
  );
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

exports.getAllStuff = (req, res, next) => {
  Sauces.find().then(
    (things) => {res.status(200).json(things);}
  ).catch(
    (error) => {res.status(400).json({error: error});}
  );
};

exports.likeSauce = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  Sauces.findOne({ _id: req.params.id })
  const Sauce = new Sauces({
    usersLiked: sauce.usersLiked + 1
  })

  Sauces.save()
    .then(() => res.status(201).json({ message: 'Like Pris en compte !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.dislikeSauce = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  Sauces.findOne({ _id: req.params.id })
  const Sauce = new Sauces({
    usersDisliked: sauce.usersDisliked + 1
  })

  Sauces.save()
    .then(() => res.status(201).json({ message: 'Dislike Pris en compte !'}))
    .catch(error => res.status(400).json({ error }));
};