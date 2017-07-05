///// --[#]-- [REQUIRE] ----- >>>>>
  const express      = require('express');
  const path         = require('path');
  const favicon      = require('serve-favicon');
  const logger       = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser   = require('body-parser');
  const layouts      = require('express-ejs-layouts');
  const mongoose     = require('mongoose');
  const partial      = require('express-partials');
  const session      = require('express-session');
  const passport     = require('passport');
  // const react        = require('react');

  require('dotenv').config();

  // Pull all the code from inside of passport-config.js
  require('./config/passport-config.js');
///// --[@]-- [REQUIRE] ----- -END-

/* DB Connect */
  mongoose.connect(process.env.MONGODB_URI);
/* ---------- */

///// --[#]-- [APP] ----- >>>>>
  const app = express();


  ///// --[#]-- [VIEW ENGINE SETUP] ----- >>>>>
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
  ///// --[@]-- [VIEW ENGINE SETUP] ----- -END-

  ///// --[#]-- [TITLE AND FAVICON] ----- >>>>>
    app.locals.title = 'AudioWall - sample and loop sharing by musicians for musicians';
    app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
  ///// --[@]-- [TITLE AND FAVICON] ----- -END-



  ///// --[#]-- [APP INCLUDES]      ----- >>>>>
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(layouts);
    app.use
      (
      session
        ({
          secret: 'sadfkayf987asfuahsdfojq34h5oiushfdOI&^SD(F&^SDFU43i24uioerug8ds',
          resave: true,
          saveUninitialized: true
        })
      );
  ///// --[@]-- [APP INCLUDES]      ----- -END-

  ///// --[#]-- [ROUTES]            ----- >>>>>

    ///// --[#]-- [MIDDLEWARES]----- >>>>>
      app.use(passport.initialize());
      app.use(passport.session   ());



      app.use((req, res, next) => {
         res.locals.userDude = 'test';
        if (req.user)
        //req.user defined by passport middleware
        {
          res.locals.currentUser = req.user;
          console.log(req.user);
        }
        next();
      });
    ///// --[@]-- [MIDDLEWARES]----- -END-

    const index            = require('./routes/index');
          app.use('/', index);

    const authentication   = require('./routes/authentication.js');
          app.use('/', authentication);

    const collectionRoutes = require('./routes/collection-routes.js');
          app.use('/', collectionRoutes);

  ///// --[@]-- [ROUTES]            ----- -END-

  ///// --[#]-- [ERROR HANDLING]    ----- >>>>>
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  ///// --[@]-- [ERROR HANDLING]    ----- -END-

  module.exports = app;
///// --[@]-- [APP] ----- -END-











