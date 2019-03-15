const express = require('express');
// const find = require('lodash/find');
// const isEqual = require('lodash/isEqual');
const auth = require('../auth');
const { strategy } = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else if (req.isAuthenticated()) {
    res.render('index', {
        title: 'Welcome',
        message: 'You can access this resource',
    });
  } else {
    res.redirect('/unauthorized');
  }
});

router.get('/login', auth.authenticate(strategy, { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.get('/token', auth.authenticate(strategy, { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/unauthorized', (req, res) => {
  res.status(401);
  res.render('error', {
    error: 'Unauthorized',
    message: 'You cannot access this resource',
  });
});


module.exports = router;