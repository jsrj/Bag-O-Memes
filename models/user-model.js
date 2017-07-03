///// --[#]-- [REQUIRE] ----- >>>>>
  const mongoose = require('mongoose');
  const schema   = mongoose.Schema;
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [USER SCHEMA] ----- >>>>>
  const userSchema = new Schema
    ({
      {
        fullname     : {type: String},
        username     : {type: String},
        email        : {type: String},
        obsfPassword : {type: String},
        facebookID   : {type: String},
        googleID     : {type: String}
      },
      {timestamps: true}
    });
///// --[@]-- [USER SCHEMA] ----- -END-

///// --[#]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- >>>>>
  const userModel = mongoose.model('User', userSchema);
///// --[@]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- -END-

///// --[#]-- [EXPORT USER MODEL] ----- >>>>>
  module.exports = userModel;
///// --[@]-- [EXPORT USER MODEL] ----- -END-