const sql = require('mssql');
require('dotenv').config();
 
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

pool.on('error', err => {
  console.error('SQL Server pool error:', err);
});

module.exports = {
  sql,
  poolConnect,
  pool
};