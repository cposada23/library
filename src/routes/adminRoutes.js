const express = require('express');
const debug = require('debug')('app:adminRoutes');
const chalk = require('chalk');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const { MONGO_URI } = process.env;
const DB_NAME = 'library';
const BOOKS_COLLECTION = 'books';

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }
];


function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      debug(chalk.redBright('ADMIN ROUTE CALLED'));
      debug(`URL: ${chalk.blue(MONGO_URI)}`);
      // mongodb://root:root@localhost:27017
      (async () => {
        let client;
        try {
          client = await MongoClient.connect(MONGO_URI);
          debug('Connected to client');
          const db = client.db(DB_NAME);
          const response = await db.collection(BOOKS_COLLECTION).insertMany(books);
          res.json(response);
        } catch (error) {
          debug(chalk.redBright(error));
        }
        client.close();
      })();
    });

  return adminRouter;
}

module.exports = router;
