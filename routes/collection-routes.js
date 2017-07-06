///// --[#]-- REQUIRE ----- >>>>>
  const express         = require('express');
  const router          = express.Router();

  const CollectionModel = require('../models/collection-model.js');
  const UserModel       = require('../models/user-model.js');

  const multer          = require('multer');
  const reddit          = require('redditor');
///// --[@]-- REQUIRE ----- -END-

///// --[#]-- [COLLECTION ROUTES] ----- >>>>>

router.get('/discover',
  (req, res, next) =>
    {
      mode = 'reddit'; // change to be equal to a param sent from discover link
      if (mode === 'reddit')
      {
              let RedditDiscoverType = '/r/gifs'; // change to be equal to a param that is sent from each link in discover
              res.locals.subreddit = RedditDiscoverType;
              console.log('');
              console.log('');
              console.log('Subreddit: ' + RedditDiscoverType);
              console.log('');
              reddit.get(RedditDiscoverType+'.json', function(err, response) {
            if(err) throw err;
            // response.data.children.forEach(function(post) {
            // console.log(post.data.url); //
            // });

            res.locals.redditResponse = response.data.children;
            res.render('collections/discover.ejs');
        });
      }
      else if (mode === 'giphy')
      {

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

        const theCollection = new CollectionModel
        ({
          collectionName    : req.body.collectionName,
          collectionDetails : req.body.collectionDetails,
          collectionCategory: req.body.collectionCategory,
          fileURL           : /uploads/ + req.file.filename, // directory multer creates, and filename is randomized by multer. multer creates req.file.
          owner             : req.user.fullname,
          ownerByID         : req.user._id,
        });
        console.log(req.file);
        theCollection.save((err) =>
        {
          if(err) {
            next(err);
            return;
          }
          req.user.bagCount += 1;
          res.redirect('/collections');
        });
      });

  router.get('/collections',
    (req, res, next) =>
      {
        if (req.user === undefined) {
          res.redirect('/login');
        }
        if (req.user.bagCount === 0) {
          res.redirect('/collections/new');
        }
        CollectionModel.find
        (
          {ownerByID: req.user._id},

          (err, collectionResults) =>
            {
              if (err) {
                next(err);
                return;
              }
              res.locals.currentUser = req.user;
              res.locals.allTheCollections = collectionResults;
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