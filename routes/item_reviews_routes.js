const express      = require('express');
const itemReviewRouter   = express.Router();
const Item       = require('../models/item');
const User       = require('../models/user');
// const bcrypt       = require('bcryptjs');
// const passport     = require('passport');
// const ensureLogin = require("connect-ensure-login")

// create review
itemReviewRouter.get ('/gallery/:id/reviews/new', (req, res, next)=>{
    Item.findById (req.params.id)
        .then ((theItem)=>{
        res.render('item/item_review',{item: theItem, theUser: req.user})
    })
    .catch((err)=>{
        next (err)
    })
})

itemReviewRouter.post('/gallery/:id/reviews/create', (req, res, next) =>{
    const newReview = req.body;
    newReview.reviewer = req.user._id;
    newReview.date = Date.now();

    Item.findByIdAndUpdate (req.params.id, {$push: {reviews:newReview}})
        .then ((response) =>{
            res.redirect(`/gallery/${req.params.id}`)
        })
    .catch((err)=>{
        next (err)
    })
});


// edit review
itemReviewRouter.get('/gallery/:id/reviews/:reviewIndex/edit', (req, res, next)=>{
    const itemId = req.params.id;
    const reviewIndex = req.params.reviewIndex;

    Item.findById(itemId)
        .then((theItem) =>{
            res.render('item/item_review_edit', {item: theItem, review: theItem.reviews[reviewIndex], ri:reviewIndex, theUser: req.user});
    })
    .catch((err)=>{
        next(err);
    })
})

// update review
itemReviewRouter.post('/gallery/:id/reviews/:reviewIndex/update', (req, res, next)=>{
    const itemId = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    theUser = req.user
    const newReview = req.body
    newReview.reviewer =  req.user.id
    newReview.date = Date.now();
    Item.findById(itemId)
        .then((item)=>{
            item.reviews[reviewIndex] = newReview;
            item.save()
                .then(()=>{
                    res.redirect('/gallery/' + itemId)
                })
        })
    .catch((err)=>{
        next(err);
    })  
})

// delete review
itemReviewRouter.post('/gallery/:id/reviews/:reviewIndex/delete', (req, res, next)=>{
    const itemId = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    Item.findById(itemId)
        .then((theItem) =>{
            theItem.reviews.splice(reviewIndex, 1); 
            theItem.save()
            .then ((x)=>{
                res.redirect(`/gallery/${req.params.id}`);
            })
            .catch((err)=>{
                next(err);
            })
        })
    .catch((err)=>{
            next(err);
    });
})

module.exports = itemReviewRouter;
