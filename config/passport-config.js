///// --[#]-- [SETUP] ----- >>>>>
  const passport        = require     ('passport');
  const LocalStrategy   = require     ('passport-local').Strategy;
  const FbStrategy      = require     ('passport-facebook').Strategy;
  const GoogleStrategy  = require     ('passport-google-oauth').OAuth2Strategy;
  const bcrypt          = require     ('bcrypt');
  const UserModel       = require     ('../models/user-model.js');
    let bloppoDoggo     = console.log ('"Bloppo Doggo, The Error Overlord" is appeased.');
///// --[@]-- [SETUP] ----- -END-

///// --[#]-- [SERIALIZE USER] ----- >>>>>

  /* * * * * * * * * * * * * * * * * * *
   * Saves only the user's database ID *
   * when they log in                  *
   * * * * * * * * * * * * * * * * * * */

      passport.serializeUser
      (
        (userFromDb, next) =>
        {
          console.log(userFromDb);
          next(null, userFromDb._id);
        }
      );
///// --[@]-- [SERIALIZE USER] ----- -END-

///// --[#]-- [DESERIALIZE USER] ----- >>>>>

  /* * * * * * * * * * * * * * * * * * * * * *
   * Uses the saved User ID to retrieve      *
   * the user's information when they visit  *
   * * * * * * * * * * * * * * * * * * * * * */

  passport.deserializeUser
        ((idFromBowl, next) =>
        {
          UserModel.findById
          (
            idFromBowl,
            (err, userFromDb) =>
            {
              if (err) {
                next(err);
                return;
              }
              next(null, userFromDb);
            }
          )
        });
///// --[@]-- [DESERIALIZE USER] ----- -END-

///// --[#]-- [AUTHENTICATION STRATEGIES] ----- >>>>>


  ///// --[#]-- [USERNAME AND PASSWORD] ----- >>>>>
    passport.use(new LocalStrategy
        (
          {             //Settings Object
          usernameField: 'loginUsername',
          passwordField: 'loginPassword'
        },  (formUsername, formPassword, next) =>
            //Callback when user attempts to login
              {
                UserModel.findOne({username: formUsername},(err, userFromDb) =>
                {
                  if (err)
                  {
                    next(err);
                    return;
                  }
                  if (userFromDb === null)
                  {  /* If you call the next function with false
                      * in second argument, that means login failed
                      */
                    next(null, false);
                    return;
                  }
                  if (bcrypt.compareSync(formPassword, userFromDb.obsfpassword) === 'false')
                  {
                    next(null, false);
                    return;
                  }
                  next(null, userFromDb); //SUCCESS
                }
              )}
        ));
  ///// --[@]-- [USERNAME AND PASSWORD] ----- -END-

  ///// --[#]-- [FACEBOOK AUTH] ----- >>>>>
     /* * * * * * * * * * * * * * * * * * * * *
      * Recieves facebook user                *
      * information and saves it to DB,       *
      * unless it has been previously saved,  *
      * then we just log them in.             *
      * * * * * * * * * * * * * * * * * * * * */


      passport.use(new FbStrategy
      (
        {     // 1st Argument -> settings object
          clientID    : process.env.FBID,
          clientSecret: process.env.FBSEC,
          callbackURL : '/auth/facebook/callback'
        },
        (accessToken, refreshToken, profile, next) => // 2nd Argument -> callback
            {

              UserModel.findOne
              (
                {facebookId: profile.id},
                (err, userFromDb) =>
                /*
                * 'userFromDb' will be empty if
                * this is the first time the user logs in with facebook.
                */
                {
                  if (userFromDb) {
                    next(null, userFromDb);
                    return;
                  }
                  /*
                  * If its their first time,
                  * save them to DB.
                  */
                  const newUser = new UserModel
                  (
                    {
                      fullname  : profile.displayName,
                      facebookID: profile.id
                    }
                  );
                  newUser.save((err) =>
                  {
                    if (err) {
                      next(err);
                      return;
                    }
                    next(null, newUser);
                  });
                });
            }
      ));
  ///// --[@]-- [FACEBOOK AUTH] ----- -END-

  ///// --[#]-- [GOOGLE AUTH]----- >>>>>
     /* * * * * * * * * * * * * * * * * * * * *
      * Recieves google+ user                *
      * information and saves it to DB,       *
      * unless it has been previously saved,  *
      * then we just log them in.             *
      * * * * * * * * * * * * * * * * * * * * */


    passport.use(new GoogleStrategy
      (
        {
          clientID: process.env.GID,
          clientSecret: process.env.GSEC,
          callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) =>
          {

              console.log('');
              console.log(' ----- GOOGLE PROFILE INFO ----- >>>>>> ');
              console.log(profile);
              console.log('');
              console.log('Access Token: ' + accessToken);
              console.log('');
              console.log('Refresh Token: ' + refreshToken);

          UserModel.findOne
            (
              { googleID: profile.id },
                (err, user) =>
                  {
                    if (err) {
                      return done(err);
                    }
                    if (user) {
                      return done(null, user);
                    }

                    const newUser = new UserModel({
                      googleID: profile.id,
                      fullname: profile.displayName
                    });

            newUser.save((err) => {
              if (err) {
                return done(err);
              }
              done(null, newUser);
            });
          });

        }
      ));
  ///// --[@]-- [GOOGLE AUTH]----- -END-


///// --[@]-- [AUTHENTICATION STRATEGIES] ----- -END-