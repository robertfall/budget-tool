const Big = require('big.js');
const commands = require('./db');

module.exports = function (con) {
  const { get, transactionsForAccount, createTransaction } = commands(con);
  function transform(transactions) {
    return transactions.reduce((acc, transaction) => {
      const amount = new Big(transaction.amount);
      const balance = acc.balance.plus(amount);

      const newTransaction = Object.assign({},
        transaction,
        { amount, balance }
      );

      return {
        transactions: [...acc.transactions, newTransaction],
        balance
      };
    }, { balance: new Big(0), transactions: [] }).transactions;
  }

  function accountSummary(id) {
    const account = get(id);
    const transactions = transactionsForAccount(id).then(transform);
    return Promise.props({ account, transactions });
  }

  function createTransactionForAccount(accountId, transaction) {
    const { description, processedOn, isExpense } = transaction;
    const amount = isExpense ? -transaction.amount : transaction.amount;
    return createTransaction({ description, amount, processedOn, accountId });
  }

  return { accountSummary, createTransactionForAccount };
}