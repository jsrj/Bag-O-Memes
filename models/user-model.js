///// --[#]-- [REQUIRE] ----- >>>>>
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [USER SCHEMA] ----- >>>>>
  const userSchema = new Schema
    ({
        fullname     : {type: String, default: 'Nameless User'},
        username     : {type: String, default: this.fullname},
        email        : {type: String, default: 'zxcvbn@qwerty.iop'},
        obsfpassword : {type: String},
        facebookID   : {type: String, default: 'none'},
        googleID     : {type: String, default: 'none'},
        bagCount     : {type: Number, default: 0}
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