const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

const { MONGO_URI } = process.env;
const DB_NAME = 'library';
const USER_COLLECTION = 'users';

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      (async () => {
        let client;
        try {
          client = await MongoClient.connect(MONGO_URI);
          const db = client.db(DB_NAME);
          const userCollection = db.collection(USER_COLLECTION);
          const user = await userCollection.findOne({ username });
          debug(user);
          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          debug(error);
          done(error, null);
        }
        client.close();
      })();
    }
  ));
};
