const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = {
  query: (query, callback) => {
    pool.query(query, (error, results, fields) => {
      if (error) {
        callback(error, {});
      } else {
        callback(null, results[0].solution);
      }
    });
  },
  client: pool,
};
