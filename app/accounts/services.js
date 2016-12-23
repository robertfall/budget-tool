const Big = require('big.js');
const commands = require('./db');

module.exports = function (con) {
  const { get, transactionsForAccount, createTransaction } = commands(con);

  function accountSummary(id) {
    const account = get(id);
    const transactions = transactionsForAccount(id)
    return Promise.props({ account, transactions });
  }

  function createTransactionForAccount(accountId, transaction) {
    const { description, processedOn, isExpense } = transaction;
    const amount = isExpense ? -transaction.amount : transaction.amount;
    return createTransaction({ description, amount, processedOn, accountId });
  }

  return { accountSummary, createTransactionForAccount };
}