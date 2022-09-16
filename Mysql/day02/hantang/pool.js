// 引入mysql模块
const mysql = require('mysql');
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'hantang',
    connectionLimit: 15,
    multipleStatements: true // 开启一次执行多个SQL命令
});
module.exports = pool;
