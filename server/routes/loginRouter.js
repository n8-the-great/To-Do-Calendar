const loginRouter   = require('express').Router();
const session       = require('express-session');
const passport      = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const auth          = require('../models/authentication/login.js');
// const hbs        = require('express-handlebars');
// const app        = express();

loginRouter.use(session({
  secret: "verygoodsecret",
  resave: false,
  saveUninitialized: true,
  // store: new MongoStore({mongooseConnection: mongoose.connection})
}));

loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  auth.User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new localStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          const newUser = new User({ email, password });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  return done(null, user);
                })
                .catch(err => {
                  return done(null, false, { message: err });
                });
            });
          });
        // Return other user
        } else {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Wrong password" });
            }
          });
        }
      })
      .catch(err => {
          return done(null, false, { message: err });
      });
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
};

// routes
loginRouter.route('/').get((req, res) => {
  console.log('login route');
  console.log(req.body);
  res.send('Login Router GET');
});

loginRouter.post('/password', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  });
});

loginRouter.route('/').post((req, res) => {
  console.log('login post route');
  console.log(req.body);
  res.send('Login Router POST');
});

loginRouter.route('/newUser').get((req, res) => {
  console.log('login route 2');
  res.send('Login Router GET');
});


module.exports = loginRouter;