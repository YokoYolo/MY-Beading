const express = require('express');
const itemRouter  = express.Router();
const Item   = require ('../models/item');
const User   = require ('../models/user');



itemRouter.get('/gallery', (req, res, next)=>{
    Item.find()
    .then((listOfItems)=>{
    res.render('item/items_list', {itemsArray: listOfItems, theUser: req.user});
    })
    .catch((err)=>{
        next(err);
    })
})


itemRouter.get('/gallery/:id', (req, res, next)=>{
    const id = req.params.id
    Item.findById(id)
    .populate ('reviews.reviewer')
    .then((theItem)=>{
        theItem.reviews.forEach(oneReview => {
            if (req.user) {
            if (oneReview.reviewer.equals(req.user.id)) {
                oneReview.mine = true;
            }
        }});
        res.render('item/item', {item: theItem, theUser: req.user })
    })
    .catch((err)=>{
        next(err);
    })

});


module.exports = itemRouter;
