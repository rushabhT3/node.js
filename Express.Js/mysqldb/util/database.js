const mysql = require('mysql2');

// pool manages multiple connections
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'qwertY@1'
});

module.exports = pool.promise();