const express = require('express');
const accounts = express.Router();

accounts.get('/', (req, resp) => {
  resp.render('accounts/index');
});

module.exports = accounts;