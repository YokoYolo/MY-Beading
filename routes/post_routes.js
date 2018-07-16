const express      = require('express');
const postRouter   = express.Router();
const User         = require('../models/user');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');

postRouter.get('/blog', (req, res, next) => {
    res.render('blog_posts/posts', { theUser: req.user });
  });

module.exports = postRouter;