require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const app           = express();
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const flash         = require('connect-flash');
const ensureLogin   = require('connect-ensure-login');
const FbStrategy    = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const Item         = require('./models/item');
const User         = require('./models/user');

// res.render("site/index", { apiKey: "AIzaSyCTxsFM2Bbm4KEtuFAmdu11WF3s3zUliwU" });

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


  // mongodb://localhost/miss-yoko-beading
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());


passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({username} , (err, user) => {
        if (err) {
          return next (err);
        }

        if (!user) {
          return next(null, false, { message: "Incorrect username" });
        }
    
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
  });
}));



// passport.use(new LocalStrategy((username, password, email, next) => {
//   User.findOne({user: username} || {email: email}, (err, user) => {
//       if (err) {
//         return next (err);
//       }

//       if (!user || !email) {
//         return next(null, false, { message: "Incorrect username" });
//       }
//       else if (!email) {
//         return next (null, false, { message: "Incorrect email" });
//       }

//       if (!bcrypt.compareSync(password, user.password)) {
//         return next(null, false, { message: "Incorrect password" });
//       }

//       return next(null, user);
// });
// }));


passport.use(new GoogleStrategy({
    consumerKey: 'GOOGLE_CONSUMER_KEY',
    consumerSecret: 'GOOGLE_CONSUMER_SECRET',
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));


passport.use(new FbStrategy({
  clientID: "your Facebook client id here",
  clientSecret: "your Facebook client secret here",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));




app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
app.use('/', index);

const itemRoutes = require('./routes/item_routes');
app.use('/' , itemRoutes);

const itemReviewsRoutes = require('./routes/item_reviews_routes');
app.use('/', itemReviewsRoutes);

const postRoutes = require('./routes/post_routes');
app.use('/' , postRoutes);

const postReviewsRoutes = require('./routes/post_reviews_routes');
app.use('/', postReviewsRoutes);

const userRoutes = require('./routes/user_routes');
app.use('', userRoutes);



module.exports = app;