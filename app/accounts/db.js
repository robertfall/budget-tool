module.exports = function(db) {
  return {
    find() {
      return db.any('SELECT * FROM accounts');
    },
    create(name, credit = false) {
      return db.none("INSERT INTO accounts(name, isCredit) VALUES ($1, $2)", [name, credit]);
    },
    show(id) {
      const account = db.one('SELECT * FROM accounts WHERE id = $1', [id]);
      return Promise.props({ account });
    }
  };
}