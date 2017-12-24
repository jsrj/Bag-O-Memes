///// --[#]-- [REQUIRE] ----- >>>>>
  const express   = require('express');
  const router    = express.Router();

  const UserModel = require('../models/user-model.js');
  const bcrypt    = require ('bcrypt');
  const passport  = require('passport');
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [ROUTES] ----- >>>>>

  ///// --[#]-- [REGISTRATION] ----- >>>>>
    router.get('/register', (req, res, next) =>
    {
      res.render('user/register.ejs');
    });

    router.post('/register', (req, res, next) =>
    {

    if (req.body.signupUsername === '' // Username is empty?
        &&
        req.body.signupPassword !== '' // Password is not empty?
        ) {
          res.locals.usernameErrorMessage = 'Please provide a username.';
          res.render('user/register.ejs');
          return;
        }

    if (req.body.signupUsername !== '' // Username is not empty?
        &&
        req.body.signupPassword === '' // Password is empty?
        ) {
          res.locals.passwordErrorMessage = 'Please provide a password.';
          res.render('user/register.ejs');
          return;
        }

    if (
        req.body.signupUsername === '' // Username is empty?
        &&
        req.body.signupPassword === '' // Password is empty?
        ) {
          res.locals.usernameErrorMessage = 'Please provide a username.';
          res.locals.passwordErrorMessage = 'Please provide a password.';
          res.render('user/register.ejs');
          return;
        }

          UserModel.findOne({username: req.body.signupUsername},(err, userFromDb) =>
          {
            if (userFromDb)
            {
              res.locals.usernameErrorMessage = 'Sorry, but that username is taken.';
              res.render('user/register.ejs');
              return;
            }
            const salt              = bcrypt.genSaltSync(10);
            console.log('');
            console.log('SALT SALT SALT SALT SALT: ' + salt);
            const scrambledPassword = bcrypt.hashSync  (req.body.signupPassword, salt);
            console.log('SIGN UP PASSWORD: ' + req.body.signupPassword);
            console.log('SCRAMBLED PASSWORD: ' + scrambledPassword);
            console.log('');
            const theUser           = new    UserModel
            ({
              fullname    : req.body.signupFullName,
              username    : req.body.signupUsername,
              obsfpassword: scrambledPassword,
              email       : req.body.signupEmail
            });
            theUser.save((err) =>
            {
              if (err)
              {
                console.log(err);
                next (err);
                return;
              }
              res.redirect('/login');
            });
          });
        });
  ///// --[@]-- [REGISTRATION] ----- -END-

  ///// --[#]-- [FACEBOOK AUTH] ----- >>>>>
    router.get
      (
      '/auth/facebook',
      passport.authenticate('facebook')
      );

    router.get
      (
      '/auth/facebook/callback',
      passport.authenticate
        ('facebook',
          {
            successRedirect: '/',
            failureRedirect: '/login'
          }
        )
      );
  ///// --[@]-- [FACEBOOK AUTH] ----- -END-

  ///// --[#]-- [GOOGLE AUTH] ----- >>>>>
    router.get
      (
        "/auth/google",
        passport.authenticate("google",
        {
          scope: [
                  "https://www.googleapis.com/auth/plus.login",
                  "https://www.googleapis.com/auth/plus.profile.emails.read"
                  ]
        }
      ));

    router.get
      (
        "/auth/google/callback",
        passport.authenticate
          ("google",
            {
              failureRedirect: "/login",
              successRedirect: "/"
            }
          )
      );
  ///// --[@]-- [GOOGLE AUTH] ----- -END-

  ///// --[#]-- [LOG IN] ----- >>>>>
      router.get('/login',
      (req, res, next) =>
      {
        res.render('user/login.ejs');
      });

    router.post('/login',
      passport.authenticate
        (
          'local', // 1st Argument: Name of Strategy
          {        // 2nd Argument: Settings Object
            successRedirect: '/',
            failureRedirect: '/login'
          }
        ));
  ///// --[@]-- [LOG IN] ----- -END-

  ///// --[#]-- [LOG OUT] ----- >>>>>
      router.get('/logout',
        (req, res, next) =>
        {
          req.logout();
          res.redirect('/');
        }
      );
  ///// --[@]-- [LOG OUT] ----- -END-

///// --[@]-- [ROUTES] ----- -END-

module.exports = router;
