const Post = require('../models/post');
const Comment = require('../models/comment');

/**
 * ------- Post APIs -------
 */

/**
 * Get a list of posts
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPosts = function(req, res, next) {
  Post
    .find({})
    .select({})
    .limit(100)
    .sort({
      time: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve posts.'
        });
      }
      res.json(posts);
    });
};

/**
 * Create a post
 *
 * @param req
 * @param res
 * @param next
 */
exports.createPost = function(req, res, next) {

  // Require auth
  const user = req.user;

  const title = req.body.title;
  const categories = req.body.categories;
  const content = req.body.content;
  const authorId = user._id;
  const authorName = user.firstName + ' ' + user.lastName;
  const time = Date.now();

  // Make sure title, categories and content are not empty
  if (!title || !categories || !content) {
    return res.status(422).json({
      message: 'Error! Title, categories and content are all required.'
    });
  }

  // Create a new post
  const post = new Post({
    title: title,
    categories: categories.split(',').map((item) => item.trim()),
    content: content,
    authorId: authorId,
    authorName: authorName,
    time: time,
  });

  // Save the post
  post.save(function(err, post) {  // callback function
    if (err) {
      return next(err);
    }
    res.json(post);  // return the created post
  });
};

/**
 * Fetch a single post by post ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPost = function(req, res, next) {
  Post.findById({
    _id: req.params.id
  }, function(err, post) {
    if (err) {
      console.log(err);
      return res.status(422).json({
        message: 'Error! Could not retrieve the post with the given post ID.'
      });
    }
    if (!post) {
      return res.status(404).json({
        message: 'Error! The post with the given ID is not exist.'
      })
    }
    res.json(post);  // return the single blog post
  });
};

/**
 * Edit/Update a post
 *
 * @param req
 * @param res
 * @param next
 */
exports.updatePost = function(req, res, next) {

  // Require auth
  const user = req.user;

  // Find the post by post ID
  Post.findById({
    _id: req.params.id
  }, function(err, post) {

    if (err) {
      console.log(err);
      return res.status(422).json({
        message: 'Error! Could not retrieve the post with the given post ID.'
      });
    }

    if (!post) {
      return res.status(404).json({
        message: 'Error! The post with the given ID is not exist.'
      })
    }

    // Make sure the user ID is equal to the author ID (Cause only the author can edit the post)
    // console.log(user._id);
    // console.log(post.authorId);
    if (!user._id.equals(post.authorId)) {
      return res.status(422).json({
        message: 'Error! You have no authority to modify this post.'
      });
    }

    // Make sure title, categories and content are not empty
    const title = req.body.title;
    const categories = req.body.categories;
    const content = req.body.content;

    if (!title || !categories || !content) {
      return res.status(422).json({
        message: 'Error! Title, categories and content are all required.'
      });
    }

    // Update user
    post.title = title;
    post.categories = categories;
    post.content = content;

    // Save user
    post.save(function(err, post) {  // callback function
      if (err) {
        return next(err);
      }
      res.json(post);  // return the updated post
    });
  });
};

/**
 * Delete a post by post ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.deletePost = function(req, res, next) {

  // Require auth

  // Delete the post
  Post.findByIdAndRemove(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return res.status(422).json({
        message: 'Error! The post with the given ID is not exist.'
      });
    }
    res.json({
      message: 'The post was deleted successfully!'
    })
  })
};

/**
 * Fetch posts by author ID
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPostsByAuthorId = function(req, res, next) {

  // Require auth
  const user = req.user;

  // Fetch posts by author ID
  Post
    .find({
      authorId: user._id
    })
    .select({})
    .limit(100)
    .sort({
      time: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve posts.'
        });
      }
      res.json(posts);
    });
};

/**
 * ------- Comment APIs -------
 */