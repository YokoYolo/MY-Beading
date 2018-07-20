const mongoose = require('mongoose');
const Item = require('../models/item');

const dbName = 'miss-yoko-beading'
mongoose.connect(`mongodb://localhost/${dbName}`);

const items = [
    {
         title: 'Forest Pearl',
         price: '69.00',
         image: 'https://res.cloudinary.com/miss-yoko-beading/image/upload/v1532031510/N1.jpg',
         description: 'Handmade necklace with rainforest Jasper and river pearl',
         itemtype: 'Necklace',
      shortdescription: 'Handmade necklace with rainforest Jasper and river pearl',
    },

    {
        title: 'thingi2',
        price: '38.00',
        image: 'https://res.cloudinary.com/miss-yoko-beading/image/upload/v1532031510/N1.jpg',
        description: 'coolthingi',
        itemtype: 'Earings',
        shortdescription: 'cool',
    },

    {
        title: 'thingi3',
        price: '38.00',
        image: 'https://res.cloudinary.com/miss-yoko-beading/image/upload/v1532031510/N1.jpg',
        description: 'coolthingi',
        itemtype: 'Bracelet',
        shortdescription: 'cool',
    }

]
Item.create(items)
  .then ((result)=>{
      console.log (`created ${result.length} items`);
      mongoose.disconnect();
  })
  .catch ((err)=>{
      console.log('error');
  })





