///// --[#]-- REQUIRE ----- >>>>>
  const express         = require('express');
  const router          = express.Router();

  const MemeModel       = require('../models/meme-model.js');
  const MemebagModel    = require('../models/memebag-model.js');
  const UserModel       = require('../models/user-model.js');

  const multer          = require('multer');
  const reddit          = require('redditor');
  const giphy           = require('giphy-wrapper')(process.env.giphyAPI);
///// --[@]-- REQUIRE ----- -END-

///// --[#]-- [COLLECTION ROUTES] ----- >>>>>


router.get('/discover',
  (req, res, next) =>
    {
      mode = 'giphy'; // change to be equal to a param sent from discover link
      if (mode === 'reddit')
      {
              let RedditDiscoverType = 'r/reallifedoodles'; // change to be equal to a param that is sent from each link in discover
              res.locals.subreddit = RedditDiscoverType;
              console.log('');
              console.log('');
              console.log('Subreddit: ' + RedditDiscoverType);
              console.log('');

              reddit.get(RedditDiscoverType+'.json', function(err, response) {
                if(err) throw err;

                res.locals.dankSource = mode;
                res.locals.response = response.data.children;
                res.render('collections/discover.ejs');
        });
      }
      else if (mode === 'giphy')
      {
              giphy.search('random', 10, 0, 'pg',function (err, data) {
                if(err) throw err;

                res.locals.dankSource = mode;
                res.locals.response   = data.data;
                res.render('collections/discover.ejs');

    // use data, returns the data as an object
});
      }
});


  router.get('/collections/new',
    (req, res, next) =>
      {
        if (!req.user) {
          res.redirect('/login');
          return;
        }
            res.render('collections/new-collection-view.ejs');
      }
  );

  /* Save to meizer notes! */
  // Step 1: create uploader (object) that saves files in a specific folder
  const fileUploader = multer
    (
      {
      dest: __dirname + '/../public/uploads/'
      //Destination folder for uploaded files (multer setting)
      // __dirname is built in node.js folder that refers to current directory
      }
    );
  // post routes can handle multiple arguments,
  // first is route, last is callback, but everything else is custom
  //////////////////////////////

  router.post(
    '/collections', // route link
    fileUploader.single('fileURL'), // single means 'use multer to process a single file' | matches input field name in view
    (req, res, next) => // callback
      {
        let dbFile;
          if (typeof req.file === 'undefined') {
            dbFile = req.body.linkURL;
          } else {
            dbFile = /uploads/ + req.file.filename;
          }
        const theBag = new MemebagModel
        ({
          collectionName    : req.body.collectionName,
          collectionDetails : req.body.collectionDetails,
          collectionCategory: req.body.collectionCategory,
          fileURL           : dbFile, // directory multer creates, and filename is randomized by multer. multer creates req.file.
          owner             : req.user.fullname,
          ownerByID         : req.user._id,
        });
        console.log(req.file);
        theBag.save((err) =>
        {
          if(err) {
            next(err);
            return;
          }
          UserModel.findByIdAndUpdate(req.user._id,{
                $set: {bagCount : req.user.bagCount + 1}
          }, (err, result) => {
            if (err){
              next(err);
              return;
            }
            res.redirect('/collections');
          });
        });
      });

  // router.post(
  //   '/add/:sack',
  //     (req, res, next) => {

  //     }
  //     const theMeme = new MemeModel
  //   ({
  //       collectionName    : {type: String, default: 'Untitled Collection'},//Should never actually store as Untitled. require user to name it.
  //       collectionCatgory : {type: String, default: 'Uncategorized'},//......Will This actually be used? Remove if not.
  //       collectionDetails : {type: String},//................................Should never be blank. Required data from users.
  //       owner             : {type: String, default: 'Unknown'},//............Autofilled from currentUser | req.user
  //       ownerByID         : {type: String},//................................May not need this now that serialization is working
  //       itemCount         : {type: Number, default: 0},//....................Should increment and decrement when a bag is crated or deleted
  //       fileURL           : {type: String},//................................Thumbnail URL
  //       ALLtheMemes       : {type: Array,  default: []},//...................An array of every meme saved do this bag.
  //       comments          : {type: Array, default: []}//.....................An array that stores any comment made by users that bag was shared with.
  //     },
  //     {timestamps: true}
  //   );
  // )

  router.get('/collections',
    (req, res, next) =>
      {
        if (req.user === undefined) {
          res.redirect('/login');
        }
        if (req.user.bagCount === 0) {
          res.redirect('/collections/new');
        }
        MemebagModel.find
        (
          {ownerByID: req.user._id},

          (err, collectionResults) =>
            {
              if (err) {
                next(err);
                return;
              }
              res.locals.currentUser = req.user;
              res.locals.alltheBags = collectionResults;
              res.render('collections/test-collection.ejs');
            }
        );
      });
///// --[@]-- [COLLECTION ROUTES] ----- -END-

///// --[#]-- [JAVASCRIPT LOGIC] ----- >>>>>

///// --[@]-- [JAVASCRIPT LOGIC] ----- -END-

///// --[#]-- [EXPORT] ----- >>>>>
  module.exports = router;
///// --[@]-- [EXPORT] ----- -END-