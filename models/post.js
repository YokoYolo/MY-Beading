
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  // image: String,
  description: String,
  image: String, 
  shortdescription: String,
  reviews:[{title: String, content: String, reviewer:{type: Schema.Types.ObjectId, ref: 'User' }, date: Date  }]
,},
  {timestamps: true}, 
);
const Post = mongoose.model("Post", postSchema);



module.exports = Post;
