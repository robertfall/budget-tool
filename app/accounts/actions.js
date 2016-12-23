const express = require('express');
const commands = require('./db');
const paths = require('./paths');

module.exports = function (con) {
  const accounts = express.Router();
  const { find, create, show } = commands(con);

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
    show(req.params.id).then(({ account }) => {
      resp.render('accounts/views/show', { paths, account });
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

  return accounts;
};