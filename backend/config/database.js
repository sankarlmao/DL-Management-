const mysql = require('mysql2');
require('dotenv').config();

// Database configuration - uses environment variables with fallbacks
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'duty_leave_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log(`📦 Connecting to MySQL: ${dbConfig.host} as ${dbConfig.user}`);

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database Connection Error:');
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('   Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('   Database has too many connections.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   Access denied. Check username/password.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('   MySQL server is not running. Start it with: sudo systemctl start mysql');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error(`   Database "${dbConfig.database}" does not exist.`);
      console.error('   Run: mysql -u root -p < database/schema.sql');
    } else {
      console.error('   Error:', err.message);
    }
    console.error('\n💡 TIP: Create a .env file in backend/ with:');
    console.error('   DB_HOST=localhost');
    console.error('   DB_USER=root');
    console.error('   DB_PASSWORD=your_password');
    console.error('   DB_NAME=duty_leave_db\n');
  }
  if (connection) {
    connection.release();
    console.log('✅ MySQL Database Connected Successfully!');
  }
});

module.exports = pool.promise();
