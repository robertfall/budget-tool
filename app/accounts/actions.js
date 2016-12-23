const express = require('express');
const commands = require('./db');
const services = require('./services');
const paths = require('./paths');
const moment = require('moment');

module.exports = function (con) {
  const accounts = express.Router();
  const { find, create, get } = commands(con);
  const { accountSummary, createTransactionForAccount } = services(con);

  accounts.get('/', (req, resp) => {
    find()
      .then((accounts) => {
        resp.render('accounts/views/index', { accounts, paths });
      })
      .catch((error) => {
        resp.status(500).send(error);
      });
  });

  accounts.get('/new', (req, resp) => {
    resp.render('accounts/views/new', { paths });
  });

  accounts.get('/:id', (req, resp) => {
    accountSummary(req.params.id).then(({ account, transactions }) => {
      console.log(transactions);
      resp.render('accounts/views/show', { paths, account, transactions });
    })
  });

  accounts.post('/', (req, resp) => {
    const { name, isCredit } = req.body;
    create(name, isCredit)
      .then(() => {
        resp.redirect(paths.index());
      })
      .catch((error) => {
        resp.status(500).send(error);
      });
  });

  accounts.get('/:id/transactions/new', (req, resp) => {
    Promise.props({
      account: get(req.params.id),
      accounts: find()
    }).then(({ account, accounts }) => {
      resp.render(
        'accounts/views/new-transaction', 
        { paths, account, accounts, now: moment().format('YYYY-MM-DD') }
      );
    })
  });

  accounts.post('/:id/transactions', (req, resp) => {
    createTransactionForAccount(req.params.id, req.body)
      .then(() => {
        resp.redirect(paths.show(req.params.id));
      })
      .catch((error) => {
        resp.status(500).send(error);
      });
  });

  return accounts;
};