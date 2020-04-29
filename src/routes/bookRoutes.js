const express = require('express');
const bookController = require('../controllers/book.controller');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById } = bookController(nav, bookService);
  bookRouter.use((req, res, next) => {
    // if (req.user) {
    next();
    // } else {
    //   res.redirect('/');
    // }
  });

  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;
