const express      = require('express');
const itemReviewRouter   = express.Router();
const Item       = require('../models/item');
const User       = require('../models/user');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');


// create review
itemReviewRouter.get ('/gallery/:id/reviews/new', (req, res, next)=>{
Item.findById (req.params.id)
.then ((theItem)=>{
res.render('item/reviews/item_review',{item: theItem, theUser: req.user})

})
.catch((err)=>{
    next (err)
})
})

itemReviewRouter.post('/gallery/:id/reviews/create', (req, res, next) =>{
    Item.findByIdAndUpdate (req.params.id, {$push: {reviews:req.body}})
    .then ((response) =>{
        res.redirect(`/gallery/${req.params.id}`)
    })
    .catch((err)=>{
        next (err)
    })
});

// delete review
itemReviewRouter.post('/gallery/:id/reviews/:reviewId/delete', (req, res, next)=>{
    const movieId = req.params.id;
    const reviewId = req.params.reviewId;
    Item.findById(itemId)
     .then((theItem) =>{
        theItem.reviews.splice(reviewId, 1); 
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

// edit review
itemReviewRouter.get('/gallery/:id/reviews/:reviewIndex/editReview', (req, res, next)=>{
        const itemId = req.params.id;
        const reviewIndex = req.params.reviewIndex;

    Item.findById(itemId)
        .then((theItem) =>{
            res.render('editReview', {item: theItem, review: theItem.reviews[reviewIndex], ri:reviewIndex});
    })
    })

itemReviewRouter.post('/gallery/:id/reviews/:reviewIndex/update', (req, res, next)=>{
        const itemID = req.params.id;
        const reviewIndex = req.params.reviewIndex;
        // const editedReview= req.body.reviewId
    Item.findById(itemID)
        .then((item)=>{
            item.reviews[reviewIndex] = req.body
            item.save()
            .then(()=>{
                res.redirect('/gallery/' + itemID)
            })
        })
        .catch((err)=>{
        next(err);
        })  
        })



module.exports = itemReviewRouter;




















module.exports = itemReviewRouter;