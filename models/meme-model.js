///// --[#]-- [REQUIRE] ----- >>>>>
  const mongoose = require('mongoose');
  const Schema   = mongoose.Schema;
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [JAVASCRIPT LOGIC] ----- >>>>>
///// --[@]-- [JAVASCRIPT LOGIC] ----- -END-

///// --[#]-- [USER SCHEMA] ----- >>>>>
  const memeSchema = new Schema
    ({
        memeName          : {type: String,  default: 'Untitled' },               //....post.data.title
        memeSource        : {type: String,  default: 'The Darkwebz apparently'}, //....post.data.subreddit_name_prefixed || post.data.domain
        originalPoster    : {type: String,  default: 'Unknown'}, //....................post.data.author
        sharedBy          : {type: String}, //.........................................currentUser.fullname
        fileURL           : {type: String}, //.........................................post.data.url
        thumbnailURL      : {type: String,  default: '/images/default-thumbnail.jpg'}//post.data.thumbnail
        comments          : {type: Array,   default: []},//............................these will have to come from individual users.
        upVotes           : {Type: Number,  default: 0},//.............................increment similarly to user's bagCount
        downVotes         : {type: Number,  default: 0},//.............................increments similarly to user's bagCount
        nsfw              : {type: Boolean, default: false}//..........................always going to be false until I allow NSFW
      },
      {timestamps: true}
    );
///// --[@]-- [USER SCHEMA] ----- -END-

///// --[#]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- >>>>>
  const MemeModel = mongoose.model('Collection', memeSchema);
///// --[@]-- [CREATION OF USER MODEL BASED ON SCHEMA] ----- -END-

///// --[#]-- [EXPORT USER MODEL] ----- >>>>>
  module.exports = MemeModel;
///// --[@]-- [EXPORT USER MODEL] ----- -END-