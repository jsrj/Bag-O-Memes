///// --[#]-- REQUIRE ----- >>>>>
  const express         = require('express');
  const router          = express.Router();

  const CollectionModel = require('../models/collection-model.js');
  const UserModel       = require('../models/user-model.js');
  const multer          = require('multer');
///// --[@]-- REQUIRE ----- -END-

///// --[#]-- [COLLECTION ROUTES] ----- >>>>>
  router.get('/collections/new',
    (req, res, next) =>
      {
        if (req.user) {
          res.render('collections/new-collection-view.ejs');
        } else {
          res.render('user/login.ejs');
        }
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
        let uniqueKey = '';
        let keymode   = '';
        if (req.user.googleID   !== 'none')
          {
            uniqueKey = req.user.googleID;
            req.user.userkey = uniqueKey;
            console.log('google');
          }
        else if (req.user.facebookID !== 'none')
          {
            uniqueKey = req.user.facebookID;
            req.user.userkey = uniqueKey;
            console.log('facebook');
          }
        else if (req.user.facebookID === 'none' && req.user.googleID === 'none')
          {
            uniqueKey = req.user.email;
            req.user.userkey = uniqueKey;
            console.log('classic');
          }

        const theCollection = new CollectionModel
        ({
          collectionName    : req.body.collectionName,
          collectionDetails : req.body.collectionDetails,
          collectionCategory: req.body.collectionCategory,
          fileURL           : /uploads/ + req.file.filename, // directory multer creates, and filename is randomized by multer. multer creates req.file.
          owner             : req.user.fullname,
          ownerByID         : uniqueKey,
        });
        console.log(req.file);
        theCollection.save((err) =>
        {
          if(err) {
            next(err);
            return;
          }
          res.redirect('/collections');
        });
      });

  router.get('/collections',
    (req, res, next) =>
      {
        if (req.user === undefined) {
          res.redirect('/login');
        }
        CollectionModel.find
        (
          {ownerByID: req.user.userkey},

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