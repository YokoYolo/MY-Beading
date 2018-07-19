const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const itemsSchema = new Schema({
  title: String,
  price: Number,
// price: NumberDecimal( "0.01" ),
  image: String,
  description: String,
  shortdescription: String,
  reviews:[{title: String, content: String, reviewer:{type: Schema.Types.ObjectId, ref: 'User' }, date: Date  }]
,}, 
  {timestamps: true});


const Item     = mongoose.model("Item", itemsSchema);

module.exports = Item;
