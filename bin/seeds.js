const mongoose = require('mongoose');
const Item = require('../models/item');
const Post = require('../models/post');

// const dbName = 'miss-yoko-beading'
mongoose.connect(process.env.MONGODB_URI);

// `mongodb://localhost/${dbName}`
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

  const posts = [
      {
          title: 'Peyote Stitch Beading: A Tutorial for Getting Started',
          image: 'https://res.cloudinary.com/miss-yoko-beading/image/upload/v1532097543/folder-name/ja_delia.jpg.jpg',
          description: 'You may be familiar with bead weaving – either you’ve given it a go yourself, or you’ve seen other people’s work. Bead-woven work can be to be terribly daunting; it appears intricate and complex, and it certainly can be time-consuming! However, please don’t let first impressions put you off having a go. Yes, bead weaving takes time and patience, but it is very much worth the effort!',
          shortdescription: 'About Peyote Stitch technique',
      },
  
  ]
  
  Item.create(items)
  .then ((result)=>{
    Post.create(posts)
    .then ((result)=>{
      mongoose.disconnect();
  })})
  .catch ((err)=>{
      console.log('error');
  })
  