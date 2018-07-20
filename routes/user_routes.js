const express      = require('express');
const userRouter   = express.Router();
const User         = require('../models/user');
const bcrypt       = require('bcryptjs');
const passport     = require('passport');
const ensureLogin = require("connect-ensure-login")
const uploadCloud = require("../config/cloudinary")




userRouter.get('/signup', (req, res, next)=>{

    res.render('user/create_acc');
})

userRouter.post('/signup', uploadCloud.single('theImage'), (req, res, next)=>{
    const thePassword = req.body.thePassword;
    const theUsername = req.body.theUsername;
    const theEmail = req.body.theEmail;
    const theName = req.body.theName;
    const theLastName = req.body.theLastName;
    const theImage = req.file.url;
    if(thePassword === "" || theUsername === ""){
        res.render('user/create_acc', {errorMessage: 'Please fill in both a username and password in order to create an account'})
        return;
    }
    User.findOne({'username': theUsername})
    .then((responseFromDB)=>{
        if (responseFromDB !== null){
            res.render('user/create_acc', {errorMessage: `Sorry, the username ${theUsername} is awesome, so you cant have it. Too late! Be a beta tester next time`})
            return;
        } 
            const salt     = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(thePassword, salt);
            User.create({username: theUsername, password: hashedPassword, email: theEmail, name: theName, lastname: theLastName, image: theImage })
            .then((response)=>{
                res.redirect('/login');
            })
            .catch((err)=>{
                next(err);
            })
    }) 

}); 

userRouter.get('/login', (req, res, next)=>{
    res.render('user/login_acc', { message: req.flash("error") });
});


userRouter.post("/login", passport.authenticate("local", {
// userRouter.post("/login", passport.createStrategy("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));


// userRouter.get("/login/facebook", passport.authenticate("facebook"));
// userRouter.get("/login/facebook/callback", passport.authenticate("facebook", {
//     successRedirect: "/user/private",
//     failureRedirect: "/login"
//   }));

// userRouter.get('/login/google',
//     passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }),
// userRouter.get('/login/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//      function(req, res) {
//     res.redirect('/user/private');
//   }));

ensureLogin.ensureLoggedIn()

userRouter.get("/logout", (req, res, next) => {
      req.logout();
      res.redirect("/login");
  });



module.exports = userRouter;