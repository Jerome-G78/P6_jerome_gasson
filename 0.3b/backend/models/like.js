const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// nous créons un schéma de données qui contient les champs souhaités pour chaque like/dislike, indique leur type ainsi que leur caractère (obligatoire ou non).
/*
const LikeSchema = mongoose.Schema({
  // _id est créer automatiquement 
  userId: { type: String, required: true },
  like: {type: Number}
});

// nous exportons ce schéma en tant que modèle Mongoose appelé « Like », le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('Like', LikeSchema); 
*/

const like = {
    itemid: { 
      type: Schema.ObjectId, 
      ref: 'Item'
    },

    rating: {type : Number}
};

let UserSchema = new Schema({
  userId : { 
    type: String, 
    required: true, 
    index: { unique: true },
    
  likes : [like],
  dislikes : [like]
  }
});

/*
UserSchema.index({ 'likes.itemid': 1 });
UserSchema.index({ 'dislikes.itemid': 1 });
let User = db.model('User', UserSchema);

const ItemSchema = mongoose.Schema({
  name: {type : String}
})

/*
let ItemSchema2 = new Schema({
    name: String
});

let Item = db.model('Item', ItemSchema2);
*/

module.exports = mongoose.model('Like', UserSchema); 