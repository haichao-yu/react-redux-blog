const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/userinfo');
const Blog = require('./controllers/blog');

// service
const passport = require('passport');
const passportService = require('./services/passport');

// middleware in between Incoming Request and Route Handler
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  /**
   * Authentication APIs
   */

  app.get('/api/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.post('/api/signup', Authentication.signup);

  app.post('/api/signin', requireSignin, Authentication.signin);
  // app.post('/api/signin', Authentication.signin);

  app.get('/api/verify_jwt', requireAuth, Authentication.verifyJwt);

  /**
   * Profile APIs
   */

  app.get('/api/profile', requireAuth, Profile.fetchProfile);

  app.put('/api/profile', requireAuth, Profile.updateProfile);

  app.put('/api/password', requireAuth, Profile.resetPassword);

  /**
   * Blog Post APIs
   */

  app.get('/api/posts', Blog.fetchPosts);

  app.post('/api/posts', requireAuth, Blog.createPost);

  app.get('/api/posts/:id', Blog.fetchPost);

  app.get('/api/allow_edit_or_delete/:id', requireAuth, Blog.allowUpdateOrDelete);

  app.put('/api/posts/:id', requireAuth, Blog.updatePost);

  app.delete('/api/posts/:id', requireAuth, Blog.deletePost);

  app.get('/api/my_posts', requireAuth, Blog.fetchPostsByAuthorId);

  /**
   * Blog Comment APIs
   */

  app.post('/api/comments/:postId', requireAuth, Blog.createComment);

  app.get('/api/comments/:postId', Blog.fetchCommentsByPostId);
};



// CRUD:
// - Create: http post request
// - Read: http get request
// - Update: http put request
// - Delete: http delete request