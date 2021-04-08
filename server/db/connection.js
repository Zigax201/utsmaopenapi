const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '123456',
    database: 'dbutsma',
    host: 'localhost',
    port: '3306'
});

module.exports = pool;