const express = require('express');
const accounts = require('./accounts');
const createDbConnection = require('./utils/create-db');

const app = express.Router();

const con = createDbConnection();

app.use('/accounts', accounts.router(con));

process.on('exit', () => {
  pgp.end();
});

module.exports = app;