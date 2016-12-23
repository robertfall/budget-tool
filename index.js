const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = require('./app');

global.Promise = require('bluebird');

const server = express();

nunjucks.configure('app', {
    autoescape: true,
    express: server,
    watch: true,
});

server.set('view engine', 'njk')
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('public'));
server.use('/', app);

server.listen(3000);