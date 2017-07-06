///// --[#]-- [REQUIRE] ----- >>>>>
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [JAVASCRIPT LOGIC] ----- >>>>>
///// --[@]-- [JAVASCRIPT LOGIC] ----- -END-

///// --[#]-- [USER SCHEMA] ----- >>>>>
  const memebagSchema = new Schema
    ({
        collectionName    : {type: String, default: 'A Nameless Sack'},//Should never actually store as Untitled. require user to name it.
        collectionCatgory : {type: String, default: 'Uncategorized'},//......Will This actually be used? Remove if not.
        collectionDetails : {type: String},//................................Should never be blank. Required data from users.
        owner             : {type: String, default: 'Unknown'},//............Autofilled from currentUser | req.user
        ownerByID         : {type: String},//................................May not need this now that serialization is working
        itemCount         : {type: Number, default: 0},//....................Should increment and decrement when a bag is crated or deleted
        fileURL           : {type: String},//................................Thumbnail URL
        ALLtheMemes       : {type: Array,  default: []},//...................An array of every meme saved do this bag.
        comments          : {type: Array, default: []}//.....................An array that stores any comment made by users that bag was shared with.
      },
      {timestamps: true}
    );
///// --[@]-- [USER SCHEMA] ----- -END-

///// --[#]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- >>>>>
  const MemebagModel = mongoose.model('MemeBag', memebagSchema);
///// --[@]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- -END-

///// --[#]-- [EXPORT USER MODEL] ----- >>>>>
  module.exports = MemebagModel;
///// --[@]-- [EXPORT USER MODEL] ----- -END-