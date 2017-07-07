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

  ///// --[#]-- [GET] [/DISCOVER] ----- >>>>>
    router.get('/discover',
      (req, res, next) =>
        {

          let searchWord = req.query.searchWord;
          const mode       = req.query.modeSelecta;
          res.locals.mode = mode;
          if (typeof searchWord === undefined)
            res.redirect('/');
          {
          }
          if (mode === 'reddit')
          {
                  // console.log(req.body.searchWord);

                  console.log('');
                  console.log('');
                  console.log('Subreddit: ' + searchWord);
                  console.log('');

                  reddit.get('r/' + searchWord + '.json', function(err, response) {
                    if(err) throw err;

                    res.locals.dankSource = mode;
                    res.locals.response   = response.data.children;
                    res.render('collections/discover.ejs');
            });
          }
          else if (mode === 'giphy')
          {
                  let giphySearch = searchWord;
                  giphy.search(giphySearch, 10, 0, 'pg',function (err, data) {
                    if(err) throw err;

                    res.locals.searchWord = giphySearch;
                    res.locals.dankSource = mode;
                    res.locals.response   = data.data;
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
                            console.log(collectionResults);
                            res.render('collections/discover.ejs');
                          }
                      );
        // use data, returns the data as an object
    });
          }
    });
  ///// --[@]-- [GET] [/DISCOVER] ----- -END-

  ///// --[#]-- [GET] [/COLLECTIONS/NEW] ----- >>>>>
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
    const fileUploader = multer
      (
        {
        dest: __dirname + '/../public/uploads/'
        }
      );
  ///// --[@]-- [GET] [/COLLECTIONS/NEW] ----- -END-

  ///// --[#]-- [GET] [/COLLECTIONS] ----- >>>>>
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
                  res.render('collections/bag-collection.ejs');
                }
            );
          });
  ///// --[@]-- [GET] [/COLLECTIONS] ----- -END-

  ///// --[#]-- [POST] [/COLLECTIONS] ----- >>>>>
      //////////////////////////////////////////////////////////////////////
      // post routes can handle multiple arguments,     a                 //
      // first is route, last is callback, but everything else is custom  //
      //////////////////////////////////////////////////////////////////////

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
  ///// --[@]-- [POST] [/COLLECTIONS] ----- -END-

  ///// --[#]-- [MEMES_IN_A_BAG] ----- >>>>>
    router.get
      ('/memes_in_a_bag/:bagName',
        (req, res, next) =>
          {
            if(!req.user) {
              res.redirect('/login');
            }
            MemebagModel.findOne
              (
                {collectionName : req.params.bagName},
                (err, theBag) =>
                  {
                    if (err) {
                      next(err);
                      return;
                    }
                    res.locals.currentUser = req.user;
                    res.locals.theBag      = theBag;
                    console.log('----------');
                    console.log('--------------------');
                    console.log('------------------------------');
                    console.log(theBag);
                    console.log('------------------------------');
                    console.log('--------------------');
                    console.log('----------');
                    res.render('collections/memes-in-a-bag.ejs');
                  }
              );
            //hardcoded placeholders to layout memeview
          }
      );
  ///// --[@]-- [MEMES_IN_:BAG] ----- -END-

  ///// --[#]-- [ADD TO BAG]----- >>>>>
    router.post
      ('/add-to-bag',
        (req, res, next) =>
          {
            if(!req.user) {
              res.redirect('/login');
            }
            if (req.body.mode === 'giphy')
            {
            const theMeme = new MemeModel
              ({
                memeName          : req.body.memeName,
                memeSource        : req.body.memeSource,
                sharedBy          : req.body.sharedBy,
                fileURL           : req.body.fileURL,
                mode              : req.body.mode
              });
            MemebagModel.findByIdAndUpdate(req.body.targetBag,
              {
              $push : {ALLtheMemes : theMeme}
              }, (err, result) => {
                if(err){
                  next(err);
                  return;
                }
                res.redirect('/discover?searchWord=' + searchWord);
              }
            );
            }
            if (req.body.mode === 'reddit')
            {

            }
          }
      );
  ///// --[@]-- [ADD TO BAG]----- -END-

///// --[@]-- [COLLECTION ROUTES] ----- -END-

///// --[#]-- [JAVASCRIPT LOGIC] ----- >>>>>
  // function changeMode(mode, searchString) {
  //   if (mode === 'reddit') {
  //     return 'reddit';
  //   }
  //   if (mode === 'giphy') {
  //     return 'giphy';
  //   }
  // }
///// --[@]-- [JAVASCRIPT LOGIC] ----- -END-

///// --[#]-- [EXPORT] ----- >>>>>
  module.exports = router;
///// --[@]-- [EXPORT] ----- -END-