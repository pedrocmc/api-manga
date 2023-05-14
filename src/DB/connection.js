const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.MANGA,
});

module.exports = connection;