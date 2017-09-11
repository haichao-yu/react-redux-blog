const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

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

  // Update author name for post (updateMany(): MongoDB will update all documents that match criteria)
  Post.updateMany({ authorId: user._id }, { $set: { authorName: firstName + ' ' + lastName }}, function(err) {
    if (err) {
      next(err);
    }
  });

  // Update author name for comment (updateMany(): MongoDB will update all documents that match criteria)
  Comment.updateMany({ authorId: user._id }, { $set: { authorName: firstName + ' ' + lastName }}, function(err) {
    if (err) {
      next(err);
    }
  });

  // Update user profile
  User.findByIdAndUpdate(user._id, { $set: {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    sex: sex,
    phone: phone,
    address: address,
    occupation: occupation,
    description: description,
  } }, { new: true }, function(err, updatedUser) {
    if (err) {
      return next(err);
    }
    // Delete unused properties: _id, password, __v
    updatedUser = updatedUser.toObject();
    delete updatedUser['_id'];
    delete updatedUser['password'];
    delete updatedUser['__v'];
    // Return updated user profile
    res.send({ user: updatedUser });
  })
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

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const user = req.user;

  // Compare passwords - Does the user provide correct old password?
  user.comparePassword(oldPassword, function(err, isMatch) {

    if (err) {
      return next(err);
    }

    if (!isMatch) {
      return res.status(422).send({ message: 'You old password is incorrect! Please try again.' })
    }

    if (oldPassword === newPassword) {
      return res.status(422).send({ message: 'Your new password must be different from your old password!' });
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