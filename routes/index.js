const express = require('express');
const router  = express.Router();
const User       = require('../models/user')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { theUser: req.user });
});


router.get('/about-us', (req, res, next) => {
  res.render('nav/about_us', { theUser: req.user });
});

router.get('/contact-page', (req, res, next) => {
  res.render('nav/contact_us', { theUser: req.user });
});

router.get('/shipping', (req, res, next) => {
  res.render('nav/shipping_info', { theUser: req.user });
});

module.exports = router;

