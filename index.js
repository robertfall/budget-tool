const express = require('express');
const nunjucks = require('nunjucks');
const accounts = require('./app/accounts');

var app = express();

nunjucks.configure('app', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk')

app.get('/', function(req, res) {
    res.render('layout');
});

app.use('/accounts', accounts);

app.listen(3000);