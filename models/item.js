const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const itemsSchema = new Schema({
  title: String,
  price: String,
//price: NumberDecimal( "0.01" ),
  image: String,
  description: String,
  shortdescription: String,
  reviews:[{title: String, content: String, reviewer: String}],
}, 
  {timestamps: true});


const Item     = mongoose.model("Item", itemsSchema);

module.exports = Item;
