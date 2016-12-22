const express = require('express');
const nunjucks = require('nunjucks');
const accounts = require('./app/accounts');
const createDb = require('./app/utils/create-db');

const app = express();
const db = createDb();

nunjucks.configure('app', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk')

app.get('/', function(req, res) {
    res.render('layout');
});

app.use('/accounts', accounts(db));

app.listen(3000);
process.on('exit', () => {
  pgp.end();
});