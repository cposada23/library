const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'SA',
  password: process.env.PASS_CP,
  server: '192.168.1.13', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',
};

debug(process.env.PASS_CP);

sql.connect(config).catch((error) => debug(error));

app.use(morgan('tiny'));

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));


app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{
  link: '/books',
  title: 'Books'
},
{
  link: '/authors',
  title: 'Authors'
}];


const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index',
    {
      nav,
      title: 'Library'
    });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
