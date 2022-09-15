const mysql = require('mysql');
const express = require('express');
const app = express();
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'tedu',
    connectionLimit: 15
});
app.listen(3000);
app.use(express.static('public'));
// 接口地址: http://127.0.0.1:3000/emp    路由的完整的地址
// 请求方法: get
// app.get('/v1/emps', (req, res) => {
//     var obj = req.query;
//     console.log(obj);
//     pool.query('select * from emp where eid = ?', [obj.eid], (err, r) => {
//         if (err) {
//             throw err;
//         }
//         console.log(r);
//         // 判断查询是否成功, 如果结果的是空数组说明该员工不存在, 否则查询成功;
//         if (r.length === 0) {
//             res.send({ code: 400, msg: '该员工不存在' });
//         } else {
//             // 接口规范,返回的结果是对象,包含有状态码(认为规定),消息说明,如果需要返回数据,添加查询的数据
//             res.send({ code: 200, msg: '查询成功', data: r });
//         }
//     });
//     // query属于异步操作,需要把相应的结果放入到回调函数的内部
// });
app.use(
    express.urlencoded({
        //是否使用一个第三方模块转为对象
        extended: true
    })
);
app.post('/v1/adds', (req, res) => {
    var obj = req.body;
    console.log(obj);
    pool.query('insert into emp set ?', [obj], (err, r) => {
        if (err) {
            throw err;
        }
        console.log(r);
        //把成功结果响应
        res.send({ code: 200, msg: '员工添加成功' });
    });
});
