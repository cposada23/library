const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  // Stores user in session
  // passport.serializeUser();
  // Retreves user from session
  // passport.deserializeUser();

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

};
