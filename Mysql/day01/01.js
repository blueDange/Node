// 引入mysql模块
const mysql = require('mysql');
// 连接池,提前创建一批连接,可以被反复使用
// 创建连接池对象
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'tedu',
    connectionLimit: 15 // 连接池的大小
});
// 执行SQL命令,就会自动从连接池获取一个连接
// pool.query("select * from emp", (err, r) => {
//   if (err) {
//     throw err;
//   }
//   console.log(r);
// });
// var str = '"xxx" or "1"';
// 占位符(?) : 在要拼接值得位置先进行站位
// 将用户提供的值进行过滤,过滤后会自动替换占位符
// pool.query(`select * from emp where ename =  ? `, [str], (err, r) => {
//   if (err) {
//     throw err;
//   }
//   console.log(r);
// });
// var obj = {
//   ename: "小黑",
//   sex: "1",
//   birthday: "2002-1-1",
//   salary: "3000",
//   deptid: "10",
// };
// pool.query("insert into emp set ?", [obj], (err, r) => {
//   if (err) {
//     throw err;
//   }
//   console.log(r);
// });

// 删除编号对应的员工;
// var eid = '1';
// pool.query('delete from emp where eid = ? ', [eid], (err, r) => {
//     if (err) {
//         throw err;
//     }
//     console.log(r);
//     // 如果都详细啊affecteRows的属性值0,说明删除失败,否则删除成功
//     if (r.affectedRows === 0) {
//         console.log('失败');
//     } else {
//         console.log('成功');
//     }
// });
// 假设获取到了前端所传递一个要修改的用户的值,执行SQL命令修改对应的值
var obj = {
    eid: '30',
    ename: 'aac',
    salary: '13000'
};
var a = '10';
pool.query('update emp set ? where eid = ? ', [obj, obj.eid], (err, r) => {
    if (err) {
        throw err;
    }
    console.log(r);
    // 成功的结果是对象,如果对象下的changeRows值为0,说明修改失败,否则修成功
    if (r.changedRows === 0) {
        console.log('失败');
    } else {
        console.log('修改成功');
    }
});
