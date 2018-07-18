
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  image: String,
  description: String,
  reviews:[{title: String, content: String, reviewer: String}],
    }, 

    {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
    }
});

const Post = mongoose.model("Post", moviesSchema);



module.exports = Post;
