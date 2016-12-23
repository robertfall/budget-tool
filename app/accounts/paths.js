const prefix = '/accounts';
module.exports = {
  index: () => prefix,
  new: () => `${prefix}/new`,
  show: (id) => `${prefix}/${id}`,
  prefix,
}