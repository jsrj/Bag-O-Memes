const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('index');
});

router.get('/profile', (req, res, next) => {

  res.render('profile');
});

router.get('/register', (req, res, next) => {

  res.render('user/register');
});

module.exports = router;

let indexError = console.log('Index.JS is Error Free.');
