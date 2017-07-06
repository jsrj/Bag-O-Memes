///// --[#]-- [REQUIRE] ----- >>>>>
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [JAVASCRIPT LOGIC] ----- >>>>>
///// --[@]-- [JAVASCRIPT LOGIC] ----- -END-

///// --[#]-- [USER SCHEMA] ----- >>>>>
  const memebagSchema = new Schema
    ({
        collectionName    : {type: String, default: 'Untitled Collection'},
        collectionCatgory : {type: String, default: 'Uncategorized'},
        collectionDetails : {type: String},
        owner             : {type: String, default: 'Unknown'},
        ownerByID         : {type: String},
        itemCount         : {type: Number, default: 0},
        fileURL           : {type: String}
      },
      {timestamps: true}
    );
///// --[@]-- [USER SCHEMA] ----- -END-

///// --[#]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- >>>>>
  const MemebagModel = mongoose.model('Collection', memebagSchema);
///// --[@]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- -END-

///// --[#]-- [EXPORT USER MODEL] ----- >>>>>
  module.exports = MemebagModel;
///// --[@]-- [EXPORT USER MODEL] ----- -END-