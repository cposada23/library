const express = require('express');
const debug = require('debug')('app:bookRoutes');
const chalk = require('chalk');
const { MongoClient, ObjectID } = require('mongodb');

const { MONGO_URI } = process.env;
const DB_NAME = 'library';
const BOOKS_COLLECTION = 'books';

const bookRouter = express.Router();

function router(nav) {

  bookRouter.route('/').get((req, res) => {
    debug(chalk.green('Get all books'));
    debug(`URL: ${chalk.blue(MONGO_URI)}`);

    (async () => {
      let client;
      try {
        client = await MongoClient.connect(MONGO_URI);
        const db = client.db(DB_NAME);
        const collection = await db.collection(BOOKS_COLLECTION);
        const bookList = await collection.find().toArray();
        debug(chalk.yellowBright(JSON.stringify(bookList)));
        res.render('bookListView', {
          nav,
          title: 'Library',
          books: bookList
        });
      } catch (error) {
        debug(chalk.redBright(error));
      }
      debug(chalk.greenBright('closing client'));
      client.close();
    })();
  });
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    debug(`BookID: ${chalk.green(id)}`);

    (async () => {
      let client;
      try {
        client = await MongoClient.connect(MONGO_URI);
        const db = client.db(DB_NAME);
        const collection = await db.collection(BOOKS_COLLECTION);
        const book = await collection.findOne({ _id: ObjectID(id) });
        debug(chalk.yellowBright(JSON.stringify(book)));
        res.render('bookView', {
          nav,
          title: 'Library',
          book
        });
      } catch (error) {
        debug(chalk.redBright(error));
      }
      client.close();
    })();
  });

  return bookRouter;
}

module.exports = router;
