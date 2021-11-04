const mysql = require('mysql-await');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = {
  query: async (query) => {
    try {
      const result = await pool.awaitQuery(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  client: pool,
};
