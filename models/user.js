const mongoose = require('mongoose');
const Schema   = mongoose.Schema
,passportEmail = require('passport-email')
      ;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
    // facebookID: String,
    // googleID: String,
    image: String,},
    {timestamps: true}
  );


  const User = mongoose.model("User", userSchema);
  
  User.plugin(passportEmail);

  module.exports = User;





  // enum : ['GUEST', 'EDITOR', 'ADMIN'],
  //   default : 'GUEST'

  // billingAdress: {
  //   name:String,
  //   lastName: String,
  //   street:String,
  //   unit:String,
  //   city:String,
  //   state:String,
  //   zipCode:String,
  //   phoneNumber: Number
  // },
  // shippingAddress:{
  //   name:String,
  //   lastName2:String,
  //   street:String,
  //   unit:String,
  //   city:String,
  //   state:String,
  //   zipCode:String,
  //   phoneNumber: Number
  // },
  // timestamps: {
  //   createdAt: "created_at",
  //   updatedAt: "updated_at"
  //   }
