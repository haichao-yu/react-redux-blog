const User = require('../models/user');

/**
 * Fetch profile information
 *
 * @param req
 * @param res
 * @param next
 */
exports.fetchProfile = function(req, res, next) {

  // Require auth

  // Return profile info
  const user = ({
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    birthday: req.user.birthday,
    sex: req.user.sex,
    phone: req.user.phone,
    address: req.user.address,
    occupation: req.user.occupation,
    description: req.user.description,
  });
  res.send({
    user: user
  });
};

/**
 * Update profile information
 *
 * @param req
 * @param res
 * @param next
 */
exports.updateProfile = function(req, res, next) {

  // Require auth

  // Get new profile info (user input)
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

  // Update user profile
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
    // res.send({ message: 'You have successfully updated your profile.' });
  });

  // Return updated profile
  User
    .findById(user._id)
    .select({
      _id: 0,
      password: 0,
      __v: 0,
    })
    .exec(function(err, user) {
      if (err) {
        return next(err);
      }
      res.send({
        user: user
      });
    });
};

/**
 * Reset password
 *
 * @param req
 * @param res
 * @param next
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
      res.json({ message: 'You have successfully updated your password.' });
    });
  });
};