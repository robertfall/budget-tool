const prefix = '/accounts';
module.exports = {
  index: () => prefix,
  new: () => `${prefix}/new`,
  show: (id) => `${prefix}/${id}`,
  transactions: (id) => `${prefix}/${id}/transactions`,
  newTransaction: (id) => `${prefix}/${id}/transactions/new`,
  prefix,
}