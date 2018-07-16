const mongoose = require('mongoose');
const Item = require('../models/item');

const dbName = 'miss-yoko-beading'
mongoose.connect(`mongodb://localhost/${dbName}`);

const items = [
    {
         title: 'thingi',
         price: '69.00',
         image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg',
         description: 'coolthingi',
      shortdescription: 'cool',
    },
    {
        title: 'thingi2',
        price: '38.00',
        image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_UX182_CR0,0,182,268_AL_.jpg',
        description: 'coolthingi',
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





