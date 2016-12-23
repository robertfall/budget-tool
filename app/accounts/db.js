module.exports = function (db) {
  function find() {
    return db.any('SELECT * FROM accounts');
  }

  function get(id) {
    return db.one('SELECT * FROM accounts WHERE id = $1', id);
  }

  function create(name, credit = false) {
    return db.none("INSERT INTO accounts(name, is_credit) VALUES ($1, $2)", [name, credit]);
  }

  function transactionsForAccount(accountId) {
    return db.any(
    'SELECT * ' +
    'FROM transactions_view WHERE account_id = $1 ORDER BY processed_on', accountId);
  }

  function createTransaction({ description, amount, processedOn, accountId }) {
    return db.none(
      "INSERT INTO transactions(description, amount, processed_on, account_id)" +
      "VALUES (${description}, ${amount}, ${processedOn}, ${accountId})"
      , { description, amount, processedOn, accountId });
  }
  return { find, get, create, createTransaction, transactionsForAccount };
};