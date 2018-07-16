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
        res.send(err);
    })
})


itemRouter.get('/gallery/:itemId', (req, res, next)=>{
    const itemId = req.params.id
    Item.findById(itemId)
    .then((theItem)=>{
        res.render('item/item', {item: theItem})
    })
    .catch((err)=>{
        res.send(err);
    })

});


module.exports = itemRouter;
