const express = require('express');
const { getAllAccounts, createAccount } = require('./services');
module.exports = function (db) {
  const accounts = express.Router();
  accounts.get('/', (req, resp) => {
    getAllAccounts(db)
      .then((accounts) => {
        resp.render('accounts/index', { accounts });
      })
      .catch((error) => {
        resp.status(500).send(error);
      });
  });

  return accounts;
};