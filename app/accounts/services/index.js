function getAllAccounts(db) {
  return db.any('SELECT * FROM accounts');
}

function createAccount(db, name) {
  return db.none("INSERT INTO account(name) VALUES ($1)", [name]);
}

module.exports = {
  getAllAccounts,
  createAccount
}