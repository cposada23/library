var express = require('express')
var chalk = require('chalk')
var debug = require('debug')('app')
var morgan = require('morgan')
var path = require('path')

var app = express()

app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.htm'))
})

app.listen(3000, () => {
    debug(`listening on port ${chalk.green('3000')}`)
})