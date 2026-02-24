const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Leave empty if you don't have root password
  database: 'duty_leave_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database access was denied.');
    }
  }
  if (connection) {
    connection.release();
    console.log('✅ MySQL Database Connected Successfully!');
  }
});

module.exports = pool.promise();
