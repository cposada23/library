const express = require('express');
const debug = require('debug')('app:bookRoutes');
const chalk = require('chalk');
const sql = require('mssql');


const bookRouter = express.Router();

function router(nav) {
  const request = new sql.Request();

  bookRouter.route('/').get((req, res) => {
    debug('Get all books');
    (async () => {
      const result = await request.query('select * from books');
      debug(result);
      res.render('bookListView', {
        nav,
        title: 'Library',
        books: result.recordset
      });
    })();
  });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const { id } = req.params;
      debug(`BookID: ${chalk.green(id)}`);
      (async () => {
        const { recordset } = await request
          .query(`select * from books where id=${id}`);
          // .input('id', sql.Int, id)
          // .query('select * from books where id=@id');
        debug(recordset);
        [req.book] = recordset;
        next();
      })();
    })
    .get((req, res) => {
      res.render('bookView', {
        nav,
        title: 'Library',
        book: req.book
      });
    });

  return bookRouter;
}

module.exports = router;
