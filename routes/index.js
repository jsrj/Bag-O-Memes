const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  activePage = 'home';
  console.log(activePage);
  res.locals.page = activePage;
  res.render('index');
});

router.get('/profile', (req, res, next) => {

  activePage = 'profile';
  console.log(activePage);
  res.locals.page = activePage;
  res.render('profile');
});

router.get('/register', (req, res, next) => {

  res.render('user/register');
});

router.get('/social', (req, res, next) => {

  res.render('user/social');
});

module.exports = router;
