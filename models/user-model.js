///// --[#]-- [REQUIRE] ----- >>>>>
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [USER SCHEMA] ----- >>>>>
  const userSchema = new Schema
    ({
        fullname     : {type: String},
        username     : {type: String},
        email        : {type: String},
        obsfpassword : {type: String},
        facebookID   : {type: String},
        googleID     : {type: String}
      },
      {timestamps: true}
    );
///// --[@]-- [USER SCHEMA] ----- -END-

///// --[#]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- >>>>>
  const UserModel = mongoose.model('User', userSchema);
///// --[@]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- -END-

///// --[#]-- [EXPORT USER MODEL] ----- >>>>>
  module.exports = UserModel;
///// --[@]-- [EXPORT USER MODEL] ----- -END-