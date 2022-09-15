// 引入mysql模块
const mysql = require("mysql");
// 连接池,提前创建一批连接,可以被反复使用
// 创建连接池对象
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "tedu",
  connectionLimit: 15, // 连接池的大小
});
// 执行SQL命令,就会自动从连接池获取一个连接
// pool.query("select * from emp", (err, r) => {
//   if (err) {
//     throw err;
//   }
//   console.log(r);
// });
var str = "David";
pool.query(`select * from emp where ename =  "${str}" `, (err, r) => {
  if (err) {
    throw err;
  }
  console.log(r);
});
