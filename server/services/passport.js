// Configuration for passport (a middleware for authenticating user)

// How it works?
// Incoming Request ---> Passport ---> Router Handler

// Passport can verity users with different strategies:
// - Verify user with JWT (what we use here);
// - Verify user with username and password;
// - ... (check http://passportjs.org/)

const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,  // for decoding JWT
};

// Create JWT strategy (authenticate user with JWT)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // the function will be called whenever we need to authenticate a user with a JWT token
  // - payload: decoded JWT token ('sub' and 'iat', refer to jwt.encode in authentication.js)
  // - done: a callback function we need to call depending on whether or not we are able to successfully authenticate this user

  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // Otherwise, call 'done' without a user object
  User.findById(payload.sub, function(err, user) {

    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Setup options for local strategy
const localOptions = { usernameField: 'email' };  // if you are looking for username, look for email (cause we use email here)

// Create local strategy (authenticate user with email and password)
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password
  // Call done with the user if it is the correct email and password
  // Otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {

    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });  // that last argument is the info argument to the authenticate callback
    }

    // Compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {

      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });  // that last argument is the info argument to the authenticate callback
      }

      // Found the user (email and password are correct), then assign it to req.user, which then be used in signin() in authentication.js
      return done(null, user);
    });
  });
});

// Tell passport to use these strategies
passport.use(jwtLogin);  // For making auth'd request
passport.use(localLogin);  // For signing in user