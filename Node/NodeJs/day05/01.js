const mysql = require("mysql");
// 创建mysql连接对象
const c = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "tedu",
});

c.query("select* from dept", (err, r) => {
  //err可能产生的错误结果
  if (err) {
    throw err;
  }
  console.log(r);
});
