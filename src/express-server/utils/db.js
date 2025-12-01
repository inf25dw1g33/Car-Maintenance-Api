const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'sql',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'car',
  password: process.env.DB_PASSWORD || 'car',
  database: process.env.DB_NAME || 'car_maintenance',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;


