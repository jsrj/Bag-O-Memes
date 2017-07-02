///// --[#]-- [REQUIRE] ----- >>>>>
  const express      = require('express');
  const path         = require('path');
  const favicon      = require('serve-favicon');
  const logger       = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser   = require('body-parser');
  const layouts      = require('express-ejs-layouts');
  const mongoose     = require('mongoose');
///// --[@]-- [REQUIRE] ----- -END-

/* DB Connect */
  mongoose.connect('mongodb://localhost/contact-me');
/* ---------- */

///// --[#]-- [APP] ----- >>>>>
  const app = express();

  ///// --[#]-- [VIEW ENGINE SETUP] ----- >>>>>
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
  ///// --[@]-- [VIEW ENGINE SETUP] ----- -END-

  ///// --[#]-- [TITLE AND FAVICON] ----- >>>>>
    app.locals.title = 'Express - Generated with IronGenerator';
    app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
  ///// --[@]-- [TITLE AND FAVICON] ----- -END-

  ///// --[#]-- [APP INCLUDES] ----- >>>>>
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(layouts);
  ///// --[@]-- [APP INCLUDES] ----- -END-

  ///// --[#]-- [ROUTES] ----- >>>>>
    const index = require('./routes/index');
          app.use('/', index);
  ///// --[@]-- [ROUTES] ----- -END-

  ///// --[#]-- [ERROR HANDLING] ----- >>>>>
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
  ///// --[@]-- [ERROR HANDLING] ----- -END-

  module.exports = app;
///// --[@]-- [APP] ----- -END-











