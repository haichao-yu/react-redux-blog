const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// middleware in between Incoming Request and Route Handler
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.post('/signup', Authentication.signup);

  app.post('/signin', requireSignin, Authentication.signin);
  // app.post('/signin', Authentication.signin);
};