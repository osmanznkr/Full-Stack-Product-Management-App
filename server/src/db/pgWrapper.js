const Pool = require("pg").Pool;
function query(queryString, cbFunc) {
  const {DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT} = require('../constants')
  const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
})
  pool.query(queryString, (error, results) => {
    cbFunc(setResponse(error, results));
  });
}
function setResponse(error, results) {
  return {
    error: error,
    results: results ? results : null,
  };
}
module.exports = {
  query,
};