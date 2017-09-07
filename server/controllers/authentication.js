const jwt = require('jwt-simple');
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');

// utility function: User ID + Timestamp + Secret String = JSON Web Token (JWT)
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
  // sub: subject (the very specific user)
  // iat: issued at time
}

exports.signup = function(req, res, next) {

  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !password) {
    return res.status(422).send({ message: 'You must provide both email and password.' });  // 422 refers to unprocessable entity
  }

  // See if a user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {

    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ message: 'This email is in use.' });  // 422 refers to unprocessable entity
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    user.save(function(err) {  // callback function
      if (err) {
        return next(err);
      }

      // Respond user request indicating the user was created
      res.json({ message: 'Congratulations! You have successfully signed up. You can sign in now.' });
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

exports.resetPassword = function(req, res, next) {

  // Require auth

  const curPassword = req.body.curPassword;
  const newPassword = req.body.newPassword;
  const user = req.user;

  // Compare passwords - Does the user provide correct old password?
  user.comparePassword(curPassword, function(err, isMatch) {

    if (err) {
      return next(err);
    }

    if (!isMatch) {
      return res.status(422).send({ message: 'You current password is incorrect! Please try again.' })
    }

    if (curPassword === newPassword) {
      return res.status(422).send({ message: 'Your new password must be different from your current password!' });
    }

    // Update password
    user.password = newPassword;

    // Save to DB
    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond user request indicating that the password was updated successfully
      res.json({ message: 'Congratulations! You have successfully updated your password.' });
    });
  });
};

exports.updateProfile = function(req, res, next) {

  // Require auth

  // Get updated profile info
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthday = req.body.birthday;
  const sex = req.body.sex;
  const phone = req.body.phone;
  const address = req.body.address;
  const occupation = req.body.occupation;
  const description = req.body.description;

  // Get user
  const user = req.user;

  // Update profile
  User.update({ _id: user._id }, { $set: {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    sex: sex,
    phone: phone,
    address: address,
    occupation: occupation,
    description: description,
  } }, function(err) {
    // callback function
    if (err) {
      return next(err);
    }
    res.send({ message: 'Congratulations! You have successfully updated your profile.' })
  });
};