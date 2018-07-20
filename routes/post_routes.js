const express      = require('express');
const postRouter   = express.Router();
const User         = require('../models/user');
const Post         = require('../models/post');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require("connect-ensure-login")

//create page Blog

postRouter.get('/blog', (req, res, next) => {
  Post.find()
  .then((listOfPosts)=>{
  res.render('blog_posts/posts', {postsArray: listOfPosts, theUser: req.user});
  })
  .catch((err)=>{
      next(err);
  })
  });

// create Blog post
postRouter.get('/blog/create', (req, res, next)=>{
  res.render('blog_posts/create_post', {theUser: req.user})
})

postRouter.post('/blog_posts/create_post', uploadCloud.single('oneImage'),(req, res, next)=>{
  const newpost = new Post({
   title: req.body.title,
   shortdescription: req.body.shortdescription,
   description: req.body.description,
   oneImage: req.file.url,
  //  date = Date.now(),
  //  reviews = [],
  })

newpost.save()
.then((response)=>{
  res.redirect('/blog')
})
.catch((err)=>{
  next(err);
}) 
})


// open Blog post

postRouter.get('/blog/:id', (req, res, next)=>{
  const id = req.params.id
  Post.findById(id)
  .then((thePost)=>{
      res.render('post', {post: thePost})
  })
  .catch((err)=>{
      next(err);
  })

});

//edit Blog post

postRouter.get('/blog/:id/edit', (req, res, next)=>{
  Post.findById(req.params.id)
  .then((thePost)=>{
  res.render('blog_posts/update_post', {mypost: thePost,  theUser: req.user})
  })
  .catch((err)=>{
      next(err);
  }) 
})

// update edited Blog post
postRouter.post('/blog/:id/update', (req, res, next)=>{
const postId = req.params.id;
theUser = req.user

const editedPost = {
   title: req.body.title,
   shortdescription: req.body.shortdescription,
   description: req.body.description,
  //  date = Date.now(),
   reviews: reviewer = req.user.id,
}

  Post.findByIdAndUpdate(postId, editedPost)
  .then(()=>{
      res.redirect('/blog/' + postId)
  })
  .catch((err)=>{
      next(err);
  })  
})

// delete Blog post

postRouter.post('/blog/:id/delete', (req, res, next)=>{
  Post.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/blog');
  })
  .catch((err)=>{
      next(err);
  })
})



module.exports = postRouter;