module.exports = function createDb() {
  const pgp = require('pg-promise')();
  var cn = {
    host: 'postgres',
    port: 5432,
    database: 'budget',
    user: 'postgres',
    password: 'development'
  };
  
  const db = pgp(cn);
  return db;
}