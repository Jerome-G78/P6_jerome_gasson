const mongoose = require('mongoose');

// nous créons un schéma de données qui contient les champs souhaités pour chaque Thing, indique leur type ainsi que leur caractère (obligatoire ou non).

const LikeSchema = mongoose.Schema({
  // _id est créer automatiquement 
  userId: { type: String, required: true },
  like: {type: Number}
});

// nous exportons ce schéma en tant que modèle Mongoose appelé « Sauces », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('Like', LikeSchema); 