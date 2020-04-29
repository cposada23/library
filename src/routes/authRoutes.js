const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');


const { MONGO_URI } = process.env;
const DB_NAME = 'library';
const USER_COLLECTION = 'users';
const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user
      const { username, password } = req.body;
      (async () => {
        let client;
        try {
          client = await MongoClient.connect(MONGO_URI);
          debug('Connected correctly to server');

          const db = client.db(DB_NAME);
          const userCollection = db.collection(USER_COLLECTION);
          const user = { username, password };
          const result = await userCollection.insertOne(user);
          debug(result);
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error);
        }
        client.close();
      })();
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
