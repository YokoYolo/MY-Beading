const express      = require('express');
const postReviewRouter   = express.Router();
const Post         = require('../models/post');


const User         = require('../models/user');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require("connect-ensure-login")


// create review
postReviewRouter.get ('/stories/:id/reviews/new', (req, res, next)=>{
    Post.findById (req.params.id)
        .then ((thePost)=>{
        res.render('blog_posts/post_review',{post: thePost, theUser: req.user})
    })
    .catch((err)=>{
        next (err)
    })
})

postReviewRouter.post('/stories/:id/reviews/create', (req, res, next) =>{
    const newReview = req.body;
    newReview.reviewer = req.user._id;
    newReview.date = Date.now();

    Post.findByIdAndUpdate (req.params.id, {$push: {reviews:newReview}})
        .then ((res) =>{
            res.redirect(`/stories/${req.params.id}`)
        })
        .catch((err)=>{
            next (err)
        })
});


// edit review
postReviewRouter.get('/stories/:id/reviews/:reviewIndex/edit', (req, res, next)=>{
    const postId = req.params.id;
    const reviewIndex = req.params.reviewIndex;

    Post.findById(postId)
        .then((thePost) =>{
            res.render('blog_posts/post_review_edit', {post: thePost, review: thePost.reviews[reviewIndex], ri:reviewIndex, theUser: req.user});
        })
        .catch((err)=>{
            next(err);
        })
})

// update review
postReviewRouter.post('/stories/:id/reviews/:reviewIndex/update', (req, res, next)=>{
    const postId = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    theUser = req.user
    const newReview = req.body
    newReview.reviewer =  req.user.id
    newReview.date = Date.now();
    Post.findById(postId)
        .then((post)=>{
            post.reviews[reviewIndex] = newReview;
            post.save()
                .then(()=>{
                    res.redirect(`/stories/${postId}`)
                })
        })
    .catch((err)=>{
        next(err);
    })  
})

// delete review
postReviewRouter.post('/stories/:id/reviews/:reviewIndex/delete', (req, res, next)=>{
    const postId = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    Post.findById(postId)
        .then((thePost) =>{
            thePost.reviews.splice(reviewIndex, 1); 
            thePost.save()
            .then ((x)=>{
                res.redirect(`/stories/${req.params.id}`);
            })
            .catch((err)=>{
                next(err);
            })
        })
    .catch((err)=>{
            next(err);
    });
})

module.exports = postReviewRouter;