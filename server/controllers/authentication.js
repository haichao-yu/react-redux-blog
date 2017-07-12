const jwt = require('jwt-simple');
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');

// User ID + Secret String = JSON Web Token (JWT)
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  // sub: subject (the very specific user)
  // iat: issued at time
}

exports.signup = function(req, res, next) {

  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  // See if a user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {

    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });  // 422 refers to unprocessable entity
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    });

    user.save(function(err) {  // callback function
      if (err) {
        return next(err);
      }

      // Respond user request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {

  // User has already had their email and password auth'd (through passport middleware [LocalStrategy])
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

/*
// https://github.com/jaredhanson/passport-local/issues/4

exports.signin = function(req, res, next) {
  passport.authenticate('local', { session: false }, function(err, user, info) {

    // console.log(err);
    // console.log(user);
    // console.log(info);  // info contains customized error message

    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    return res.send({ token: tokenForUser(user)});
  })(req, res, next);
};
*/